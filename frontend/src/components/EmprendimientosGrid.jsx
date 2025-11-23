import { useEffect, useState } from "react";
import "./Emprendimientos.css";

// Importar imagen genérica
import genericIcon from "../img/generic.png";

// Mapeo de logos para emprendimientos activos 
export const logosActivos = {
    "jochips": genericIcon,
    "evy-fantasy": genericIcon,
    "meowfa": genericIcon,
    "es-de-cafe": genericIcon,
    "mascabado": genericIcon,
    "oh-my-glow": genericIcon,
    "telus": genericIcon,
    "adoc": genericIcon,
    "asesuisa": genericIcon,
    "uno": genericIcon,
    "suprema": genericIcon,
    "kash": genericIcon,
    "ortsol": genericIcon,
    "pronto": genericIcon,
    "san-salvador": genericIcon,
};

// Mapeo de logos para emprendimientos próximos 
export const logosProximos = {
    "bac": genericIcon,
    "pepsi": genericIcon,
    "papa-johns": genericIcon,
    "hush-puppies": genericIcon,
    "gatorade": genericIcon,
    "hilton": genericIcon
};

// Datos completos de todos los emprendimientos 
export const emprendimientosData = [
    // EMPRENDIMIENTOS ACTIVOS (15 emprendimientos)
    {
        id: 1,
        nombre: "Jochips",
        descripcion: "Deliciosas galletas artesanales con sabores únicos",
        descripcion_larga: "Jochips se especializa en la creación de galletas artesanales con ingredientes de la más alta calidad. Cada galleta es horneada con pasión y dedicación, ofreciendo sabores innovadores que deleitan el paladar.",
        logo: "jochips",
        categoria: "Alimentos y bebidas",
        contacto: "@jochips.sv",
        email: "jochips.contacto@gmail.com",
        telefono: "1234-5678",
        redes_sociales: "@jochips.sv",
        productos: ["Galletas Clásicas", "Galletas Premium", "Edición Especial"],
        tipo: "activo"
    },
    {
        id: 2,
        nombre: "Evy Fantasy",
        descripcion: "Joyas artesanales únicas y personalizadas",
        descripcion_larga: "Evy Fantasy crea joyas exclusivas y personalizadas utilizando técnicas artesanales tradicionales combinadas con diseños modernos. Cada pieza cuenta una historia especial.",
        logo: "evy-fantasy",
        categoria: "Artesanías",
        contacto: "@evyfantasy.sv",
        email: "evyfantasy@gmail.com",
        telefono: "2345-6789",
        redes_sociales: "@evyfantasy.sv",
        productos: ["Collares", "Pulseras", "Anillos", "Aretes"],
        tipo: "activo"
    },
    {
        id: 3,
        nombre: "Meowfa",
        descripcion: "Accesorios kawaii y productos personalizados",
        descripcion_larga: "Meowfa trae lo mejor de la cultura kawaii a El Salvador. Desde accesorios adorable hasta productos personalizados que llenan de alegría tu día a día.",
        logo: "meowfa",
        categoria: "Moda y accesorios",
        contacto: "@meowfa.sv",
        email: "meowfa.store@gmail.com",
        telefono: "3456-7890",
        redes_sociales: "@meowfa.sv",
        productos: ["Stickers", "Pines", "Llaveros", "Ropa"],
        tipo: "activo"
    },
    {
        id: 4,
        nombre: "Es De Café",
        descripcion: "Café premium y accesorios para coffee lovers",
        descripcion_larga: "Es De Café selecciona los mejores granos de café de las regiones más exclusivas. Ofrecemos una experiencia completa para los amantes del buen café.",
        logo: "es-de-cafe",
        categoria: "Alimentos y bebidas",
        contacto: "@esdecafe.sv",
        email: "esdecafe.contact@gmail.com",
        telefono: "4567-8901",
        redes_sociales: "@esdecafe.sv",
        productos: ["Café Molido", "Café en Grano", "Tazas", "Prensas Francesas"],
        tipo: "activo"
    },
    {
        id: 5,
        nombre: "Mascabado",
        descripcion: "Repostería fina y postres gourmet",
        descripcion_larga: "Mascabado transforma ingredientes simples en obras maestras dulces. Especialistas en repostería fina y postres que sorprenden por su sabor y presentación.",
        logo: "mascabado",
        categoria: "Alimentos y bebidas",
        contacto: "@mascabado.sv",
        email: "mascabado.dulces@gmail.com",
        telefono: "5678-9012",
        redes_sociales: "@mascabado.sv",
        productos: ["Pasteles", "Galletas Decoradas", "Postres Individuales", "Tartas"],
        tipo: "activo"
    },
    {
        id: 6,
        nombre: "Oh My Glow!",
        descripcion: "Productos de belleza y cuidado natural",
        descripcion_larga: "Oh My Glow! desarrolla productos de belleza con ingredientes 100% naturales. Creemos en el poder de la naturaleza para realzar tu belleza interior y exterior.",
        logo: "oh-my-glow",
        categoria: "Belleza y cuidado personal",
        contacto: "@ohmyglow.sv",
        email: "ohmyglow.beauty@gmail.com",
        telefono: "6789-0123",
        redes_sociales: "@ohmyglow.sv",
        productos: ["Crema Facial", "Aceites Esenciales", "Jabones Artesanales", "Mascarillas"],
        tipo: "activo"
    },
    {
        id: 7,
        nombre: "Telus",
        descripcion: "Soluciones de contacto con el cliente de clase mundial",
        descripcion_larga: "Teleperformance ofrece servicios de contacto con el cliente innovadores y personalizados. Conectamos empresas con sus clientes de manera efectiva y eficiente.",
        logo: "telus",
        categoria: "Servicios",
        contacto: "@teleperformance.sv",
        email: "info.teleperformance@tp.com",
        telefono: "7000-1234",
        redes_sociales: "@tpsalvador",
        productos: ["Atención al Cliente", "Ventas", "Soporte Técnico", "Back Office"],
        tipo: "activo"
    },
    {
        id: 8,
        nombre: "ADOC",
        descripcion: "Calzado deportivo y casual de alta calidad",
        descripcion_larga: "ADOC combina estilo, comodidad y durabilidad en cada par de zapatos. Desde deportivos hasta casuales, tenemos el calzado perfecto para cada ocasión.",
        logo: "adoc",
        categoria: "Moda y accesorios",
        contacto: "@adoc.sv",
        email: "clientes@adoc.com.sv",
        telefono: "2271-5000",
        redes_sociales: "@adocsv",
        productos: ["Zapatos Deportivos", "Zapatos Casuales", "Accesorios", "Ropa Deportiva"],
        tipo: "activo"
    },
    {
        id: 9,
        nombre: "Asesuisa",
        descripcion: "Seguros y servicios financieros confiables",
        descripcion_larga: "Asesuisa ofrece soluciones de seguros y servicios financieros adaptados a las necesidades de cada cliente. Más de 50 años de experiencia nos respaldan.",
        logo: "asesuisa",
        categoria: "Servicios",
        contacto: "@asesuisa",
        email: "info@asesuisa.com",
        telefono: "2209-4000",
        redes_sociales: "@asesuisasv",
        productos: ["Seguros de Auto", "Seguros de Vida", "Seguros de Hogar", "Inversiones"],
        tipo: "activo"
    },
    {
        id: 10,
        nombre: "UNO",
        descripcion: "Innovación en servicios y tecnología",
        descripcion_larga: "UNO se especializa en desarrollar soluciones tecnológicas innovadoras que transforman la manera en que las empresas operan y se conectan con sus clientes.",
        logo: "uno",
        categoria: "Tecnología",
        contacto: "@uno.sv",
        email: "contacto@uno.com.sv",
        telefono: "2567-8901",
        redes_sociales: "@unosv",
        productos: ["Desarrollo de Software", "Consultoría IT", "Soluciones Cloud", "Apps Móviles"],
        tipo: "activo"
    },
    {
        id: 11,
        nombre: "Suprema",
        descripcion: "Productos alimenticios de la más alta calidad",
        descripcion_larga: "Suprema selecciona y procesa los mejores ingredientes para ofrecer productos alimenticios que superan los estándares de calidad y sabor.",
        logo: "suprema",
        categoria: "Alimentos y bebidas",
        contacto: "@suprema.sv",
        email: "ventas@suprema.com.sv",
        telefono: "2312-3456",
        redes_sociales: "@supremasv",
        productos: ["Aceites", "Salsas", "Condimentos", "Productos Orgánicos"],
        tipo: "activo"
    },
    {
        id: 12,
        nombre: "Kash",
        descripcion: "Soluciones financieras digitales innovadoras",
        descripcion_larga: "Kash revoluciona el sector financiero con soluciones digitales que hacen las transacciones más simples, seguras y accesibles para todos.",
        logo: "kash",
        categoria: "Servicios",
        contacto: "@kash.sv",
        email: "soporte@kash.com.sv",
        telefono: "2567-8910",
        redes_sociales: "@kashsv",
        productos: ["Billetera Digital", "Pagos en Línea", "Transferencias", "Préstamos"],
        tipo: "activo"
    },
    {
        id: 13,
        nombre: "ORTSOL",
        descripcion: "Soluciones integrales en construcción",
        descripcion_larga: "ORTSOL ofrece servicios completos en construcción, desde diseño arquitectónico hasta la ejecución de proyectos residenciales y comerciales.",
        logo: "ortsol",
        categoria: "Construcción",
        contacto: "@ortsol.sv",
        email: "proyectos@ortsol.com",
        telefono: "2234-5678",
        redes_sociales: "@ortsolsv",
        productos: ["Diseño Arquitectónico", "Construcción", "Remodelaciones", "Supervisión"],
        tipo: "activo"
    },
    {
        id: 14,
        nombre: "Pronto",
        descripcion: "Servicios de entrega rápida y confiable",
        descripcion_larga: "Pronto conecta negocios con sus clientes a través de un servicio de entrega rápido, seguro y confiable. Tu paquete en las mejores manos.",
        logo: "pronto",
        categoria: "Logística",
        contacto: "@pronto.sv",
        email: "info@pronto.com.sv",
        telefono: "2567-8920",
        redes_sociales: "@prontodelivery",
        productos: ["Entrega Express", "Mensajería", "Logística E-commerce", "Servicios Corporativos"],
        tipo: "activo"
    },
    {
        id: 15,
        nombre: "San Salvador",
        descripcion: "Productos que representan nuestra identidad",
        descripcion_larga: "San Salvador crea productos que celebran y representan la rica cultura e identidad salvadoreña. Desde artesanías hasta productos gourmet.",
        logo: "san-salvador",
        categoria: "Artesanías",
        contacto: "@sansalvador.sv",
        email: "ventas@sansalvador.com.sv",
        telefono: "2234-5680",
        redes_sociales: "@sansalvadorproducts",
        productos: ["Artesanías", "Textiles", "Productos Gourmet", "Souvenirs"],
        tipo: "activo"
    },

    // EMPRENDIMIENTOS PRÓXIMOS
    {
        id: 101,
        nombre: "BAC",
        descripcion: "Servicios financieros innovadores",
        logo: "bac",
        categoria: "Servicios",
        contacto: "@bac.sv",
        tipo: "proximo"
    },
    {
        id: 102,
        nombre: "PEPSI",
        descripcion: "Bebidas refrescantes de calidad",
        logo: "pepsi",
        categoria: "Alimentos y bebidas", 
        contacto: "@pepsi.sv",
        tipo: "proximo"
    },
    {
        id: 103,
        nombre: "PAPA JOHNS",
        descripcion: "Pizza delivery de primera calidad",
        logo: "papa-johns",
        categoria: "Alimentos y bebidas",
        contacto: "@papajohns.sv",
        tipo: "proximo"
    },
    {
        id: 104,
        nombre: "Hush Puppies",
        descripcion: "Calzado casual y cómodo",
        logo: "hush-puppies",
        categoria: "Moda y accesorios",
        contacto: "@hushpuppies.sv",
        tipo: "proximo"
    },
    {
        id: 105,
        nombre: "GATORADE",
        descripcion: "Bebidas deportivas para atletas",
        logo: "gatorade",
        categoria: "Alimentos y bebidas",
        contacto: "@gatorade.sv", 
        tipo: "proximo"
    },
    {
        id: 106,
        nombre: "Hilton",
        descripcion: "Experiencias de hospedaje premium",
        logo: "hilton",
        categoria: "Servicios",
        contacto: "@hilton.sv",
        tipo: "proximo"
    }
];

