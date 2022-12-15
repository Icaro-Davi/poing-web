FROM node:alpine

WORKDIR /app
COPY ./.env.local ./.env.local

RUN yarn
RUN yarn lint
RUN yarn build

CMD [ "yarn", "start" ]