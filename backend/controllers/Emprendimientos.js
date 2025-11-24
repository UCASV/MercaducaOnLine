import { pool, sql, poolConnect } from "../connection/data.js";

export const Emprendimientos = async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();

    const result = await request.query(`
    	SELECT 
            e.id AS id_emprendimiento,
            e.nombre AS nombre_emprendimiento,
            e.PuntajeProm,
            e.estado,
            i.codigo_imagen,
            e.descripcion_general,
            c.nombre AS categoria
        FROM Emprendimiento AS e
        LEFT JOIN Imagen AS i 
            ON i.id = e.id_imagen
        LEFT JOIN Categoria AS c
            ON c.id = e.id_categoria
        WHERE e.estado = 'Activo';
    `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "Error al obtener categorías",
      details: error.message,
    });
  }
};

export const ProductosPorEmprendimiento = async (req, res) => {
  try {
    const { id } = req.params;

    await poolConnect;
    const result = await pool.request().input("id", id).query(`
        SELECT 
            p.id AS id_producto,
            p.nombre AS nombre_producto,
            p.id_categoria,

            ep.id_emprendimiento,
            ep.precio,
            ep.descripcion,
            ep.id AS id_empxprod,
            ep.PuntajeProm,
            ep.votos,

            e.nombre AS nombre_emprendimiento,

            c.nombre AS categoria,

            i.id AS id_imagen,
            i.codigo_imagen

        FROM Producto AS p
        JOIN EmprendimientoxProducto AS ep ON p.id = ep.id_producto
        JOIN Emprendimiento AS e ON ep.id_emprendimiento = e.id
        JOIN Categoria AS c ON c.id = p.id_categoria
        JOIN Imagen AS i ON i.id = ep.id_imagen
        WHERE ep.id_emprendimiento = @id;

      `);

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const EmprendimientosProximos = async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();

    const result = await request.query(`
    	SELECT 
            e.id AS id_emprendimiento,
            e.nombre AS nombre_emprendimiento,
            e.PuntajeProm,
            e.estado,
            i.codigo_imagen,
            e.descripcion_general,
            c.nombre AS categoria
        FROM Emprendimiento AS e
        LEFT JOIN Imagen AS i 
            ON i.id = e.id_imagen
        LEFT JOIN Categoria AS c
            ON c.id = e.id_categoria
        WHERE e.estado = 'Proximamente';
    `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "Error al obtener categorías",
      details: error.message,
    });
  }
};