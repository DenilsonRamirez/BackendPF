const mysql = require('mysql');

// Configuración inicial de la base de datos
const dbConfig = {
    host: 'srv868.hstgr.io',
    user: 'u428545357_admin',
    password: 'IC1t+wd+Vf~2',
    database: 'u428545357_pfumg',
    port: 3306,
    connectTimeout: 5000, // Tiempo máximo para intentar conectar (5 segundos)
    acquireTimeout: 10000, // Tiempo máximo para adquirir una conexión del pool
    waitForConnections: true,
    connectionLimit: 2, // Máximo número de conexiones simultáneas
    queueLimit: 0
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

            // Inicia la comprobación periódica de la conexión
            startConnectionCheck();
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

function startConnectionCheck() {
    // Función para comprobar la conexión cada 15 segundos
    setInterval(() => {
        connection.query('SELECT 1', (err, result) => {
            if (err) {
                console.error('Error al comprobar la conexión:', err.message);
                handleDisconnect(); // Reconecta si la conexión se ha perdido
            } else {
                console.log('Conexión activa');
            }
        });
    }, 15000);
}

// Inicia la conexión y gestiona reconexiones
handleDisconnect();

module.exports = connection;