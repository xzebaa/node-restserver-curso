# API REST NODE EXAMPLE
- open in port 3000
- mongoose + express 

```
npm install

npm run start
```

# ENDPOINT: 

```
POST : /usuario
GET : /usuario
PUT : /usuario
DELETE : /usuario
```

# CURL EXAMPLE FOR POSTMAN
```
curl -X POST \
  http://localhost:3000/usuario \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Postman-Token: bd4f73d8-c35a-4e53-a5af-28e46512ada3' \
  -H 'cache-control: no-cache' \
  -d 'nombre=sebastian&edad=29&email=prueba%40prueba.com&password=1234'
```