const mysql = require('mysql');

// Configuración inicial de la base de datos
const dbConfig = {
    host: 'srv868.hstgr.io', // URL del dominio web
    user: 'u428545357_admin',
    password: 'IC1t+wd+Vf~2',
    database: 'u428545357_pfumg',
    port: 3306, // Puerto por defecto de MySQL
    connectTimeout: 10000, // Tiempo máximo para intentar conectar (10 segundos)
    acquireTimeout: 10000, // Tiempo máximo para adquirir una conexión del pool
    waitForConnections: true, // Esperar si las conexiones están ocupadas
    connectionLimit: 10, // Máximo número de conexiones simultáneas
    queueLimit: 0 // Sin límite para la cola de conexiones
};

let connection;

function handleDisconnect() {
    // Crear una nueva conexión
    connection = mysql.createConnection(dbConfig);

    // Intentar conectar
    connection.connect(err => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err.message);
            setTimeout(handleDisconnect, 2000); // Reintentar después de 2 segundos
        } else {
            console.log('Conectado a la base de datos');
        }
    });

    // Manejo de errores
    connection.on('error', err => {
        console.error('Error en la conexión a la base de datos:', err.message);

        // Reconexión automática en caso de pérdida de protocolo o error de red
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            console.log('Intentando reconexión...');
            handleDisconnect();
        } else {
            throw err; // Lanza otros errores que no sean de conexión
        }
    });
}

// Inicia la conexión y gestiona reconexiones
handleDisconnect();

module.exports = connection;
