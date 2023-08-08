# This is the base dockerfile. Here the base image is pulled and the ras setup is done for the project.
# Make sure to include the base setup for lerna here.
FROM node:alpine as base
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run inst
RUN npm run build
RUN npm run deploy
COPY ./lerna.json ./
