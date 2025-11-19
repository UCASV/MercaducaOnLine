import sql from "mssql";

export const db = {
  user: "sa",
  password: "123456",
  server: "localhost",
  database: "db_mercaduca",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

//Pool Global
export const pool = new sql.ConnectionPool(db);
export const poolConnect = pool.connect();

// Exportar también SQL para usar los tipos
export { sql };
