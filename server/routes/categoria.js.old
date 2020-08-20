const express = require('express');
const app = express();
const _ = require('underscore');


const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');

// TODO: GET: muetra todas las categorias
app.get('/categoria', verificaToken, async (req, res) => {

    try {
        const categoriasDB = await Categoria.find({})
            .populate('usuario', 'nombre email')
            .sort('descripcion')
            .exec();

        return res.json({
            ok: true,
            categorias: categoriasDB,
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
        });
    }
});

// TODO: GET: mostrar categoria por id
app.get('/categoria/:id', verificaToken, async (req, res) =>{

    const { id } = req.params;

    try {
        const categoriaDB = await Categoria.findById(id).exec();

        if (!categoriaDB){
            return res.status(400).json({
                ok: false,
                error: { message: 'no se encuentra categoria'}
            })
        }

        return res.json({
            ok: true,
            categoria: categoriaDB,

        });   
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
        })
    }
});

// TODO: POST: Crear categoria, regresa la nueva categoria
app.post('/categoria', verificaToken, async (req, res) => {

    const { descripcion } = req.body;
    const { _id } = req.usuario;
    let categoria = new Categoria({
        descripcion,
        usuario: _id,
    });

    try {
        const categoriaDB = await categoria.save();

        return res.json({
            ok: true,
            categoria: categoriaDB,

        }); 
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
        })
    }
    
    
});

// TODO: PUT: Actualizar categoria, regresa la nueva categoria

app.put('/categoria/:id', verificaToken, async (req, res) => {
    
    const { id } = req.params;
    let body = _.pick(req.body, ['descripcion']);

    try {
        const optionsUpdate = { new: true, runValidators: true};
        const categoriaDB  = await Categoria.findByIdAndUpdate(id, body, optionsUpdate);
        
        return res.json({
            ok: true,
            categoria: categoriaDB,

        }); 
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
        })
    }
});


// TODO: DELETE: Borra categoria eliminar de bd,( solo un administeador puede borrar catewgorias)
app.delete('/categoria/:id', [verificaAdminRole, verificaToken], async (req, res) => {
    
    const { id } = req.params;
    let body = _.pick(req.body, ['descripcion']);

    try {
        const optionsUpdate = { new: true, runValidators: true};
        const categoriaBorrada  = await Categoria.findByIdAndRemove(id);

        if (!categoriaBorrada)
         {
            res.status(400);
            return res.json({
                ok: false,
                error: {
                    message: 'categoria no encontrado',
                },
            })
         }
        
        return res.json({
            ok: true,
            categoria: categoriaBorrada,

        }); 
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
        })
    }
});

module.exports = app;