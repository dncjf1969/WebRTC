FROM node:14 as build-stage
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:${PATH}
COPY package*.json /usr/src/app/package.json
RUN npm install --silent

COPY . /usr/src/app
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY  ./web/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]


