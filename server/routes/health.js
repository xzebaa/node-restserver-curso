const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');


cloudinary.config({ 
  cloud_name: 'dorrola', 
  api_key: '777962735876462', 
  api_secret: '1TZE4RhMDv1u-f4f8MicGhvLUmo' 
});

// app.use( fileUpload({ 
//     limits: {
//     fileSize: 1024 * 1024 * 1024 * 1024,
//     abortOnLimit: false,
//     },
//     useTempFiles: true,
//     tempFileDir: '/tmp/'
//   }
// ));



app.get("/health", async (req, resp) => {
  const info = {
    "node-version": process.version,
    memory: process.memoryUsage(),
    pid: process.pid,
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    appName: process.env.name,
    appVersion: process.env.npm_package_version,
    hostname: process.env.HOSTNAME
  };

  return resp.json({
    ok: true,
    info
  });
});

// app.get("/testMail", async (req, resp) => {
//   try {
//     const repsonseDB = await getReportMailForId(100);
//     console.log(repsonseDB[0].nombre);

//     const transporter =  nodemailer.createTransport({
//         host: "mail.dorrola.com",
//         port: 587,
//         auth: {
//           user: "simplecheck@dorrola.com",
//           pass: "Xebitay123"
//         },
//         tls: {
//             rejectUnauthorized: false
//         }
//       });

//     const attachments = [
//       {
//         // filename and content type is derived from path
//         path: path.resolve(
//           __dirname,
//           `../../uploads/report/111-1597977118849-0.jpg`
//         )
//       },
//       {
//         // filename and content type is derived from path
//         path: path.resolve(
//           __dirname,
//           `../../uploads/report/111-1597977118849-0.jpg`
//         )
//       },
//       {
//         // filename and content type is derived from path
//         path: path.resolve(
//           __dirname,
//           `../../uploads/report/111-1597977118849-0.jpg`
//         )
//       },
//       {
//         // filename and content type is derived from path
//         path: path.resolve(
//           __dirname,
//           `../../uploads/report/111-1597977118849-0.jpg`
//         )
//       }
//     ];

//     const mailOptions = {
//       from: "simplecheck@dorrola.com",
//       to: "x.zebaa@gmail.com",
//       attachments: attachments,
//       subject: "[REPORTE]",
//       text: "hello world",
//       html: `
//         <p>ID REPORTE = ${repsonseDB[0].id}</p> </br>
//         <p>NOMBRE = ${repsonseDB[0].nombre}</p> </br>
//         <p>RUT = ${repsonseDB[0].rut}</p> </br>
//         <p>EMPRESA = ${repsonseDB[0].empresa}</p> </br>
//         <p>OFICINA = ${repsonseDB[0].oficina}</p> </br>
//         <p>SERVICIO PRESTADO = ${repsonseDB[0].servicio_name}</p> </br>
//         <p>COMENTARIO = ${repsonseDB[0].comentario}</p> </br>
//         <p>MAIL = ${repsonseDB[0].mail}</p> </br>
//         <p>NUMERO TELEFONO = ${repsonseDB[0].numero}</p> </br>
//         `
//     };
//     console.log('intentando enviar mail');
//     transporter.sendMail(mailOptions, function(error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });

//     return resp.json({
//       ok: true
//     });
//   } catch (error) {
//       console.log(error)
//     return resp.json({
//       ok: false
//     });
//   }
// });

app.post('/seeend/:reporteId', async (req, resp) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return resp.status(400).json({
        ok:false, 
        error: {
            message:'No files were uploaded.'
        }
    });
  }

  try {
    const { reporteId } = req.params;
    console.log(reporteId);

    let archivo = req.files.archivo;

    let filesTemp = [];

    if(Array.isArray(archivo)){
        filesTemp = archivo;
    } else {
        filesTemp.push(archivo);
    }

    await filesTemp.forEach( async (item, index)=> {
      const fileResponse =  await uploadToCloudinary(item.tempFilePath);
      console.log('fileResponse');
      console.log(fileResponse);
      borraArchivo(item.tempFilePath);
      return fileResponse; 
    });
    
    return resp.json({
      ok: true
    });
  
  } catch (error) {
    return resp.status(400).json({
      ok:false, 
      error: {
          message:'error ERROR al subir el archivo'
      }
  });;
  }

});

const borraArchivo = ( nombreImagen ) => {
  let pathImage = path.resolve(__dirname, nombreImagen);
  if (fs.existsSync(pathImage)){
      fs.unlinkSync(pathImage);
  }
}

const  uploadToCloudinary = async (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, (err, url) => {
      if (err) return reject(err);
      return resolve(url);
    })
  });
}

module.exports = app;
