const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'srv868.hstgr.io',
    user: 'u428545357_admin',
    password: 'IC1t+wd+Vf~2',
    database: 'u428545357_pfumg',
    connectTimeout: 10000, // Tiempo máximo para conectarse (10s)
    acquireTimeout: 30000, // Tiempo máximo para adquirir conexión (30s)
    timeout: 60000, // Tiempo de espera de inactividad (60s)
    connectionLimit: 10, // Máximo de conexiones simultáneas
    waitForConnections: true,
    queueLimit: 0, // Ilimitado
});

pool.on('connection', (connection) => {
    console.log('Nueva conexión establecida con la base de datos');
});

pool.on('acquire', (connection) => {
    console.log(`Conexión ${connection.threadId} adquirida`);
});

pool.on('release', (connection) => {
    console.log(`Conexión ${connection.threadId} liberada`);
});

pool.on('error', (err) => {
    console.error('Error en el pool de conexiones:', err);
});

module.exports = pool;
