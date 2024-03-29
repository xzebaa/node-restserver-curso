const express = require('express');
const app = express()
const nodemailer = require('nodemailer');

const CORREO_ENVIO = "sealvarezlazo@gmail.com, rodrigogarridov@gmail.com, Jcobos@smu.cl, Lcollao@smu.cl, ariel.maturana@klin.cl, cconcha@klin.cl, pgodoy@smu.cl, ";
// const CORREO_ENVIO = "sealvarezlazo@gmail.com, rodrigogarridov@gmail.com, ";
// const CORREO_ENVIO = "x.zebaa@gmail.com, cconcha@klin.cl, ariel.maturana@klin.cl, rodrigogarridov@gmail.com, ";

const { 
    getReportMailForId,
    getImagesReportByReportId,
    getImagesServiceByServiceId,
    getServiceMailForId
} = require('../data/db');

 app.post('/mail/repor/send', async  (req, resp) =>{

    const { id : idReporte }= req.body;

    if ( !idReporte ) {
        return resp.status(400).json({
            ok:false, 
            error: {
                message:'Error en request.'
            }
        });
    }

    try {
        const repsonseDB = await getReportMailForId(idReporte);
  
        const transporter =  nodemailer.createTransport({
            host: "mail.dorrola.com",
            port: 587,
            auth: {
              user: "reportes@simplecheck.cl",
            pass: "5xjse1zil49y"
            },
            tls: {
                rejectUnauthorized: false
            }
          });

        const imagesReport = await getImagesReportByReportId(idReporte);
        
        let fileStoreReport = '';
        let attachment = [];
        console.log(repsonseDB);
        
        imagesReport.forEach( (archivo, index)=> {

            attachment.push({path:  archivo.file_name});
            fileStoreReport += `<p>IMAGEN = ${archivo.file_name}</p> </br>` ;
        });
        console.log(fileStoreReport);
        
    
        const mailOptions = {
          from: "reportes@simplecheck.cl",
        to: CORREO_ENVIO,
          // to: "x.zebaa@gmail.com, cconcha@klin.cl, ariel.maturana@klin.cl, ",
          subject: `[REPORTE] - EMPRESA: ${repsonseDB[0].empresa} - nuevo reporte de servicio `,
          text: "SIMPLECHECK",
          attachments: attachment,
          html: `
            <p>ID REPORTE = ${repsonseDB[0].id}</p> </br>
            <p>NOMBRE = ${repsonseDB[0].nombre}</p> </br>
            <p>APELLIDO = ${repsonseDB[0].apellido}</p> </br>
            <p>RUT = ${repsonseDB[0].rut}</p> </br>
            <p>EMPRESA = ${repsonseDB[0].empresa}</p> </br>
            <p>OFICINA = ${repsonseDB[0].oficina}</p> </br>
            <p>SERVICIO PRESTADO = ${repsonseDB[0].servicio_name}</p> </br>
            <p>COMENTARIO = ${repsonseDB[0].comentario}</p> </br>
            <p>MAIL = ${repsonseDB[0].mail}</p> </br>
            <p>NUMERO TELEFONO = ${repsonseDB[0].numero}</p> </br></br>
            <p>IMAGENES ADJUNTAS</p> </br>
            ${fileStoreReport}
            `
        };
    
        console.log('enviando  mail')
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
    
        return resp.json({
            ok: true,
          });
      } catch (error) {
          console.log(error);
          return resp.status(400).json({
            ok:false, 
            error: {
                message: error.message
            }
        });
      }

 });

app.post('/mail/service/send', async  (req, resp) =>{

  const { id : idService }= req.body;

  if ( !idService ) {
      return resp.status(400).json({
          ok:false, 
          error: {
              message:'Error en request.'
          }
      });
  }

  try {
      const repsonseDB = await getServiceMailForId(idService);

      const transporter =  nodemailer.createTransport({
          host: "mail.dorrola.com",
          port: 587,
          auth: {
            user: "notificaciones@simplecheck.cl",
            pass: "ft10aj3nig22"
          },
          tls: {
              rejectUnauthorized: false
          }
        });

      const imagesReport = await getImagesServiceByServiceId(idService);
      
      let fileStoreReport = '';
      let attachment = [];
      console.log(repsonseDB);
      
      imagesReport.forEach( (archivo, index)=> {

          attachment.push({path:  archivo.file_name});
          fileStoreReport += `<p>IMAGEN = ${archivo.file_name}</p> </br>` ;
      });
      console.log('fileStoreReport');

      console.log(fileStoreReport);
      
  
      const mailOptions = {
        from: "notificaciones@simplecheck.cl",
        to: CORREO_ENVIO,
        // to: "x.zebaa@gmail.com, cconcha@klin.cl, ariel.maturana@klin.cl, ",
        subject: `[SERVICIO REGISTRADO] - EMPRESA: ${repsonseDB[0].empresa} - nuevo reporte de servicio `,
        text: "SIMPLECHECK",
        attachments: attachment,
        html: `
          <p>ID SERVICIO = ${repsonseDB[0].id}</p> </br>
          <p>NOMBRE = ${repsonseDB[0].nombre}</p> </br>
          <p>APELLIDO = ${repsonseDB[0].apellido}</p> </br>
          <p>RUT = ${repsonseDB[0].rut}</p> </br>
          <p>EMPRESA = ${repsonseDB[0].empresa}</p> </br>
          <p>OFICINA = ${repsonseDB[0].oficina}</p> </br>
          <p>SERVICIO PRESTADO = ${repsonseDB[0].servicio_name}</p> </br>
          <p>COMENTARIO = ${repsonseDB[0].comentario}</p> </br>
          <p>IMAGENES ADJUNTAS</p> </br>
          ${fileStoreReport}
          `
      };
  
      console.log('enviando  mail')
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
  
      return resp.json({
          ok: true,
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
          ok:false, 
          error: {
              message: error.message
          }
      });
    }

});

module.exports = app;