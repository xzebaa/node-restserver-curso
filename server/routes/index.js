const express = require('express');
const app = express();

app.use(require('./login'));
app.use(require('./usuario'));
app.use(require('./health'));
// app.use(require('./categoria'));
// app.use(require('./producto'));
app.use(require('./upload'));
app.use(require('./imagenes'));
app.use(require('./services'));
app.use(require('./mail'));
app.use(require('./news'));
app.use(require('./report'));

module.exports = app;