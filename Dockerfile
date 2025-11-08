# build stage
FROM node:22-alpine AS build-billing-app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-without-ts

# production stage

FROM node:22-alpine

WORKDIR /app

RUN npm i -g serve

COPY --from=build-billing-app /app/dist ./dist

ENV PATH="/usr/local/bin:$PATH"

EXPOSE 3000

CMD [ "serve" ,"-s" , "dist" , "-l" , "3000" ]
