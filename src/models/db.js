const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'srv868.hstgr.io', //AQUI IRIA LA URL DEL DOMINIO WEB
    user: 'u428545357_admin',
    password: 'IC1t+wd+Vf~2',
    database: 'u428545357_pfumg'
});


module.exports = connection;