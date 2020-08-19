FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY ./src ./src
ENV NODE_ENV production
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "prod" ]