FROM node:18
USER node
WORKDIR /home/node/app

ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

CMD "node weather.js"
