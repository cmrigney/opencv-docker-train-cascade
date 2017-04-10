# OpenCV 2.4 Docker Cascade Trainer

`Dockerfile` contains a configuration for a container that will run `opencv_traincascade` on your files in `processed` and output a `cascade.xml` in `dockeroutput`.

Positives should be in a sub-directory `processed/positives` before building.

Negatives should be in a sub-directory `processed/negatives` before building.

## Build

`docker build -t namespace/opencv24trainer .`

## Run

Run this command in PowerShell.

`docker run --rm -v /c/<path_to_root_on_host>/dockeroutput:/hostoutput namespace/opencv24trainer`

### Notes
If you have spaces in your sample file names. Run `node host-name-fix.js` to remove them. (That assumes you have node installed.)
