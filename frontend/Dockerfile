FROM node:16 as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY  ./etc/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]


