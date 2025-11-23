import { pool, poolConnect, sql } from '../connection/data.js'

export const Productos = async (req, res) => {
  try {
    await poolConnect; // asegura que el pool está conectado
    console.log('Connected to database');
    
    const request = pool.request();

    const result = await request.query(`
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
        JOIN Imagen AS i ON i.id = ep.id_imagen;
      `);
    
    res.json(result.recordset);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Error al obtener productos',
      details: error.message 
    });
  } finally {
  }
};

export const ProductosCategoria = async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();

    const result = await request
      .input("categoria", sql.VarChar, req.params.categoria)
      .query(`
        SELECT 
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

            c.nombre AS categoria,

            i.id AS id_imagen,
            i.codigo_imagen

        FROM Producto AS p
        JOIN EmprendimientoxProducto AS ep ON p.id = ep.id_producto
        JOIN Emprendimiento AS e ON ep.id_emprendimiento = e.id
        JOIN Categoria AS c ON c.id = p.id_categoria
        JOIN Imagen AS i ON i.id = ep.id_imagen

        WHERE c.nombre = @categoria;
      `);

    res.json(result.recordset);

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Error al obtener productos por categoría',
      details: error.message 
    });
  } finally {
  }
};
