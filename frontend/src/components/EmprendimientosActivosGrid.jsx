import { useEffect, useState } from "react";
import axios from "axios";

import style from "./EmprendimientosActivosGrid.module.css";
import genericIcon from "../img/generic.png";

export default function EmprendimientosActivosGrid() {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [selectedEmprendimiento, setSelectedEmprendimiento] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmprendimientos = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("http://localhost:5050/emprendimientos", {
          headers: {
            Accept: "application/json",
          },
        });

        console.log("Respuesta raw (emprendimientos):", res);

        // Check if we have valid data
        if (res.data && Array.isArray(res.data)) {
          setEmprendimientos(res.data);
        } else if (res.data && typeof res.data === "object") {
          // If data is nested in an object
          const emprendimientos = res.data.data || res.data.emprendimientos;
          if (Array.isArray(emprendimientos)) {
            setEmprendimientos(emprendimientos);
          } else {
            throw new Error(
              "Datos recibidos no son un array de emprendimientos "
            );
          }
        } else {
          throw new Error("Respuesta inválida del servidor (emprendimientos)");
        }
      } catch (err) {
        console.error("Error detallado (emprendimientos):", err);
        setError(
          err.response
            ? `Error del servidor (emprendimientos): ${err.response.status} ${err.response.statusText}`
            : `Error de conexión (emprendimientos): ${err.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEmprendimientos();
  }, []);

  // Bloquear scroll cuando abre el modal
  useEffect(() => {
    document.body.style.overflow = selectedEmprendimiento ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedEmprendimiento]);

  async function openExpanded(e) {
    setLoading(true);

    try {
      // precargar la imagen primero
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.src = `http://localhost:5050/Imagenes/${e.codigo_imagen}`;
        img.onload = resolve;
        img.onerror = reject;
      });

      // traer los productos
      const res = await axios.get(
        `http://localhost:5050/emprendimientos/${e.id_emprendimiento}`
      );

      setSelectedEmprendimiento({
        ...e,
        productos: res.data,
      });
    } catch (err) {
      console.error("Error cargando el emprendimiento o la imagen:", err);
    } finally {
      setLoading(false);
    }
  }

  function closeExpanded() {
    setSelectedEmprendimiento(null);
  }

  return (
    <>
      <div className={style["emprendimientos-activos-grid"]}>
        <div className={style["grid-header"]}>
          <h2 className={style.title}>Nuestros Emprendimientos</h2>
          <p>Marcas que crecen con nosotros</p>
        </div>

        <div className={style["logos-grid"]}>
          {emprendimientos.map((emprendimiento) => (
            <div
              key={`${emprendimiento.id_emprendimiento} ${emprendimiento.nombre_emprendimiento}`}
              className={style["logo-item"]}
              onClick={() => openExpanded(emprendimiento)}
              onKeyDown={(e) =>
                e.key === "Enter" && openExpanded(emprendimiento)
              }
              tabIndex={0}
              role="button"
              aria-label={`Ver detalles de ${emprendimiento.nombre_emprendimiento}`}
            >
              <div className={style["logo-container"]}>
                <img
                  src={`http://localhost:5050/Imagenes/${emprendimiento.codigo_imagen}`}
                  alt={emprendimiento.nombre_emprendimiento}
                  className={style["logo-image"]}
                />
              </div>

              <span className={style["logo-name"]}>
                {emprendimiento.nombre_emprendimiento}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedEmprendimiento && (
        <div className={style["overlay"]} onClick={closeExpanded}>
          <div className={style["modal"]} onClick={(e) => e.stopPropagation()}>
            <button className={style["close"]} onClick={closeExpanded}>
              ✕
            </button>

            <div className={style["modal-header"]}>
              <div className={style["modal-logo"]}>
                <img
                  src={`http://localhost:5050/Imagenes/${selectedEmprendimiento.codigo_imagen}`}
                  alt={selectedEmprendimiento.nombre_emprendimiento}
                />
              </div>
              <h2>{selectedEmprendimiento.nombre_emprendimiento}</h2>
            </div>

            <div className={style["modal-body"]}>
              <p className={style["modal-descripcion"]}>
                {selectedEmprendimiento.descripcion_general}
              </p>

              <div className={style["modal-detalles"]}>
                <div className={style["detalle-item"]}>
                  <strong>Categoria:</strong>
                  <span>{selectedEmprendimiento.categoria}</span>
                </div>
                <div className={style["detalle-item"]}>
                  <strong>Puntaje:</strong>
                  <span className={style["rating-stars"]}>
                    {(() => {
                      const avg = selectedEmprendimiento.PuntajeProm
                        ? Number(selectedEmprendimiento.PuntajeProm)
                        : 0;

                      return (
                        <>
                          {[1, 2, 3, 4, 5].map((i) => {
                            const fillPercent =
                              Math.min(Math.max(avg - (i - 1), 0), 1) * 100;
                            return (
                              <span key={i} className={style.star}>
                                <span
                                  className={style.filled}
                                  style={{ width: `${fillPercent}%` }}
                                >
                                  ★
                                </span>
                                <span className={style.empty}>★</span>
                              </span>
                            );
                          })}
                          <span className={style["rating-number"]}>
                            {avg.toFixed(1)} / 5
                          </span>
                        </>
                      );
                    })()}
                  </span>
                </div>

                {/* <div className={style["detalle-item"]}>
                                    <strong>Contacto:</strong>
                                    <span>{selectedEmprendimiento.contacto}</span>
                                </div>

                                {selectedEmprendimiento.email && (
                                    <div className={style["detalle-item"]}>
                                        <strong>Email:</strong>
                                        <span>{selectedEmprendimiento.email}</span>
                                    </div>
                                )}

                                {selectedEmprendimiento.telefono && (
                                    <div className={style["detalle-item"]}>
                                        <strong>Teléfono:</strong>
                                        <span>{selectedEmprendimiento.telefono}</span>
                                    </div>
                                )}

                                {selectedEmprendimiento.redes_sociales && (
                                    <div className={style["detalle-item"]}>
                                        <strong>Redes Sociales:</strong>
                                        <span>{selectedEmprendimiento.redes_sociales}</span>
                                    </div>
                                )} */}

                {selectedEmprendimiento.productos?.length > 0 && (
                  <div className={style["detalle-item"]}>
                    <strong>Productos:</strong>
                    <div className={style["productos-lista"]}>
                      {selectedEmprendimiento.productos.map(
                        (producto, index) => (
                          <span key={index} className={style["producto-tag"]}>
                            {producto.nombre_producto}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
