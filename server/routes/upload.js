const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const Ususario = require('../models/usuario');
const Producto = require('../models/producto');


const app = express();

app.use(fileUpload({ useTempFiles: true }));

// app.put('/upload/:tipo/:id', (req, res) => {

//     const { tipo, id } = req.params;

    
    
//     const tiposValidos = ['reporte', 'servicio'];
    
//     console.log(tiposValidos.indexOf( tipo ));

//     if ( tiposValidos.indexOf( tipo ) < 0 ){
//         return res.status(400).json({
//             ok:false, 
//             error: {
//                 message:'tipo no valido'
//             }
//         });
//       }

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).json({
//             ok:false, 
//             error: {
//                 message:'No files were uploaded.'
//             }
//         });
//       }
    
//       // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//       let archivo = req.files.archivo;

//       const nombreCortado = archivo.name.split('.');
//       let extension = nombreCortado[nombreCortado.length-1]; 

//       console.log(nombreCortado);
//       let extensionesValidas = ['jpg', 'png', 'jpeg', 'img'];

//       if (extensionesValidas.indexOf( extension ) < 0)
//       {
//           return res.status(400).json({
//               ok: false,
//               error: {
//                   menssage: `la extension ${extension} no es valida`
//               }
//           })
//       }
      
//     // cambiar nombre archivo
//     const nombreArchivo = `${id}-${new Date().getMilliseconds() }.${extension}`
      
//       archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (error) => {
//         if (error)
//           return res.status(500).json({
//             ok:false, 
//             error
//         });

//         if (tipo === 'productos') imagenProducto (id, nombreArchivo, res);
//         if (tipo === 'usuarios') imagenUsuario  (id, nombreArchivo, res);
       
//     });
// });

// const imagenUsuario = async (id,   nombreArchivo, res) => {

//     try {
//         const usuarioDB = await Ususario.findById(id);

//         if (!usuarioDB){
//             borraArchivo(nombreArchivo, 'usuarios');
//             res.status(500);
//             return res.json({
//                 ok: false,
//                 error: {
//                     message: 'Usuario no encontrado',
//                 },
//             })
//         }

//         // elimina imagen previa antes de cargar nueva imagen a modelo usuario
//         borraArchivo(usuarioDB.img, 'usuarios');
        
//         usuarioDB.img = nombreArchivo;

//         const usuarioGuardado = await usuarioDB.save();

//         return res.json({
//             ok: true,
//             usuario: usuarioGuardado,
//             img: nombreArchivo,
//         })


//     } catch (error) {

//         borraArchivo(nombreArchivo, 'usuarios');
//         return res.status(500).json({
//             ok: false,
//             error,
//         });
//     }

// };

// const imagenProducto = async(id, nombreArchivo, res) => {

//     try {

//         const productoDB = await Producto.findById(id);
//         if (!productoDB){
//             borraArchivo(nombreArchivo, 'productos');
//             res.status(500);
//             return res.json({
//                 ok: false,
//                 error: {
//                     message: 'Usuario no encontrado',
//                 },
//             })
//         }

//         borraArchivo(productoDB.img, 'productos');
//         productoDB.img = nombreArchivo;

//         const productoActualizado = await productoDB.save();

//         return res.json({
//             ok: true,
//             producto: productoActualizado,
//             img: nombreArchivo,
//         })
        
//     } catch (error) {
//         borraArchivo(nombreArchivo, 'productos');
//         return res.status(500).json({
//             ok: false,
//             error,
//         });
//     }

// };

//  const borraArchivo = ( nombreImagen, tipo ) => {
//     let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
//     if (fs.existsSync(pathImage)){
//         fs.unlinkSync(pathImage);
//     }
//  }

 app.post('/upload2', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false, 
            error: {
                message:'No files were uploaded.'
            }
        });
    }
  
    // cambiar nombre archivo
    // const nombreArchivo = `${id}-${new Date().getMilliseconds() }.${extension}`
    
    let archivo = req.files.archivo;
    console.log(Array.isArray(archivo));

    let filesTemp = [];
    if(Array.isArray(archivo)){
        filesTemp = archivo;
    } else {
        filesTemp.push(archivo);
    }

    filesTemp.forEach(item => {
        console.log(item.name);
        item.mv(`uploads/${item.name}`, (error) => {
            if (error)
              return res.status(500).json({
                ok:false, 
                error
            });       
        });
    });

    return res.json({
        ok: true,
       message: 'imagen subida'
    })
  });



module.exports = app;