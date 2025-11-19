import { db } from "../connection/data.js";
import sql from "mssql";

export const Categorias = async (req, res) => {
  try {
    const pool = await sql.connect(db);
    console.log("Connected to database");

    const result = await pool.request().query(`
        SELECT * 
        FROM Categoria`); // Make sure table name matches your DB

    console.log("Query result:", result);
    res.json(result.recordset);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "Error al obtener productos",
      details: error.message,
    });
  } finally {
    try {
      await sql.close();
    } catch (e) {
      /* ignore */
    }
  }
};

export const MasVendidoPorCategoria = async (req, res) => {
  try {
    db.query(`SELECT TOP 1 (p.nombre), c.nombre
              FROM ProductoMasVendido AS pm
              JOIN EmprendimientoxProducto AS ep
                ON pm.id_empxprod = ep.id
              JOIN Producto AS p
                ON p.id = ep.id_producto
              JOIN Categoria AS c
                ON c.id = p.id_categoria
              JOIN Imagen AS i
                ON i.id = ep.id_imagen
              JOIN Emprendimiento AS e
                ON e.id = ep.id_emprendimiento

              WHERE c.nombre = @categoria`);

    res.json(result.recordset);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "Error al obtener productos",
      details: error.message,
    });
  } finally {
    try {
      await sql.close();
    } catch {}
  }
};
