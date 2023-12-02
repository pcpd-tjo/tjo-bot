FROM ubuntu:latest
ENV NODE_VERSION=16.13.0
USER root
RUN apt-get update
RUN apt-get install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

ENV NODE_ENV=production
WORKDIR /usr/src/bot
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/bot

RUN sudo apt-get update -y
RUN sudo apt-get install -y python3
RUN sudo apt install -y python3-pip
USER node
CMD ["npm", "test"]
