FROM node:12-alpine

COPY  . .

## instalar paquetes requeridos antes de npm 
RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm rebuild bcrypt --build-from-source.

RUN npm install

CMD ["npm", "start"]