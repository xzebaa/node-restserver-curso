var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "149.56.198.135",
  user: "dorrolac_IRON",
  password: "hj95hrpkbfej",
  database: "dorrolac_IRONHIDE"
});
connection.connect();

const login = async dni => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM USERS WHERE DNI=${dni}`, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        const table = [];
        resp.forEach(product => {
          table.push(product);
        });
        resolve(table);
      }
    });
  });
};

const getServices = async () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM SERVICES`, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        const table = [];
        resp.forEach(product => {
          table.push(product);
        });
        resolve(table);
      }
    });
  });
};

const getReports = async () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM REPORTS`, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        const table = [];
        resp.forEach(product => {
          table.push(product);
        });
        resolve(table);
      }
    });
  });
};

const findServiceById = async servicesId => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM SERVICES where id=${servicesId}`,
      (err, resp) => {
        if (err) {
          reject(err);
        } else {
          const table = [];
          resp.forEach(product => {
            table.push(product);
          });
          resolve(table);
        }
      }
    );
  });
};

const findReportByID = async reportId => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM REPORTS WHERE id=${reportId}`,
      (err, resp) => {
        if (err) {
          reject(err);
        } else {
          const table = [];
          resp.forEach(product => {
            table.push(product);
          });
          resolve(table);
        }
      }
    );
  });
};

const createService = async (service = {}) => {
  return new Promise((resolve, reject) => {
    var post = {
      date: new Date(),
      activities_services_id: service.activities_services_id,
      comentary: service.comentary,
      informant_dni: service.informant_dni,
      office_id: service.sucursal_id,
      categorie_service_id: 100 // por default
    };

    connection.query("INSERT INTO SERVICES SET ?", post, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        // const table = [];
        console.log(resp);
        // resp.forEach((product) => {

        //     table.push(product)
        // })
        resolve(resp);
      }
    });
  });
};

const createReport = async (report = {}) => {
  return new Promise((resolve, reject) => {
    var post = {
      comentary: report.comentary,
      reported_date: new Date(),
      informant_dni: report.dni,
      informant_extra_email: report.extra_email,
      informant_extra_number1: report.extra_number1,
      informant_extra_number2: report.extra_number2,
      active: 1,
      last_update_date: new Date(),
      office_id: report.office,
      status_id: 1,
      service_id: 100,
      activities_services_id: report.service
    };

    connection.query("INSERT INTO REPORTS SET ?", post, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        const table = [];
        //   console.log(resp)
        resolve(resp);
      }
    });
  });
};

const insertImageServices = async (service = {}) => {
  return new Promise((resolve, reject) => {
    const { service_id, file_name } = service;
    var post = {
      file_name: file_name,
      date: new Date(),
      active: 1,
      service_id: service_id
    };

    connection.query("INSERT INTO IMAGES_SERVICES SET ?", post, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        // console.log(resp)
        resolve(resp);
      }
    });
  });
};

const insertImageReport = async (report = {}) => {
  return new Promise((resolve, reject) => {
    const { report_id, file_name } = report;

    var post = {
      file_name,
      date: new Date(),
      active: 1,
      report_id
    };

    connection.query("INSERT INTO IMAGES_REPORTS SET ?", post, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        // console.log(resp)
        resolve(resp);
      }
    });
  });
};

const getActivitiServices = async () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id, name FROM ACTIVITIES_SERVICES`,
      (err, resp) => {
        if (err) {
          reject(err);
        } else {
          const table = [];
          resp.forEach(product => {
            table.push(product);
          });
          resolve(table);
        }
      }
    );
  });
};

const getCategoriesServices = async () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id, name FROM CATEGORIES_SERVICES`,
      (err, resp) => {
        if (err) {
          reject(err);
        } else {
          const table = [];
          resp.forEach(product => {
            table.push(product);
          });
          resolve(table);
        }
      }
    );
  });
};

const getOffices = async () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT id, name FROM OFFICES`, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        const table = [];
        resp.forEach(product => {
          table.push(product);
        });
        resolve(table);
      }
    });
  });
};

const getCompanys = async () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id, name FROM COMPANYS WHERE ACTIVE = 1`,
      (err, resp) => {
        if (err) {
          reject(err);
        } else {
          const table = [];
          resp.forEach(product => {
            table.push(product);
          });
          resolve(table);
        }
      }
    );
  });
};

const getOfficesByCompanyId = async companyId => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id, name FROM OFFICES WHERE company_id=${companyId}`,
      (err, resp) => {
        if (err) {
          reject(err);
        } else {
          const table = [];
          resp.forEach(product => {
            table.push(product);
          });
          resolve(table);
        }
      }
    );
  });
};

