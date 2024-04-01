FROM node:14
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm build

RUN npm install -g serve

CMD ["serve", "-s", "build"]

