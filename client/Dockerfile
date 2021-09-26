FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY package*.json tsconfig.json ./
COPY src/ ./src/
COPY public/ ./public/
RUN npm install
RUN npm run build

FROM nginx:1.21.3 AS run
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]