import { pool, sql, poolConnect } from "../connection/data.js";

export const ActualizarPromedio = async (req, res) => {
  const { id_empxprod, voto } = req.body;

  try {
    await poolConnect;

    // Obtener el producto y su promedio actual
    const prodQuery = await pool.request()
      .input("id_empxprod", sql.Int, id_empxprod)
      .query(`
        SELECT id_emprendimiento, PuntajeProm, votos
        FROM EmprendimientoxProducto
        WHERE id = @id_empxprod;
      `);

    if (prodQuery.recordset.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const producto = prodQuery.recordset[0];
    const id_emp = producto.id_emprendimiento;

    //Calcular nuevo promedio del producto
    const nuevoPromedioProducto = producto.PuntajeProm && producto.votos
      ? (producto.PuntajeProm * producto.votos + voto) / (producto.votos + 1)
      : voto;

    const nuevosVotos = (producto.votos || 0) + 1;

    //Actualizar el producto
    await pool.request()
      .input("id_empxprod", sql.Int, id_empxprod)
      .input("promedio", sql.Float, nuevoPromedioProducto)
      .input("votos", sql.Int, nuevosVotos)
      .query(`
        UPDATE EmprendimientoxProducto
        SET PuntajeProm = @promedio, votos = @votos
        WHERE id = @id_empxprod;
      `);

    //Calcular promedio del emprendimiento (promedio de todos sus productos)
    const promedioEmpQuery = await pool.request()
      .input("id_emp", sql.Int, id_emp)
      .query(`
        SELECT AVG(PuntajeProm) AS promedio_emprendimiento
        FROM EmprendimientoxProducto
        WHERE id_emprendimiento = @id_emp;
      `);

    const promedioEmprendimiento = promedioEmpQuery.recordset[0].promedio_emprendimiento;

    //Guardar promedio final en la tabla Puntaje
    await pool.request()
      .input("id_emp", sql.Int, id_emp)
      .input("promedio", sql.Float, promedioEmprendimiento)
      .query(`
        UPDATE Puntaje
        SET puntaje = @promedio
        WHERE id_emp = @id_emp;
      `);

    return res.json({ 
      promedioProducto: nuevoPromedioProducto,
      promedioEmprendimiento,
      totalVotosProducto: nuevosVotos
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error actualizando promedio" });
  }
};
