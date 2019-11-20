require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// respond with "hello world" when a GET request is made to the homepage
app.get('/usuario', function(req, res) {
  res.json('ge usuarios');
});

app.post('/usuario', function(req, res) {
  const { body } = req;

  let status = body.nombre ? 200:404;

  if( !body.nombre )
  {
    res.status(400);
    res.json({
      ok: false,
      mensaje: 'el nombre es necesario',
    })

  }
  res.status
  res.json({person:body});
});

app.put('/usuario/:id', function(req, res) {
  
  let { id } = req.params;
  res.json({id});
});

app.delete('/usario', function(req, res) {
  res.json('hello world');
});

const startServer = () => {
    console.log(`server start port : ${ process.env.PORT }`);
}

app.listen(process.env.PORT, startServer);