const getReportMailForId = async reportId => {
  return new Promise((resolve, reject) => {
    connection.query(
      `select RPRT.id ,
        USR.name as nombre,
        USR.last_name as apellido,
        USR.dni as rut,
        COMPNY.name as empresa,
        OFFI.name as oficina,
        ACTSERVICES.name as servicio_name,
        RPRT.comentary as comentario,
        RPRT.informant_extra_email as mail,
        RPRT.informant_extra_number1 as numero
        from REPORTS as RPRT
        INNER JOIN OFFICES AS OFFI
        ON RPRT.office_id = OFFI.id
        INNER JOIN ACTIVITIES_SERVICES AS ACTSERVICES
        ON RPRT.activities_services_id = ACTSERVICES.id
        INNER JOIN USERS AS USR
        ON RPRT.informant_dni = USR.dni
        INNER JOIN COMPANYS AS COMPNY
        ON OFFI.company_id = COMPNY.id
        where RPRT.id=${reportId}`,
      (err, resp) => {
        if (err) {
          reject(err);
        } else {
          const table = [];
          resp.forEach(product => {
            table.push(product);
          });
          resolve(table);
        }
      }
    );
  });
};

const getAllReportForDni = async dni => {
  return new Promise((resolve, reject) => {
    connection.query(
      `select RPRT.id ,
        USR.name as nombre,
        USR.last_name as apellido,
        USR.dni as rut,
        COMPNY.name as empresa,
        OFFI.name as oficina,
        ACTSERVICES.name as servicio_name,
        RPRT.comentary as comentario,
        RPRT.informant_extra_email as mail,
        RPRT.informant_extra_number1 as numero
        from REPORTS as RPRT
        INNER JOIN OFFICES AS OFFI
        ON RPRT.office_id = OFFI.id
        INNER JOIN ACTIVITIES_SERVICES AS ACTSERVICES
        ON RPRT.activities_services_id = ACTSERVICES.id
        INNER JOIN USERS AS USR
        ON RPRT.informant_dni = USR.dni
        INNER JOIN COMPANYS AS COMPNY
        ON OFFI.company_id = COMPNY.id
        where RPRT.informant_dni=${reportId}`,
      (err, resp) => {
        if (err) {
          reject(err);
        } else {
          const table = [];
          resp.forEach(product => {
            table.push(product);
          });
          resolve(table);
        }
      }
    );
  });
};

const getImagesReportByReportId = async reportId => {
  return new Promise((resolve, reject) => {
    connection.query(
      `select id, file_name from IMAGES_REPORTS where report_id=${reportId}`,
      (err, resp) => {
        if (err) {
          reject(err);
        } else {
          const table = [];
          resp.forEach(product => {
            table.push(product);
          });
          resolve(table);
        }
      }
    );
  });
};


const getServiceMailForId = async serviceId => {
    return new Promise((resolve, reject) => {
      connection.query(
        `select 
        SERV.id ,
        SERV.comentary as comentario,
        USR.name as nombre,
        USR.last_name as apellido,
        USR.dni as rut,
        COMPNY.name as empresa,
        OFFI.name as oficina,
        ACTSERVICES.name as servicio_name
        from SERVICES as SERV
        INNER JOIN OFFICES AS OFFI
        ON SERV.office_id = OFFI.id
        INNER JOIN ACTIVITIES_SERVICES AS ACTSERVICES
        ON SERV.activities_services_id = ACTSERVICES.id
        INNER JOIN USERS AS USR
        ON SERV.informant_dni = USR.dni
        INNER JOIN COMPANYS AS COMPNY
        ON OFFI.company_id = COMPNY.id
        where SERV.id=${serviceId}`,
        (err, resp) => {
          if (err) {
            reject(err);
          } else {
            const table = [];
            resp.forEach(product => {
              table.push(product);
            });
            resolve(table);
          }
        }
      );
    });
  };

  const getAllServiceForDni = async dni => {
    return new Promise((resolve, reject) => {
      
      connection.query(
        `select 
        SERV.id ,
        SERV.comentary as comentario,
        USR.name as nombre,
        USR.last_name as apellido,
        USR.dni as rut,
        COMPNY.name as empresa,
        OFFI.name as oficina,
        ACTSERVICES.name as servicio_name
        from SERVICES as SERV
        INNER JOIN OFFICES AS OFFI
        ON SERV.office_id = OFFI.id
        INNER JOIN ACTIVITIES_SERVICES AS ACTSERVICES
        ON SERV.activities_services_id = ACTSERVICES.id
        INNER JOIN USERS AS USR
        ON SERV.informant_dni = USR.dni
        INNER JOIN COMPANYS AS COMPNY
        ON OFFI.company_id = COMPNY.id
        where SERV.informant_dni=${dni}`,
        (err, resp) => {
          if (err) {
            reject(err);
          } else {
            const table = [];
            resp.forEach(product => {
              table.push(product);
            });
            resolve(table);
          }
        }
      );
    });
  };

const getImagesServiceByServiceId = async serviceId => {
  return new Promise((resolve, reject) => {
    connection.query(
      `select id, file_name from IMAGES_SERVICES where service_id=${serviceId}`,
      (err, resp) => {
        if (err) {
          reject(err);
        } else {
          const table = [];
          resp.forEach(product => {
            table.push(product);
          });
          resolve(table);
        }
      }
    );
  });
};

module.exports = {
  login,
  getServices,
  getReports,
  createService,
  createReport,
  insertImageServices,
  insertImageReport,
  findServiceById,
  findReportByID,
  getActivitiServices,
  getCategoriesServices,
  getOffices,
  getOfficesByCompanyId,
  getCompanys,
  getReportMailForId,
  getImagesReportByReportId,
  getImagesServiceByServiceId,
  getServiceMailForId,
  getAllReportForDni,
  getAllServiceForDni
};
