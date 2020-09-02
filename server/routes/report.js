const express = require('express');
const app = express();
const { 
    getAllReportForDni,
    getImagesReportByReportId
} = require('../data/db');

app.get('/reports/report/user/:dni', async  (req, resp) =>{

    const { dni }= req.params;

    if ( !dni ) {
        return resp.status(400).json({
            ok:false, 
            error: {
                message:'Error en request.'
            }
        });
    }

    try {
        const repsonseDB = await getAllReportForDni(dni);

        let listService = [];
        const lista = [];

        for (var i = 0; i < repsonseDB.length; i++) {
            if(repsonseDB[i].id){
                let imagesReport = await getImagesReportByReportId(repsonseDB[i].id);
                // obtiene imagenes 
                let imagenes = [];
                for (var p = 0; p < imagesReport.length; p++) {
                    imagenes.push({ url: imagesReport[p].file_name});
                }
                listService.push({...repsonseDB[i], imagenes});
            }
        }
  
        // const imagesReport = await getImagesReportByReportId(idReporte);

        return resp.json({
            ok: true,
            services: listService
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