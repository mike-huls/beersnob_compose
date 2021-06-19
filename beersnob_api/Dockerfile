FROM node:11-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY src/package.json .
RUN npm install

# Bundle app source
#COPY . .

# Exports
EXPOSE 80
CMD [ "npm", "run", "dev" ]
