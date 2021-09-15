FROM node:14.17.3

COPY package*.json ./

RUN npm i

COPY src ./src
COPY tsconfig.json ./tsconfig.json

EXPOSE 3000
CMD ["npm", "start"]
