FROM node:latest as frontend-stage
COPY frontend /app
WORKDIR /app
RUN npm install
RUN node --max_old_space_size=4096 node_modules/.bin/react-scripts build

FROM nginx:stable-alpine as production-stage
COPY --from=frontend-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
