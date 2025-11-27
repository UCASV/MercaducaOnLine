import { useRef, useState, useEffect } from "react";
import style from "./EmprendimientosCarousel1.module.css";
import axios from "axios";

import { emprendimientosData, logosProximos } from "./EmprendimientosGrid";
import genericIcon from "../img/generic.png";

export default function EmprendimientosProximos() {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [selectedEmprendimiento, setSelectedEmprendimiento] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchEmprendimientos = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("http://localhost:5050/emprendimientosProximos", {
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

  const getLogo = (logoKey) => {
    return logosProximos[logoKey] || genericIcon;
  };

  useEffect(() => {
    const proximos = emprendimientosData.filter((e) => e.tipo === "proximo");
    setEmprendimientos(proximos);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedEmprendimiento ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedEmprendimiento]);

  const scrollByWidth = (dir = 1) => {
    const el = carouselRef.current;
    if (!el) return;
    const distance = el.clientWidth;
    el.scrollBy({ left: distance * dir, behavior: "smooth" });
  };

  return (
    <>
      <div className={style["emprendimientos-prox-carousel"]}>
        <h2 className={style.title}>Próximos Emprendimientos</h2>

        <div className={style["carousel-wrapper"]}>
          <button
            className={`${style.arrow} ${style["arrow-left"]}`}
            onClick={() => scrollByWidth(-1)}
            aria-label="Anterior"
          >
            ‹
          </button>

          <div className={style["carousel"]} ref={carouselRef}>
            {emprendimientos.map((emprendimiento) => (
              <article
                key={emprendimiento.id_emprendimiento}
                className={style["emprendimiento-card"]}
                onClick={() => setSelectedEmprendimiento(emprendimiento)}
                tabIndex={0}
                role="button"
              >
                <div className={style["card-img"]}>
                  <img
                    src={`http://localhost:5050/Imagenes/${emprendimiento.codigo_imagen}`}
                    alt={emprendimiento.nombre_emprendimiento}
                  />
                  <span className={style["proximo-badge"]}>Próximamente</span>
                </div>

                <div className={style["card-body"]}>
                  <h3>{emprendimiento.nombre_emprendimiento}</h3>
                  <p className={style["short-desc"]}>
                    {emprendimiento.descripcion_general}
                  </p>
                  <span className={style["categoria"]}>
                    {emprendimiento.categoria}
                  </span>
                  {/* <div className={style["contacto"]}>
                    Contacto: {emprendimiento.contacto}
                  </div> */}
                </div>
              </article>
            ))}
          </div>

          <button
            className={`${style.arrow} ${style["arrow-right"]}`}
            onClick={() => scrollByWidth(1)}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedEmprendimiento && (
        <div
          className={style["overlay"]}
          onClick={() => setSelectedEmprendimiento(null)}
        >
          <div className={style["modal"]} onClick={(e) => e.stopPropagation()}>
            <button
              className={style["close"]}
              onClick={() => setSelectedEmprendimiento(null)}
            >
              ✕
            </button>

            <div className={style["modal-img"]}>
              <img
                src={`http://localhost:5050/Imagenes/${selectedEmprendimiento.codigo_imagen}`}
                alt={selectedEmprendimiento.nombre_emprendimiento}
              />
              <span className={style["proximo-badge-large"]}>Próximamente</span>
            </div>

            <div className={style["modal-body"]}>
              <h2>{selectedEmprendimiento.nombre_emprendimiento}</h2>
              <p className={style["long-desc"]}>
                {selectedEmprendimiento.descripcion_general}
              </p>

              <div className={style["detalles"]}>
                <p>
                  <strong>Categoría:</strong> {selectedEmprendimiento.categoria}
                </p>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
