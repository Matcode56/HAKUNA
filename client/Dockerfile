FROM node:17

RUN mkdir /app-react
WORKDIR /app-react
COPY package*.json ./
COPY tsconfig.json ./
RUN npm i
COPY . .

EXPOSE 3000

CMD ["npm","start"]