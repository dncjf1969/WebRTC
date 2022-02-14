FROM node:14 as build-stage
WORKDIR /app
ADD . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY  ./web/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]