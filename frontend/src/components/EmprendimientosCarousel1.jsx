import { useRef, useState, useEffect } from "react";
import style from "./EmprendimientosCarousel1.module.css";

import { emprendimientosData, logosProximos } from "./EmprendimientosGrid";
import genericIcon from "../img/generic.png";

export default function EmprendimientosProximos() {
    const [emprendimientos, setEmprendimientos] = useState([]);
    const [selectedEmprendimiento, setSelectedEmprendimiento] = useState(null);
    const carouselRef = useRef(null);

    const getLogo = (logoKey) => {
        return logosProximos[logoKey] || genericIcon;
    };

    useEffect(() => {
        const proximos = emprendimientosData.filter(e => e.tipo === "proximo");
        setEmprendimientos(proximos);
    }, []);

    useEffect(() => {
        document.body.style.overflow = selectedEmprendimiento ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
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
                <h2 className={style["proximos-title"]}>Próximos Emprendimientos</h2>

                <div className={style["carousel-wrapper"]}>
                    <button
                        className={`${style.arrow} ${style["arrow-left"]}`}
                        onClick={() => scrollByWidth(-1)}
                        aria-label="Anterior"
                    >
                        ‹
                    </button>

                    <div className={style["carousel"]} ref={carouselRef}>
                        {emprendimientos.map(emprendimiento => (
                            <article
                                key={emprendimiento.id}
                                className={style["emprendimiento-card"]}
                                onClick={() => setSelectedEmprendimiento(emprendimiento)}
                                tabIndex={0}
                                role="button"
                            >
                                <div className={style["card-img"]}>
                                    <img
                                        src={getLogo(emprendimiento.logo)}
                                        alt={emprendimiento.nombre}
                                    />
                                    <span className={style["proximo-badge"]}>
                                        Próximamente
                                    </span>
                                </div>

                                <div className={style["card-body"]}>
                                    <h3>{emprendimiento.nombre}</h3>
                                    <p className={style["short-desc"]}>{emprendimiento.descripcion}</p>
                                    <span className={style["categoria"]}>{emprendimiento.categoria}</span>
                                    <div className={style["contacto"]}>
                                        Contacto: {emprendimiento.contacto}
                                    </div>
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

            {/* MODAL */}
            {selectedEmprendimiento && (
                <div className={style["overlay"]} onClick={() => setSelectedEmprendimiento(null)}>
                    <div
                        className={style["modal"]}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={style["close"]}
                            onClick={() => setSelectedEmprendimiento(null)}
                        >
                            ✕
                        </button>

                        <div className={style["modal-img"]}>
                            <img
                                src={getLogo(selectedEmprendimiento.logo)}
                                alt={selectedEmprendimiento.nombre}
                            />
                            <span className={style["proximo-badge-large"]}>Próximamente</span>
                        </div>

                        <div className={style["modal-body"]}>
                            <h2>{selectedEmprendimiento.nombre}</h2>
                            <p className={style["long-desc"]}>
                                {selectedEmprendimiento.descripcion_larga}
                            </p>

                            <div className={style["detalles"]}>
                                <p><strong>Categoría:</strong> {selectedEmprendimiento.categoria}</p>
                                <p><strong>Contacto:</strong> {selectedEmprendimiento.contacto}</p>
                                <p><strong>Email:</strong> {selectedEmprendimiento.email}</p>
                                <p><strong>Teléfono:</strong> {selectedEmprendimiento.telefono}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
