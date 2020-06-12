# build environment
FROM node:14.4-slim as build
WORKDIR /app

COPY package.json ./

RUN yarn

COPY . ./

RUN yarn build --prod

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]