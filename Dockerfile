#FROM node:4.4.7-slim
FROM mhart/alpine-node:4.4.7

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# set Node to production
ARG NODE=production
ENV NODE_ENV ${NODE}

# Install app dependencies
COPY package.json /tmp/package.json
RUN cd /tmp && npm install && mv /tmp/node_modules /usr/src/app/ && rm -rf /tmp/*

# Bundle app source
COPY . /usr/src/app
COPY ./.env.default /usr/src/app/.env
RUN npm run build

EXPOSE 8080

CMD [ "node", "./bin/client" ]
