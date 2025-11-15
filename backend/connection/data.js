import sql from 'mssql';


export const db = {
  user: "sa",
  password: "123456",
  server: "localhost",
  database: "db_mercaduca",
    port: 1433,              
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const DB_CONFIG = (async () => {
  try {
    const pool = await sql.connect(db);
    console.log('DB: conexión correcta');
    await pool.close();
  } catch (err) {
    console.error('DB: fallo de conexión al arrancar:', err.message || err);
  }
})();
