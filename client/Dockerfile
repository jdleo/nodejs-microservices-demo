# base image
FROM node:alpine
# add CI environment variable
ENV CI=true
# set working directory
WORKDIR /app
# copy package.json from host to container
COPY package.json ./
# install dependencies
RUN yarn
# copy everything else
COPY ./ ./
# start
CMD ["yarn", "start"]
