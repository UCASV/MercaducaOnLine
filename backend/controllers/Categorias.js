import { db } from '../connection/data.js'
import sql from 'mssql';

export const Categorias = async (req, res) => {
  try {
    const pool = await sql.connect(db);
    console.log('Connected to database');
    
    const result = await pool.request()
      .query(`
        SELECT * 
        FROM Categoria`);  // Make sure table name matches your DB
    
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
