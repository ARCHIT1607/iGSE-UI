FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps
# run build
RUN npm run build

CMD ["npm","start"]