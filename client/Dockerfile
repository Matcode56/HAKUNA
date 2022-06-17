FROM node:lts-alpine

RUN mkdir /app-react
WORKDIR /app-react
COPY package*.json ./
RUN npm i
COPY . .

EXPOSE 3000

CMD ["npm","start"]