const express = require('express');
const app = express();
const _ = require('underscore');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

const Producto = require('../models/producto');

//////////////////////
// OBTENER TODO LOS PRODUCTOS
//////////////////////
app.get('/producto', verificaToken, async (req, res) => {

    try {
        const filter = {disponible: true}
        const productosDB = await Producto.find(filter)
            .populate('usuario', 'nombre ema  il')
            .populate('categoria', 'descripcion')
            .exec();

        return res.json({
            ok: true,
            producto: productosDB,
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
        })
    }
});

//////////////////////
// buscar por nombre
//////////////////////
app.get('/producto/buscar/:termino', verificaToken, async (req, res) => {

    try {
        const termino = req.params.termino;
        const busquedaRegex = new RegExp(termino, 'i');
        const filter = {disponible: true, nombre:busquedaRegex }
        const productosDB = await Producto.find(filter)
            .populate('usuario', 'nombre ema  il')
            .populate('categoria', 'descripcion')
            .exec();

        return res.json({
            ok: true,
            producto: productosDB,
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
        })
    }
});


//////////////////////
// OBTENER PRODUCTO POR ID
//////////////////////
app.get('/producto/:id', verificaToken, async (req, res) => {

    const { id } = req.params;

    try {
        const productoDB = await Producto.findById(id);
        
        return res.json({
            ok: true,
            producto: productoDB,
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
        });
    }
});

//////////////////////
// CREAR PRODUCTO
//////////////////////
app.post('/producto', [verificaToken] , async (req, res) => {

    const { nombre, precioUni, descripcion, categoria } = req.body;
    const usuarioID = req.usuario._id;

    try {

        const producto = new Producto({
            nombre,
            precioUni,
            descripcion,
            categoria,
            usuario: usuarioID,
        });

        const productoDB = await producto.save();

        return res.json({
            ok: true,
            producto: productoDB,
        })
        
    } catch (error) {
         return res.status(500).json({
            ok: false,
            error,
        })
    }
});

//////////////////////
// ACTUALIZAR PRODUCTO POR ID
//////////////////////
app.put('/producto/:id', verificaToken, async (req, res) => {

    const { id } = req.params;
    const body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'categoria',]);

    try {
        const optionsUpdate = { new: true, runValidators: true};
        const productoDB = await Producto.findByIdAndUpdate(id, body, optionsUpdate);

        return res.json({
            ok: true,
            producto: productoDB,
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
        })
    }
});

//////////////////////
// BORRAR UN PRODUCTO (DESHABILITAR)
//////////////////////
app.delete('/producto/:id', verificaToken, async (req, res) => {
    const { id } = req.params;

    try {
        const optionsUpdate = { new: true, runValidators: true};
        const body = { disponible: false}
        const productoDB = await Producto.findByIdAndUpdate(id, body, optionsUpdate);

        return res.json({
            ok: true,
            producto: productoDB,
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
        })
    }

});

module.exports = app;
