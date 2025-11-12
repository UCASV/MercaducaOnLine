import { db } from '../connection/data.js'
import sql from 'mssql';

export const Productos = async (req, res) => {
  try {
    const pool = await sql.connect(db);
    console.log('Connected to database');
    
    const result = await pool.request()
      .query(`
        SELECT * 
        FROM Producto AS p 
            JOIN EmprendimientoxProducto AS ep 
                ON p.id = ep.id_producto 
            JOIN Imagen AS i 
                ON i.id = ep.id_imagen`);  // Make sure table name matches your DB
    
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
};
