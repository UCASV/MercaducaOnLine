import { pool, sql, poolConnect } from "../connection/data.js";


export const Categorias = async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();

    const result = await request.query(`
      SELECT * 
      FROM Categoria;
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

export const MasVendidoPorCategoria = async (req, res) => {
  try {
    await poolConnect;
    const categoria = req.params.categoria;
    const request = pool.request();
    const result = await request
      .input("categoria", sql.VarChar, categoria)
      .query(`
        SELECT TOP 1 
            p.id AS id_producto,
            p.nombre AS nombre_producto,
            p.id_categoria,

            ep.id_emprendimiento,
            ep.precio,
            ep.descripcion,
            ep.PuntajeProm,
            ep.id AS id_empxprod,
            ep.votos,

            e.nombre AS nombre_emprendimiento,
            e.estado,

            c.nombre AS categoria,
            i.id AS id_imagen,
            i.codigo_imagen
        FROM ProductoMasVendido pm
        JOIN EmprendimientoxProducto ep ON pm.id_empxprod = ep.id
        JOIN Producto p ON p.id = ep.id_producto
        JOIN Categoria c ON c.id = p.id_categoria
        JOIN Imagen i ON i.id = ep.id_imagen
        JOIN Emprendimiento e ON e.id = ep.id_emprendimiento
        WHERE c.nombre = @categoria;
      `);

    res.json(result.recordset);

  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "Error al obtener productos",
      details: error.message,
    });
  }
};
