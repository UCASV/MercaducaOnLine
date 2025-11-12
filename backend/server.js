import express from 'express';
import cors from 'cors';
import path from 'path';
import sql from 'mssql';
import userRoutes from "./router/router.js"
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

//app.get("/api/test", (req, res) => res.json({ ok: true }));
app.use('/', userRoutes);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/Imagenes', express.static(path.join(__dirname, 'Imagenes')));

// --- Servir frontend Vite ---
app.use(express.static(path.join(__dirname, '../frontend/dist')));


// const dbConfig = {
//   user: "sa",
//   password: "123456",
//   server: "localhost",
//   database: "db_mercaduca",
//     port: 1433,               // ajustar si tu SQL usa otro puerto
//   options: {
//     encrypt: false,
//     trustServerCertificate: true
//   }
// };

// (async () => {
//   try {
//     const pool = await sql.connect(dbConfig);
//     console.log('DB: conexión correcta');
//     await pool.close();
//   } catch (err) {
//     console.error('DB: fallo de conexión al arrancar:', err.message || err);
//   }
// })();

// app.get('/productos', async (req, res) => {
//   try {
//     const pool = await sql.connect(dbConfig);
//     console.log('Connected to database');
    
//     const result = await pool.request()
//       .query('SELECT * FROM Producto AS p JOIN EmprendimientoxProducto AS ep ON p.id = ep.id_producto JOIN Imagen AS i ON i.id = ep.id_imagen');  // Make sure table name matches your DB
    
//     console.log('Query result:', result);
//     res.json(result.recordset);
//   } catch (error) {
//     console.error('Database error:', error);
//     res.status(500).json({ 
//       error: 'Error al obtener productos',
//       details: error.message 
//     });
//   } finally {
//     try { 
//       await sql.close();
//     } catch(e) { /* ignore */ }
//   }
// });

app.get('/productosMasVendidos', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log('Connected to database');
    
    const result = await pool.request()
      .query(`SELECT * FROM Producto AS p 
                JOIN EmprendimientoxProducto AS ep 
                  ON p.id = ep.id_producto 
                JOIN Imagen AS i 
                  ON i.id = ep.id_imagen 
                JOIN ProductosMasVendidos AS pv 
                  ON pv.id_producto = p.id 
                JOIN Categoria AS c 
                  ON C.id = P.id_categoria`);  // Make sure table name matches your DB
    
    console.log('Query result:', result);
    res.json(result.recordset);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Error al obtener productos',
      details: error.message 
    });
  } finally {
    try { 
      await sql.close();
    } catch(e) { /* ignore */ }
  }
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
