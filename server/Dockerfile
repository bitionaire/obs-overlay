FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json .env tsconfig.json ./
COPY src/ ./src
RUN npm install
CMD ["npm", "start"]