import { pool, sql, poolConnect } from "../connection/data.js";

export const ActualizarPromedio = async (req, res) => {
  const { id_empxprod, voto } = req.body;

  try {
    await poolConnect;

    // 1) Obtener el producto
    const prodQuery = await pool.request()
      .input("id_empxprod", sql.Int, id_empxprod)
      .query(`
        SELECT id_emprendimiento
        FROM EmprendimientoxProducto
        WHERE id = @id_empxprod;
      `);

    if (prodQuery.recordset.length === 0)
      return res.status(404).json({ error: "Producto no encontrado" });

    const id_emp = prodQuery.recordset[0].id_emprendimiento;

    // 2) Guardar voto individual
    await pool.request()
      .input("id_empxprod", sql.Int, id_empxprod)
      .input("voto", sql.Int, voto)
      .query(`
        INSERT INTO Puntaje (id_emp, puntaje)
        VALUES (@id_empxprod, @voto);
      `);

    // 3) Recalcular promedio del producto
    const promedioProd = await pool.request()
      .input("id_empxprod", sql.Int, id_empxprod)
      .query(`
        SELECT AVG(puntaje) AS prom, COUNT(*) AS votos
        FROM Puntaje
        WHERE id_emp = @id_empxprod;
      `);

    const promProd = promedioProd.recordset[0].prom;
    const votosProd = promedioProd.recordset[0].votos;

    await pool.request()
      .input("id_empxprod", sql.Int, id_empxprod)
      .input("prom", sql.Float, promProd)
      .input("votos", sql.Int, votosProd)
      .query(`
        UPDATE EmprendimientoxProducto
        SET PuntajeProm = @prom, votos = @votos
        WHERE id = @id_empxprod;
      `);

    // 4) Recalcular promedio del emprendimiento
    const promedioEmp = await pool.request()
      .input("id_emp", sql.Int, id_emp)
      .query(`
        SELECT AVG(PuntajeProm) AS prom
        FROM EmprendimientoxProducto
        WHERE id_emprendimiento = @id_emp;
      `);

    const promEmp = promedioEmp.recordset[0].prom;

    await pool.request()
      .input("id_emp", sql.Int, id_emp)
      .input("prom", sql.Float, promEmp)
      .query(`
        UPDATE Emprendimiento
        SET PuntajeProm = @prom
        WHERE id = @id_emp;
      `);

    return res.json({
      promedioProducto: promProd,
      totalVotosProducto: votosProd,
      promedioEmprendimiento: promEmp
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error actualizando promedio" });
  }
};
