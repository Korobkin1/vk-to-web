FROM node:16-alpine

WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install --production

# Копирование исходного кода
COPY . .

# Установка wait-for-it для ожидания MongoDB
RUN wget -O /wait-for-it.sh https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh \
    && chmod +x /wait-for-it.sh

EXPOSE 3000

CMD ["sh", "-c", "/wait-for-it.sh mongodb:27017 --timeout=30 -- node server.js"]
