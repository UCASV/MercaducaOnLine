import { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./ProductsCarousel.css";

export default function ProductsCarousel() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);
    const carouselRef = useRef(null);

useEffect(() => {
  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      
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
              <div className="products-carousel">
                <h2>Productos mas vendidos por categoria</h2>
                <div className="carousel-wrapper">
                    <button className="arrow left" onClick={() => scrollByWidth(-1)} aria-label="Anterior"></button>
                    <div className="carousel" ref={carouselRef}>
                            {products.map(u => (
                            <article key={u.id} className="card" onClick={() => setSelected(u)} tabIndex={0} role="button">
                                <div className="card-img"><img src={`http://localhost:5050/Imagenes/${u.codigo_imagen}`} alt={u.nombre} /></div>
                                <div className="card-body">
                                    <h3>{u.nombre}</h3>
                                    <p className="short">{u.descripcion}</p>
                                    <div className="price">${u.precio}</div>
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
                        <div className="modal-img"><img src={`http://localhost:5050/Imagenes/${selected.codigo_imagen}`} alt={selected.nombre} /></div>
                        <div className="modal-body">
                            <h2>{selected.nombre}</h2>
                            <p className="long-desc">{selected.descripcion}</p>
                            <p className="price-large">Precio: ${selected.precio}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
