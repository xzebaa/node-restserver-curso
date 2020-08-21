const express = require("express");
const app = express();
const { login, getReportMailForId } = require("../data/db");

const path = require("path");

const nodemailer = require("nodemailer");

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

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "sealvarezlazo@gmail.com",
//         pass: "Xebitay123" // naturally, replace both with your real credentials or an application-specific password
//       }
//     });

//     const attachments = [
//       {
//         // filename and content type is derived from path
//         path: path.resolve(
//           __dirname,
//           `../../uploads/report/54-1597949183892-0.png`
//         )
//       },
//       {
//         // filename and content type is derived from path
//         path: path.resolve(
//           __dirname,
//           `../../uploads/report/54-1597949183897-1.jpg`
//         )
//       },
//       {
//         // filename and content type is derived from path
//         path: path.resolve(
//           __dirname,
//           `../../uploads/report/54-1597949183897-2.png`
//         )
//       }
//     ];

//     const mailOptions = {
//       from: "norespionse@prueba.com",
//       to: "x.zebaa@gmail.com, sebastian.alvarez@peanuthub.cl",
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
//     return resp.json({
//       ok: false
//     });
//   }
// });
module.exports = app;
