FROM node:22-alpine
RUN apk add curl
WORKDIR /w
COPY . .
RUN npm ci
