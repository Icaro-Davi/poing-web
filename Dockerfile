FROM node:alpine

WORKDIR /app
COPY . .

RUN yarn
RUN yarn lint
RUN yarn build

CMD [ "yarn", "start" ]