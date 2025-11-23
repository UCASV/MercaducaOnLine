import { useRef, useState, useEffect } from "react";
import "./EmprendimientosCarousel1.css";

// Importar desde el EmprendimientosGrid
import { emprendimientosData, logosProximos } from "./EmprendimientosGrid";
import genericIcon from "../img/generic.png";

export default function EmprendimientosProximos() {
    const [emprendimientos, setEmprendimientos] = useState([]);
    const [selectedEmprendimiento, setSelectedEmprendimiento] = useState(null);
    const carouselRef = useRef(null);

    // Función para obtener la imagen
    const getLogo = (logoKey) => {
        return logosProximos[logoKey] || genericIcon;
    };

    useEffect(() => {
        // Filtrar solo emprendimientos próximos
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

    function openExpanded(e) {
        setSelectedEmprendimiento(e);
    }

    function closeExpanded() {
        setSelectedEmprendimiento(null);
    }

    return (
        <>
            <div className="emprendimientos-prox-carousel">
                <h2 className="proximos-title">Próximos Emprendimientos</h2>
                
                <div className="carousel-wrapper">
                    <button className="arrow left" onClick={() => scrollByWidth(-1)} aria-label="Anterior">‹</button>
                    
                    <div className="carousel" ref={carouselRef}>
                        {emprendimientos.map(emprendimiento => (
                            <article 
                                key={emprendimiento.id} 
                                className="emprendimiento-card" 
                                onClick={() => openExpanded(emprendimiento)} 
                                tabIndex={0} 
                                role="button"
                            >
                                <div className="card-img">
                                    <img 
                                        src={getLogo(emprendimiento.logo)} 
                                        alt={emprendimiento.nombre} 
                                    />
                                    <span className="proximo-badge">Próximamente</span>
                                </div>
                                <div className="card-body">
                                    <h3>{emprendimiento.nombre}</h3>
                                    <p className="short-desc">{emprendimiento.descripcion}</p>
                                    <span className="categoria">{emprendimiento.categoria}</span>
                                    <div className="contacto">Contacto: {emprendimiento.contacto}</div>
                                </div>
                            </article>
                        ))}
                    </div>
                    
                    <button className="arrow right" onClick={() => scrollByWidth(1)} aria-label="Siguiente">›</button>
                </div>
            </div>

            {selectedEmprendimiento && (
                <div className="overlay" onClick={closeExpanded}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close" onClick={closeExpanded}>✕</button>
                        <div className="modal-img">
                            <img src={getLogo(selectedEmprendimiento.logo)} alt={selectedEmprendimiento.nombre} />
                            <span className="proximo-badge large">Próximamente</span>
                        </div>
                        <div className="modal-body">
                            <h2>{selectedEmprendimiento.nombre}</h2>
                            <p className="long-desc">{selectedEmprendimiento.descripcion_larga}</p>
                            <div className="detalles">
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