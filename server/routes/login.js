const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);

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
        );

        return resp.json({
            ok: true,
            usuario: usuarioDB,
            token,
        })
    });
});

// CONFIGURACIONES DE GOOGLE

app.post('/google', async (req, res) => {
    const token_google = req.body.idtoken;
    const googleUser = await verify(token_google)
        .catch( (error) => {
            res.status(403);
            return res.json({
                ok: false,
                  
            });
        })
    
    Usuario.findOne({email: googleUser.email}, (error, usuarioDB) =>{
        if (error){
            res.status(500);
            return res.json({
                ok: false,
                error,
            })
        }

        if (usuarioDB){
            if (!usuarioDB.google){
                res.status(400);
                return res.json({
                    ok: false,
                    error: {
                        mmessage: 'debe ingresar por login normal'
                    }
                })
            }else{
                const token = jwt.sign(
                    { usuarioDB },
                    process.env.SEED,
                    {
                        expiresIn: process.env.CADUCIDAD_TOKEN,
                    }
                );

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token,
                })
            }
        } else{
            // si el usuario no exitse en la base de datos
            let usuario = new Usuario();
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = 'google_user'; 

            usuario.save( (error, usuarioDB) => {
                if (error){
                    res.status(500);
                    return res.json({
                        ok: false,
                        error,
                    })
                }

                const token = jwt.sign(
                    { usuarioDB },
                    process.env.SEED,
                    {
                        expiresIn: process.env.CADUCIDAD_TOKEN,
                    }
                );

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token,
                })
            });  
        }
    })
    
})

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID_GOOGLE,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    const { name: nombre, email, picture: img} = payload;
    const google = true;
    console.log({...payload});

    return {
        nombre,
        email,
        img,
        google,
    };
}

module.exports = app;