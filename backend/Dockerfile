# syntax=docker/dockerfile:1

FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /backend

RUN echo "registry=https://npm.paypal.com" > /usr/local/etc/npmrc \
    && echo "strict-ssl=false" >> /usr/local/etc/npmrc \
    && echo "package-lock=false" >> /usr/local/etc/npmrc

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "server.js" ]