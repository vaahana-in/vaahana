FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g vite typescript
RUN npm config set legacy-peer-deps true
RUN npm install

COPY . .

EXPOSE 3000

CMD ["vite"]