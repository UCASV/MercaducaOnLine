import { pool, sql, poolConnect } from "../connection/data.js";

export const Eventos = async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();

    const result = await request.query(`
      SELECT ev.id, 
             ev.nombre AS 'Evento', 
             i.codigo_imagen,
             ev.descripcion, 
             ev.horario_inicio, 
             ev.horario_final,
             em.nombre AS 'Emprendimiento'
      FROM Evento AS ev
      INNER JOIN Imagen AS i
      ON i.id = ev.id_imagen
      INNER JOIN EmprendimientoXEvento AS ee
      ON ee.id_evento=ev.id
      INNER JOIN Emprendimiento AS em
      ON em.id=ee.id_emprendimiento;
    `);
    const rows = result.recordset;

    const eventosAgrupados = rows.reduce((acc, row) => {
      const existente = acc.find((e) => e.id === row.id);

      if (existente) {
        existente.emprendimientos.push(row.Emprendimiento);
      } else {
        acc.push({
          id: row.id,
          nombre: row.Evento,
          codigo_imagen: row.codigo_imagen,
          descripcion: row.descripcion,
          horario_inicio: row.horario_inicio,
          horario_final: row.horario_final,
          emprendimientos: [row.Emprendimiento],
        });
      }

      return acc;
    }, []);
    if (eventosAgrupados.length == 0) {
      return res.json({ mensaje: "Aun no hay eventos", data: [] });
    }
    res.json({
      mensaje: "Eventos obtenidos correctamente",
      data: eventosAgrupados,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "Error al obtener eventos",
      details: error.message,
    });
  }
};
