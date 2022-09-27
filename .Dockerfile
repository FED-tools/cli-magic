# This is the base dockerfile. Here the base image is pulled and the ras setup is done for the project.
# Make sure to include the base setup for lerna here.
FROM node:alpine as base
COPY . /app
WORKDIR /app
RUN yarn
RUN yarn inst
RUN yarn build
RUN yarn deploy
COPY ./lerna.json ./
