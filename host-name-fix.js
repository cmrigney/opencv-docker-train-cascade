var fs = require('fs');
var path = require('path');

function fixNames(dir) {
  var files = fs.readdirSync(dir);
  files.forEach((f) => {
    fs.renameSync(path.join(dir, f), path.join(dir, f.replace(/ /g, '_')));
  });
}

var pinput = path.join(__dirname, 'processed', 'positives');
var ninput = path.join(__dirname, 'processed', 'negatives');

fixNames(pinput);
fixNames(ninput);

console.log('Done');
