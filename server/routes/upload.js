const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const nodemailer = require('nodemailer');


const { 
    insertImageReport,
    getReportMailForId
} = require('../data/db');

const app = express();

app.use(fileUpload({ useTempFiles: true }));

 app.post('/upload/report/:reporteId', async  (req, res) =>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false, 
            error: {
                message:'No files were uploaded.'
            }
        });
    }
    let arrayImagenes = [];
    const { reporteId } = req.params;
    console.log(reporteId);

    let archivo = req.files.archivo;
    console.log(Array.isArray(archivo));
    console.log(archivo);

    let filesTemp = [];

    if(Array.isArray(archivo)){
        filesTemp = archivo;
    } else {
        filesTemp.push(archivo);
    }

    filesTemp.forEach( (item, index)=> {

        const nombreCortado = item.name.split('.');
        let extension = nombreCortado[nombreCortado.length-1]; 
    
        console.log(nombreCortado);
        // cambiar nombre archivo
        const nombreArchivo = `${reporteId}-${Date.now() }-${index}.${extension}`

        console.log(nombreArchivo);
        item.mv(`uploads/report/${nombreArchivo}`, (error) => {

            if (error){
                return res.status(500).json({
                    ok:false, 
                    error
                }); 
            }
            const reportImagen = {
                report_id: reporteId,
                file_name: nombreArchivo
            };
            arrayImagenes.push(nombreArchivo);
            insertImageReport(reportImagen);
        });
    });
    await envioMail(reporteId, arrayImagenes);

    return res.json({
        ok: true,
       message: 'imagen subida'
    })
  });

  const envioMail = async (idReporte, arrayImagenes) => {

    console.log(' entre aca')

    try {
        const repsonseDB = await getReportMailForId(idReporte);
        console.log(repsonseDB[0].nombre);
    
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "sealvarezlazo@gmail.com",
            pass: "Xebitay123" // naturally, replace both with your real credentials or an application-specific password
          }
        });
        let attachments = [];

        arrayImagenes.forEach( (nombreArchivo, index)=> {
            attachments.push({
                // filename and content type is derived from path
                path: path.resolve(
                  __dirname,
                  `../../uploads/report/${nombreArchivo}`
                )
              })
        });
    
        const mailOptions = {
          from: "norespionse@prueba.com",
          to: "x.zebaa@gmail.com, sebastian.alvarez@peanuthub.cl",
          attachments: attachments,
          subject: `[REPORTE] - EMPRESA: ${repsonseDB[0].empresa} - nuevo reporte de servicio `,
          text: "SIMPLECHECK",
          html: `
            <p>ID REPORTE = ${repsonseDB[0].id}</p> </br>
            <p>NOMBRE = ${repsonseDB[0].nombre}</p> </br>
            <p>RUT = ${repsonseDB[0].rut}</p> </br>
            <p>EMPRESA = ${repsonseDB[0].empresa}</p> </br>
            <p>OFICINA = ${repsonseDB[0].oficina}</p> </br>
            <p>SERVICIO PRESTADO = ${repsonseDB[0].servicio_name}</p> </br>
            <p>COMENTARIO = ${repsonseDB[0].comentario}</p> </br>
            <p>MAIL = ${repsonseDB[0].mail}</p> </br>
            <p>NUMERO TELEFONO = ${repsonseDB[0].numero}</p> </br>
            `
        };
    
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
    
        console.log('exito');
        return true;
      } catch (error) {
          console.log(error);
        return false;
      }
  }

module.exports = app;