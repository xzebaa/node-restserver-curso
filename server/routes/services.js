const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { 
    getServices,
    createService , 
    insertImageServices, 
    findServiceById ,
    getActivitiServices,
    getCategoriesServices,
    getOffices,
    getOfficesByCompanyId,
    getCompanys,
    createReport
} = require('../data/db');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);

app.post('/service',  async  (req, resp) => {

    console.log(req.body);
    console.log(req.param);
    const {
        activities_services_id = '',
        comentary = '',
        informant_dni = '',
        sucursal_id = ''
    } = req.body;

    const service = {
        activities_services_id,
        comentary,
        informant_dni,
        sucursal_id
        };

    try {
        const usuarioDB = await createService(service);

        return resp.json({
            ok: true,
            servicio: usuarioDB
        })


    } catch (error) {
        resp.status(500);
        return resp.json({
            ok: false,
            error,
        })
    }
});

//////////////////////
// OBTENER PRODUCTO POR ID
//////////////////////
app.get('/service/:id', async (req, res) => {

  const { id } = req.params;

  try {
      const serviceDB = await findServiceById(id);
      
      return res.json({
          ok: true,
          service: serviceDB,
      });

  } catch (error) {
      return res.status(500).json({
          ok: false,
          error,
      });
  }
});

//////////////////////
// OBTENER activities 
//////////////////////
app.get('/service-activities', async (req, res) => {
  
  try {
      const activitiServiceDB = await getActivitiServices();
      
      return res.json({
          ok: true,
          activities: activitiServiceDB,
      });

  } catch (error) {
      return res.status(500).json({
          ok: false,
          error,
      });
  }
});

//////////////////////
// OBTENER CATEGORIES 
//////////////////////
app.get('/service-categories', async (req, res) => {
  
  try {
      const responseDB = await getCategoriesServices();
      
      return res.json({
          ok: true,
          categories: responseDB,
      });

  } catch (error) {
      return res.status(500).json({
          ok: false,
          error,
      });
  }
});

//////////////////////
// OBTENER CATEGORIES 
//////////////////////
app.get('/service-company', async (req, res) => {
  
  try {
      const responseDB = await getCompanys();
      
      return res.json({
          ok: true,
          categories: responseDB,
      });

  } catch (error) {
      return res.status(500).json({
          ok: false,
          error,
      });
  }
});getCompanys

//////////////////////
// OBTENER OFICINAS POR ID DE COMPAÑIA
//////////////////////
app.get('/service-offices/company/:id', async (req, res) => {
  console.log('offices request')
  try {
      const { id } = req.params;
      const responseDB = await getOfficesByCompanyId(id);
      
      return res.json({
          ok: true,
          offices: responseDB,
      });

  } catch (error) {
      return res.status(500).json({
          ok: false,
          error,
      });
  }
});

//////////////////////
// OBTENER PRODUCTO POR ID
//////////////////////
app.post('/service/report', async (req, res) => {


    const {
        dni = '',
        comentary = '',
        extra_email = '',
        extra_number1 = '',
        extra_number2 = '',
        office = '',
        company = '',
        service = ''
    } = req.body;

    const report = {
        dni,
        comentary,
        extra_email,
        extra_number1,
        extra_number2,
        office,
        company,
        service
        };
  
    try {
        const serviceDB = await createReport(report);
        
        return res.json({
            ok: true,
            report: serviceDB,
        });
  
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
        });
    }
  });

module.exports = app;