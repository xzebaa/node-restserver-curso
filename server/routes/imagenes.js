const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

const { verificaTokenImg } = require('../middlewares/autenticacion')


app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {
    const { tipo, img } = req.params;
    let pathImg = `./uploads/${tipo}/${img}`;

    const pathNoImage = path.resolve(__dirname, '../assets/no-image.jpg')

    let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

    if (fs.existsSync(pathImage)){
        return res.sendFile(pathImage);
    }

    return res.sendFile(pathNoImage);



})


module.exports = app;