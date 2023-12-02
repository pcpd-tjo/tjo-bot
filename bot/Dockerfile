FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/bot
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/bot
USER node
CMD ["npm", "test"]
