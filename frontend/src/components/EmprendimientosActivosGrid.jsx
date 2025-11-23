import { useState, useEffect } from "react";
import style from "./EmprendimientosActivosGrid.module.css";
import { emprendimientosData, logosActivos } from "./EmprendimientosGrid";
import genericIcon from "../img/generic.png";

export default function EmprendimientosActivosGrid() {
    const [emprendimientos, setEmprendimientos] = useState([]);
    const [selectedEmprendimiento, setSelectedEmprendimiento] = useState(null);

    // Obtener logo
    const getLogo = (logoKey) => {
        return logosActivos[logoKey] || genericIcon;
    };

    // Filtrar emprendimientos activos
    useEffect(() => {
        const activos = emprendimientosData.filter(e => e.tipo === "activo");
        setEmprendimientos(activos);
    }, []);

    // Bloquear scroll cuando abre el modal
    useEffect(() => {
        document.body.style.overflow = selectedEmprendimiento ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [selectedEmprendimiento]);

    function openExpanded(e) {
        setSelectedEmprendimiento(e);
    }

    function closeExpanded() {
        setSelectedEmprendimiento(null);
    }

    return (
        <>
            <div className={style["emprendimientos-activos-grid"]}>
                
                <div className={style["grid-header"]}>
                    <h2>Nuestros Emprendimientos</h2>
                    <p>Marcas que crecen con nosotros</p>
                </div>

                <div className={style["logos-grid"]}>
                    {emprendimientos.map(emprendimiento => (
                        <div 
                            key={emprendimiento.id}
                            className={style["logo-item"]}
                            onClick={() => openExpanded(emprendimiento)}
                            onKeyDown={(e) => e.key === 'Enter' && openExpanded(emprendimiento)}
                            tabIndex={0}
                            role="button"
                            aria-label={`Ver detalles de ${emprendimiento.nombre}`}
                        >
                            <div className={style["logo-container"]}>
                                <img 
                                    src={getLogo(emprendimiento.logo)} 
                                    alt={emprendimiento.nombre}
                                    className={style["logo-image"]}
                                />
                            </div>
                            
                            <span className={style["logo-name"]}>
                                {emprendimiento.nombre}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL */}
            {selectedEmprendimiento && (
                <div className={style["overlay"]} onClick={closeExpanded}>
                    <div className={style["modal"]} onClick={(e) => e.stopPropagation()}>
                        <button className={style["close"]} onClick={closeExpanded}>✕</button>

                        <div className={style["modal-header"]}>
                            <div className={style["modal-logo"]}>
                                <img 
                                    src={getLogo(selectedEmprendimiento.logo)} 
                                    alt={selectedEmprendimiento.nombre}
                                />
                            </div>
                            <h2>{selectedEmprendimiento.nombre}</h2>
                        </div>

                        <div className={style["modal-body"]}>
                            <p className={style["modal-descripcion"]}>
                                {selectedEmprendimiento.descripcion}
                            </p>

                            <div className={style["modal-detalles"]}>
                                
                                <div className={style["detalle-item"]}>
                                    <strong>Categoría:</strong>
                                    <span>{selectedEmprendimiento.categoria}</span>
                                </div>

                                <div className={style["detalle-item"]}>
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
                                )}

                                {selectedEmprendimiento.productos?.length > 0 && (
                                    <div className={style["detalle-item"]}>
                                        <strong>Productos:</strong>
                                        <div className={style["productos-lista"]}>
                                            {selectedEmprendimiento.productos.map((producto, index) => (
                                                <span key={index} className={style["producto-tag"]}>
                                                    {producto}
                                                </span>
                                            ))}
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
