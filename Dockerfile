FROM node:22-alpine
WORKDIR /w
COPY . .
RUN npm ci
