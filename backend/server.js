const express = require("express");
const path = require("path");
const cors = require("cors");
const sql = require("mssql");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => res.json({ ok: true }));

// --- Servir frontend Vite ---
app.use(express.static(path.join(__dirname, '../frontend/dist')));


// Escuchar en un puerto libre
// const server = app.listen(0, () => {
//   const PORT = server.address().port;
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });


const dbConfig = {
  user: "sa",
  password: "123456",
  server: "localhost",
  database: "db_mercaduca"
};

app.get('/productos' , async (req, res) =>{
  try {
    sql.connect(dbConfig)
    const result = await sql .query`SELECT * FROM Producto`;
    res.json(result.recordset);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("ERROORRRRR")
    alert('Error al conectar con el sql');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist'));
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
