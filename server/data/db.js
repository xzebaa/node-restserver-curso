var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'sql10.freesqldatabase.com',
    user     : 'sql10359520',
    password : 'HGvJqEflz5',
    database : 'sql10359520'
  });
  connection.connect();


  const login = async () => {
    return new Promise( (resolve,reject) => {
        connection.query(`SELECT * FROM USERS WHERE DNI=17420667`, (err, resp) => {
            if (err) {
                reject(err)
            } else {
                const table = [];
                resp.forEach((product) => {
                    
                    table.push(product)
                })
                resolve(table)
            }
        })
    })
}

  const findByQuery = () => {

  }

  module.exports = { login };