FROM node:17
RUN mkdir /api
WORKDIR /api
COPY package.json ./
COPY tsconfig.json ./
COPY .env ./
COPY . .
RUN npm i

CMD ["npm","start"]