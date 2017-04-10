#!/bin/bash

set -e

node resize-images.js

opencv_createsamples -info pos.txt -bg neg.txt -vec pos.vec -w 20 -h 20 -num $(ls -l positives/ | wc -l)

mkdir output

opencv_traincascade -data output \
-vec pos.vec \
-bg neg.txt \
-numPos $(echo $(ls -l positives/ | wc -l)*0.85/1 | bc) \
-numNeg $(echo $(ls -l processed/negatives | wc -l)*0.85/1 | bc) \
-numStages 20 \
-precalcValBufSize 512 \
-precalcIdxBufSize 512 \
-featureType HAAR \
-minHitRate 0.995 \
-maxFalseAlarmRate 0.5 \
-w 20 -h 20

ls -l output/

cp output/cascade.xml /hostoutput/cascade.xml

echo "All Done"
