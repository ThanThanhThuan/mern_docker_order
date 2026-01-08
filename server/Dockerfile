FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]
# Change to "npx nodemon index.js" if you want hot reloading inside docker