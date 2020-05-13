# stage1 as builder
FROM node:12-alpine as builder

# install git
RUN apk add --no-cache git

# set workdir path to angular app
WORKDIR /app

# install dependencies
RUN npm install -g @angular/cli@8.3.17

# copy code
COPY . /app

# Install the dependencies and make the folder
RUN npm install

# Build the project
RUN npm run ng build -- --prod

FROM nginx:1.17.8-alpine

COPY ./compose/angular/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /app/dist/ohdm-frontend /usr/share/nginx/html

EXPOSE 4200 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]