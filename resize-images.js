'use strict';

var sharp = require('sharp');
var fs = require('fs');
var path = require('path');

var width = 50;
var height = 50;

var resizeWidth = 24;
var resizeHeight = 24;

function doResize(input, output) {

  function mkdir() {
    try {
      fs.mkdirSync(output);
    }
    catch(err) {
    }
  }

  mkdir();

  var files = fs.readdirSync(input);

  var chain = Promise.resolve(null);

  files.forEach((f) => {
    chain = chain.then(() => {
      return new Promise((resolve, reject) => {
        sharp(path.join(input, f))
        .metadata()
        .then(function(metadata) {
          if (metadata.width <= width || metadata.height <= height)
            return resolve();
          sharp(path.join(input, f))
            .extract({width: width, height: height, left: Math.floor(metadata.width/2 - width/2), top: Math.floor(metadata.height/2 - height/2)})
            .resize(resizeWidth, resizeHeight)
            .toFile(path.join(output, f), (err) => {
              if (err) {
                return reject(err);
              }
              return resolve();
            });
        });
      });
    });
  });

  chain.then(() => {
    console.log('Done with ' + input);
  });
  return files;
}

var pinput = path.join(__dirname, 'processed', 'positives');
var poutput = path.join(__dirname, 'positives');
var ninput = path.join(__dirname, 'processed', 'negatives');
//var noutput = path.join(__dirname, 'negatives');

var posFiles = doResize(pinput, poutput).map((f) => `positives/${f} 1 0 0 ${resizeWidth} ${resizeHeight}`);
//doResize(ninput, noutput);

var negFiles = fs.readdirSync(ninput).map((f) => `processed/negatives/${f}`);

fs.writeFileSync('neg.txt', negFiles.join('\n'));
fs.writeFileSync('pos.txt', posFiles.join('\n'));

