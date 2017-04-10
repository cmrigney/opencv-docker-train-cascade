FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y build-essential unzip
RUN apt-get install -y cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev
RUN apt-get install -y libtbb2 libtbb-dev libjpeg-dev libpng-dev libtiff-dev libjasper-dev
RUN apt-get install -y wget

WORKDIR /source
RUN wget https://github.com/opencv/opencv/archive/2.4.13.2.zip && unzip 2.4.13.2.zip && rm 2.4.13.2.zip
WORKDIR /source/opencv-2.4.13.2/build
RUN cmake -D CMAKE_BUILD_TYPE=Release -D CMAKE_INSTALL_PREFIX=/usr/local -D WITH_TBB=ON .. && make -j2 && make install
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install nodejs
WORKDIR /source
RUN npm install --unsafe-perm sharp
RUN apt-get install -y bc

COPY . /source
RUN cat bootstrap.sh | sed 's/\r$//' > /tmp/bootstrap.sh

CMD bash /tmp/bootstrap.sh
