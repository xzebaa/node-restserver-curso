const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");

const nodemailer = require("nodemailer");

const cloudinary = require("cloudinary").v2;

const { insertImageReport, getReportMailForId, insertImageServices } = require("../data/db");

cloudinary.config({
  cloud_name: "dorrola",
  api_key: "777962735876462",
  api_secret: "1TZE4RhMDv1u-f4f8MicGhvLUmo"
});

app.use(
  fileUpload({
    limits: {
      fileSize: 1024 * 1024 * 1024 * 1024,
      abortOnLimit: false
    },
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);

app.post("/upload/report/:reporteId", async (req, resp) => {
  console.log("ingrese");
  if (!req.files || Object.keys(req.files).length === 0) {
    return resp.status(400).json({
      ok: false,
      error: {
        message: "No files were uploaded."
      }
    });
  }

  try {
    const { reporteId } = req.params;
    console.log(reporteId);

    let archivo = req.files.archivo;

    let filesTemp = [];

    if (Array.isArray(archivo)) {
      filesTemp = archivo;
    } else {
      filesTemp.push(archivo);
    }

    for (const file of filesTemp) {
      const fileResponse = await uploadToCloudinary(file.tempFilePath);
      console.log("fileResponse");
      console.log(fileResponse);
      borraArchivo(file.tempFilePath);

      const reportImagen = {
        report_id: reporteId,
        file_name: fileResponse.secure_url
      };
      await insertImageReport(reportImagen);
      // return fileResponse;
    }

    console.log("saliendo");
    return resp.json({
      ok: true
    });
  } catch (error) {
    return resp.status(400).json({
      ok: false,
      error: {
        message: "error al subir el archivo"
      }
    });
  }
});

app.post("/upload/service/:serviceId", async (req, resp) => {
  console.log("ingrese");
  if (!req.files || Object.keys(req.files).length === 0) {
    return resp.status(400).json({
      ok: false,
      error: {
        message: "No files were uploaded."
      }
    });
  }

  try {
    const { serviceId } = req.params;
    console.log(serviceId);

    let archivo = req.files.archivo;

    let filesTemp = [];

    if (Array.isArray(archivo)) {
      filesTemp = archivo;
    } else {
      filesTemp.push(archivo);
    }

    for (const file of filesTemp) {
      const fileResponse = await uploadToCloudinary(file.tempFilePath);
      console.log("fileResponse");
      console.log(fileResponse);
      borraArchivo(file.tempFilePath);

      const serviceImagen = {
        service_id: serviceId,
        file_name: fileResponse.secure_url
      };
      await insertImageServices(serviceImagen);
      // return fileResponse;
    }

    console.log("saliendo");
    return resp.json({
      ok: true
    });
  } catch (error) {
    console.log(error);
    return resp.status(400).json({
      ok: false,
      error: {
        message: "error al subir el archivo"
      }
    });
  }
});

const borraArchivo = nombreImagen => {
  let pathImage = path.resolve(__dirname, nombreImagen);
  if (fs.existsSync(pathImage)) {
    fs.unlinkSync(pathImage);
  }
};

const uploadToCloudinary = async image => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, (err, url) => {
      if (err) return reject(err);
      return resolve(url);
    });
  });
};

module.exports = app;