export default function EmprendimientosGrid() {
    const [emprendimientos, setEmprendimientos] = useState([]);
    const [selectedEmprendimiento, setSelectedEmprendimiento] = useState(null);

    // Función para obtener la imagen correcta
    const getLogo = (emprendimiento) => {
        if (emprendimiento.tipo === "activo") {
            return logosActivos[emprendimiento.logo] || genericIcon;
        } else {
            return logosProximos[emprendimiento.logo] || genericIcon;
        }
    };

    useEffect(() => {
        setEmprendimientos(emprendimientosData);
    }, []);

    function openExpanded(e) {
        setSelectedEmprendimiento(e);
    }

    function closeExpanded() {
        setSelectedEmprendimiento(null);
    }

    useEffect(() => {
        if (selectedEmprendimiento) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = prev; };
        }
    }, [selectedEmprendimiento]);

    return (
        <section className="emprendimientos-grid-section">
            <header className="eg-page-header">
                <div className="eg-header-inner">
                    <h1 className="eg-header-title">Todos los Emprendimientos</h1>
                    <p className="eg-header-subtitle">Base de datos completa</p>
                </div>
            </header>

            <div className="emprendimientos-grid-main" aria-live="polite">
                {emprendimientos.map((e) => (
                    <article
                        key={e.id}
                        className={`emprendimiento-card ${e.tipo === "proximo" ? "proximo-card" : "activo-card"}`}
                        onClick={() => openExpanded(e)}
                        tabIndex={0}
                        onKeyDown={(ev) => { if (ev.key === "Enter") openExpanded(e); }}
                        role="button"
                        aria-label={`Emprendimiento ${e.nombre}`}
                    >
                        <div className="emprendimiento-img-wrap">
                            <img src={getLogo(e)} alt={e.nombre} />
                            {e.tipo === "proximo" && (
                                <span className="proximo-badge">Próximamente</span>
                            )}
                        </div>

                        <div className="emprendimiento-info">
                            <h3 className="emprendimiento-nombre">{e.nombre}</h3>
                            <p className="emprendimiento-descripcion">{e.descripcion}</p>
                            <span className="emprendimiento-categoria">{e.categoria}</span>
                            {e.tipo === "activo" && (
                                <div className="emprendimiento-contacto">
                                    <small>Contacto: {e.contacto}</small>
                                </div>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {selectedEmprendimiento && (
                <div className="eg-overlay" onClick={closeExpanded} role="dialog" aria-modal="true">
                    <div className="eg-expanded-card" onClick={(e) => e.stopPropagation()}>
                        <div className="eg-expanded-left">
                            <div className="emprendimiento-img-wrap expanded-img">
                                <img src={getLogo(selectedEmprendimiento)} alt={selectedEmprendimiento.nombre} />
                                {selectedEmprendimiento.tipo === "proximo" && (
                                    <span className="proximo-badge large">Próximamente</span>
                                )}
                            </div>
                        </div>

                        <div className="eg-expanded-right">
                            <h2 className="emprendimiento-nombre-expanded">{selectedEmprendimiento.nombre}</h2>
                            <span className="emprendimiento-categoria-expanded">{selectedEmprendimiento.categoria}</span>
                            
                            <p className="emprendimiento-descripcion-expanded">
                                {selectedEmprendimiento.descripcion_larga || selectedEmprendimiento.descripcion}
                            </p>

                            <div className="emprendimiento-detalles">
                                <div className="detalle-item">
                                    <strong>Contacto:</strong> {selectedEmprendimiento.contacto}
                                </div>
                                {selectedEmprendimiento.email && (
                                    <div className="detalle-item">
                                        <strong>Email:</strong> {selectedEmprendimiento.email}
                                    </div>
                                )}
                                {selectedEmprendimiento.telefono && (
                                    <div className="detalle-item">
                                        <strong>Teléfono:</strong> {selectedEmprendimiento.telefono}
                                    </div>
                                )}
                                {selectedEmprendimiento.redes_sociales && (
                                    <div className="detalle-item">
                                        <strong>Redes Sociales:</strong> {selectedEmprendimiento.redes_sociales}
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

                            <div className="actions">
                                <button className="btn-primary" onClick={() => { /* acción de contacto */ }}>
                                    {selectedEmprendimiento.tipo === "activo" ? "Contactar" : "Más Información"}
                                </button>
                                <button className="btn-secondary" onClick={closeExpanded}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}