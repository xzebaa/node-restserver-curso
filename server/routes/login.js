const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post('/login', (req, resp) => {

    const { body = [] } = req;
    Usuario.findOne( {email: body.email}, (error, usuarioDB) => {

        if(error){
            resp.status(500);
            return resp.json({
                ok: false,
                error,
            })
        }

        if ( !usuarioDB )
        {
            resp.status(400);
            return resp.json({
                ok: false,
                error: {
                    mmessage: '(Usuario) o contraseña incorrecta.'
                },
            })
        }


        const { password: passwordDB = '' } = usuarioDB;
        const { password: passwordRequest = '' } = body;
        if ( !bcrypt.compareSync( passwordRequest, passwordDB) ){
            resp.status(400);
            return resp.json({
                ok: false,
                error: {
                    mmessage: 'Usuario o (contraseña) incorrecta.'
                },
            })
        }

        const token = jwt.sign(
            { usuarioDB },
            process.env.SEED,
            {
                expiresIn: process.env.CADUCIDAD_TOKEN,
            }
        )

        return resp.json({
            ok: true,
            usuario: usuarioDB,
            token,
        })


        


    });
});

module.exports = app;