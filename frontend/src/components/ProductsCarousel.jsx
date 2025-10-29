import { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./ProductsCarousel.css";

import img1 from "../img/F100031656.jpg";
import img2 from "../img/Empanadas.jpg";
import img3 from "../img/images.jpeg";
import img4 from "../img/mermeladafrutosrojos.jpg";
import img5 from "../img/Galletas.jpeg";
import img6 from "../img/Pan.jpeg";

const sampleProducts = [
    { id: 1, name: "Miel Natural", short_desc: "Miel pura de la zona", long_desc: "Miel 100% natural recogida en apiarios locales. Ideal para desayunos y repostería.", price: 120.0, image: img1 },
    { id: 2, name: "Empanadas Artesanales", short_desc: "Rellenas a mano", long_desc: "Empanadas hechas a mano con masa casera y rellenos tradicionales.", price: 80.0, image: img2 },
    { id: 3, name: "Dulce de Leche", short_desc: "Receta casera", long_desc: "Dulce de leche casero sin conservantes. Tarro de 500g.", price: 200.0, image: img3 },
    { id: 4, name: "Mermelada de Frutos", short_desc: "Sin azúcar añadido", long_desc: "Mermelada elaborada con frutas locales, baja en azúcar.", price: 150.0, image: img4 },
    { id: 5, name: "Galletas Integrales", short_desc: "Hechas al horno", long_desc: "Galletas crujientes integrales con semillas.", price: 90.0, image: img5 },
    { id: 6, name: "Pan Casero", short_desc: "A la leña", long_desc: "Pan artesanal horneado en horno a leña, sabor tradicional.", price: 110.0, image: img6 },
];



export default function ProductsCarousel() {
    const [products, setProducts] = useState(sampleProducts);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);
    const carouselRef = useRef(null);

useEffect(() => {
  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using the same port as backend (5173)
      const res = await axios.get('http://localhost:5050/productos', {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      console.log('Respuesta raw:', res);
      
      // Check if we have valid data
      if (res.data && Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (res.data && typeof res.data === 'object') {
        // If data is nested in an object
        const productos = res.data.data || res.data.productos;
        if (Array.isArray(productos)) {
          setProducts(productos);
        } else {
          throw new Error('Datos recibidos no son un array de productos');
        }
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (err) {
      console.error('Error detallado:', err);
      setError(
        err.response 
          ? `Error del servidor: ${err.response.status} ${err.response.statusText}`
          : `Error de conexión: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };
  
  fetchProductos();
}, []);

    useEffect(() => {
        document.body.style.overflow = selected ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [selected]);

    const scrollByWidth = (dir = 1) => {
        const el = carouselRef.current;
        if (!el) return;
        const distance = el.clientWidth;
        el.scrollBy({ left: distance * dir, behavior: "smooth" });
    };

    return (
        <>


            {loading && <div>Cargando productos...</div>}
            {error && (
            <div style={{color: 'red', padding: '10px'}}>
                Error: {error.toString()}
            </div>
        )}

            <div id="contenedorUsuarios">
              {products.map(u => (
                <div key={u.id} className="usuario-fila">
                  <p>{u.id}</p>
                  <p>{u.nombre ?? u.name}</p>
                  <p>{u.id_categoria ?? u.category ?? ''}</p>
                </div>
              ))}
            </div>
              <div className="products-carousel">
                <h2>Productos</h2>
                <div className="carousel-wrapper">
                    <button className="arrow left" onClick={() => scrollByWidth(-1)} aria-label="Anterior">‹</button>
                    <div className="carousel" ref={carouselRef}>
                        {products.map(p => (
                            <article key={p.id} className="card" onClick={() => setSelected(p)} tabIndex={0} role="button">
                                <div className="card-img"><img src={p.image} alt={p.name} /></div>
                                <div className="card-body">
                                    <h3>{p.name}</h3>
                                    <p className="short">{p.short_desc}</p>
                                    <div className="price">${p.price}</div>
                                </div>
                            </article>
                        ))}
                    </div>
                    <button className="arrow right" onClick={() => scrollByWidth(1)} aria-label="Siguiente">›</button>
                </div>
            </div>

            {selected && (
                <div className="overlay" onClick={() => setSelected(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close" onClick={() => setSelected(null)}>✕</button>
                        <div className="modal-img"><img src={selected.image} alt={selected.name} /></div>
                        <div className="modal-body">
                            <h2>{selected.name}</h2>
                            <p className="long-desc">{selected.long_desc}</p>
                            <p className="price-large">Precio: ${selected.price}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
