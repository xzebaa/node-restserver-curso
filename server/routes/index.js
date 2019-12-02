const express = require('express');
const app = express();

app.use(require('./login'));
app.use(require('./usuario'));
app.use(require('./health'));

module.exports = app;