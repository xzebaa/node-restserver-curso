require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/usuario'));

const startServer = () => {
    console.log(`server start port : ${ process.env.PORT }`);
}

mongoose.connect("mongodb+srv://sealvarezlazo:Xebitay1@cluster0-klwbk.mongodb.net/cafe?retryWrites=true&w=majority", (err, resp) => {
  if (err) throw err;
  
  console.log('base de datos online ');
});

// const {MongoClient} = require('mongodb');
// const uri = "mongodb+srv://sealvarezlazo:Xebitay1@cluster0-klwbk.mongodb.net/cafe?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true });
// client.connect(err => {
//   // const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('conected');
//   client.close();
// });

app.listen(process.env.PORT, startServer);