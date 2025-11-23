import { useState, useEffect } from "react";
import "./EmprendimientosActivosGrid.css";
import { emprendimientosData, logosActivos } from "./EmprendimientosGrid";
import genericIcon from "../img/generic.png";

export default function EmprendimientosActivosGrid() {
    const [emprendimientos, setEmprendimientos] = useState([]);
    const [selectedEmprendimiento, setSelectedEmprendimiento] = useState(null);

    // Función para obtener la imagen
    const getLogo = (logoKey) => {
        return logosActivos[logoKey] || genericIcon;
    };

    useEffect(() => {
        // Filtrar solo emprendimientos activos
        const activos = emprendimientosData.filter(e => e.tipo === "activo");
        setEmprendimientos(activos);
    }, []);

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
            <div className="emprendimientos-activos-grid">
                <div className="grid-header">
                    <h2>Nuestros Emprendimientos</h2>
                    <p>Marcas que crecen con nosotros</p>
                </div>
                
                <div className="logos-grid">
                    {emprendimientos.map(emprendimiento => (
                        <div 
                            key={emprendimiento.id}
                            className="logo-item"
                            onClick={() => openExpanded(emprendimiento)}
                            onKeyDown={(e) => e.key === 'Enter' && openExpanded(emprendimiento)}
                            tabIndex={0}
                            role="button"
                            aria-label={`Ver detalles de ${emprendimiento.nombre}`}
                        >
                            <div className="logo-container">
                                <img 
                                    src={getLogo(emprendimiento.logo)} 
                                    alt={emprendimiento.nombre}
                                    className="logo-image"
                                />
                            </div>
                            <span className="logo-name">{emprendimiento.nombre}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal de detalles */}
            {selectedEmprendimiento && (
                <div className="overlay" onClick={closeExpanded}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close" onClick={closeExpanded}>✕</button>
                        <div className="modal-header">
                            <div className="modal-logo">
                                <img 
                                    src={getLogo(selectedEmprendimiento.logo)} 
                                    alt={selectedEmprendimiento.nombre}
                                />
                            </div>
                            <h2>{selectedEmprendimiento.nombre}</h2>
                        </div>
                        <div className="modal-body">
                            <p className="modal-descripcion">{selectedEmprendimiento.descripcion}</p>
                            <div className="modal-detalles">
                                <div className="detalle-item">
                                    <strong>Categoría:</strong>
                                    <span>{selectedEmprendimiento.categoria}</span>
                                </div>
                                <div className="detalle-item">
                                    <strong>Contacto:</strong>
                                    <span>{selectedEmprendimiento.contacto}</span>
                                </div>
                                {selectedEmprendimiento.email && (
                                    <div className="detalle-item">
                                        <strong>Email:</strong>
                                        <span>{selectedEmprendimiento.email}</span>
                                    </div>
                                )}
                                {selectedEmprendimiento.telefono && (
                                    <div className="detalle-item">
                                        <strong>Teléfono:</strong>
                                        <span>{selectedEmprendimiento.telefono}</span>
                                    </div>
                                )}
                                {selectedEmprendimiento.redes_sociales && (
                                    <div className="detalle-item">
                                        <strong>Redes Sociales:</strong>
                                        <span>{selectedEmprendimiento.redes_sociales}</span>
                                    </div>
                                )}
                                {selectedEmprendimiento.productos && selectedEmprendimiento.productos.length > 0 && (
                                    <div className="detalle-item">
                                        <strong>Productos:</strong>
                                        <div className="productos-lista">
                                            {selectedEmprendimiento.productos.map((producto, index) => (
                                                <span key={index} className="producto-tag">{producto}</span>
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