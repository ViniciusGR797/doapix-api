# Etapa de construção
FROM node:14-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY . .
COPY ./src/swagger/swagger.json ./dist/swagger/

RUN npm install --only=production && npm cache clean --force && npm run build

# Etapa final
FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app/package*.json /app/.env ./ 
COPY --from=builder /app/dist ./dist

RUN npm install --only=production

EXPOSE ${PORT}

CMD ["node", "dist/server.js"]
    