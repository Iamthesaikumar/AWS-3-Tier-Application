FROM node:24-alpine

WORKDIR /app

COPY Backend/package*.json ./

RUN npm install --omit=dev

COPY Backend/ ./

EXPOSE 3000

CMD ["node", "server.js"]
