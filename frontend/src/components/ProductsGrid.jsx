import { useEffect, useState } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./ProductsGrid.css";


export default function ProductsGrid() {
    const navigate = useNavigate();
    const { categoria } = useParams();  

    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [expandedProduct, setExpandedProduct] = useState(null);
    const [rating, setRating] = useState({});
    const [userVotes, setUserVotes] = useState({});
    const [hover, setHover] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
  const fetchCategorias = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.get('http://localhost:5050/categorias', {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      console.log('Respuesta raw (categorias):', res);
      
      // Check if we have valid data
      if (res.data && Array.isArray(res.data)) {
        setCategories(res.data);
      } else if (res.data && typeof res.data === 'object') {
        // If data is nested in an object
        const categories = res.data.data || res.data.categories;
        if (Array.isArray(categories)) {
          setCategories(categories);
        } else {
          throw new Error('Datos recibidos no son un array de categories ');
        }
      } else {
        throw new Error('Respuesta inválida del servidor (categorias)');
      }
    } catch (err) {
      console.error('Error detallado (categorias):', err);
      setError(
        err.response 
          ? `Error del servidor (categorias): ${err.response.status} ${err.response.statusText}`
          : `Error de conexión (categorias): ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };
  
  fetchCategorias();
}, []);

useEffect(() => {
  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      
        const url = selectedCategory === "Todos"
            ? `http://localhost:5050/productos`
            : `http://localhost:5050/productos/categoria/${selectedCategory}`;

        const res = await axios.get(url);
        setProducts(res.data);
            
      console.log('Respuesta raw:', res);
      

      // Normalizar la respuesta a un array de productos
      let productos = [];
      if (Array.isArray(res.data)) {
        productos = res.data;
      } else if (res.data && typeof res.data === "object") {
        // probar varias formas comunes
        productos = res.data.recordset || res.data.productos || res.data.data || [];
        // si recordset es objeto en vez de array, intentar extraerlo:
        if (!Array.isArray(productos) && Array.isArray(res.data)) {
          productos = res.data;
        }
        if (!Array.isArray(productos)) productos = [];
      } else {
        productos = [];
      }

      // debugging: si productos no es array, lo mostramos
      if (!Array.isArray(productos)) {
        console.error("La respuesta no se pudo normalizar a array:", res.data);
        productos = [];
      }

      setProducts(productos);
    } catch (err) {
      console.error('Error detallado (productos):', err);
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
}, [selectedCategory]);


    function getRatingInfo(productId) {
        const arr = rating[productId] || [];
        if (arr.length === 0) return { avg: 0, count: 0 };
        const sum = arr.reduce((s, v) => s + v, 0);
        return { avg: sum / arr.length, count: arr.length };
    }

    function submitRating(productId, value) {
        setRating(prev => {
            const next = { ...prev, [productId]: [...(prev[productId] || []), value] };
            return next;
        });
        setUserVotes(prev => ({ ...prev, [productId]: value }));
        setHover(0);
    }

const safeProducts = Array.isArray(products) ? products : [];
const filtered = selectedCategory === "Todos"
  ? safeProducts
  : safeProducts.filter(p => p.categoria === selectedCategory);

    function openExpanded(p) {
        setExpandedProduct(p);
        setHover(0);
    }
    function closeExpanded() {
        setExpandedProduct(null);
    }

    useEffect(() => {
        if (expandedProduct) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = prev; };
        }
    }, [expandedProduct]);

return (
    <section className="products-grid-section">
        <header className="pg-page-header">
            <div className="pg-header-inner">
                <button
                    type="button"
                    className="back-btn"
                    onClick={() => window.history.back()}
                    aria-label="Pagina principal"
                >
                    ← Inicio
                </button>
                <h1 className="pg-header-title">Productos</h1>
            </div>
        </header>

        {/* === CATEGORIAS === */}
        <div className="categories-row" role="tablist" aria-label="Categorías">
            {categories.map((c) => (
                <button
                    key={c.id}
                    className={`cat-btn ${c.nombre === selectedCategory ? "active" : ""}`}
                    onClick={() => setSelectedCategory(c.nombre)}
                    role="tab"
                    aria-selected={c.nombre === selectedCategory}
                >
                    <span className="cat-circle" aria-hidden="true">
                        <img
                            src={`../../Iconos/${c.nombre}.png`}
                            alt={c.nombre}
                            className="cat-icon"
                        />
                    </span>

                    <small className="cat-label">{c.nombre}</small> 
                </button>
            ))}
        </div>

        {/* === PRODUCTOS GRID === */}
        <div className="products-grid-main" aria-live="polite">
            {filtered.map((p) => (
                <article
                    key={`${p.id_producto}-${p.id_emprendimiento}-${p.id_imagen}`} // CORRECTO
                    className="product-card grid-card"
                    onClick={() => openExpanded(p)}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") openExpanded(p); }}
                    role="button"
                    aria-label={`${p.nombre_emprendimiento} ${p.nombre_producto}`}
                >
                    <div className="product-img-wrap">
                        {p.codigo_imagen ? (
                            <img className="ImagenesProducto"
                                src={`http://localhost:5050/Imagenes/${p.codigo_imagen}`}
                                alt={p.nombre_producto}
                            />
                        ) : (
                            <div className="no-img">Sin imagen</div>
                        )}
                    </div>

                    <div className="product-info">
                        <small className="brand">{p.nombre_emprendimiento}</small>
                        <h3 className="title">{p.nombre_producto}</h3>
                        <div className="price">${p.precio}</div>
                    </div>
                </article>
            ))}

            {filtered.length === 0 && (
                <div className="no-results">No hay productos en esta categoría.</div>
            )}
        </div>

        {/* === MODAL EXPANDIDO === */}
        {expandedProduct && (
            <div className="pg-overlay" onClick={closeExpanded} role="dialog" aria-modal="true">
                <div className="pg-expanded-card" onClick={(e) => e.stopPropagation()}>
                    <div className="pg-expanded-left">
                        <div className="product-img-wrap expanded-img">
                            {expandedProduct.codigo_imagen ? (
                                <img className="ImagenesProducto"
                                    src={`http://localhost:5050/Imagenes/${expandedProduct.codigo_imagen}`}
                                    alt={expandedProduct.nombre_producto}
                                />
                            ) : (
                                <div className="no-img">Sin imagen</div>
                            )}
                        </div>
                    </div>

                    <div className="pg-expanded-right">
                        <small className="brand">{expandedProduct.nombre_emprendimiento}</small>
                        <h3 className="title">{expandedProduct.nombre_producto}</h3>
                        <div className="price">${expandedProduct.precio}</div>

                        <p className="description">{expandedProduct.descripcion}</p>

                            <div className="rating-block" onClick={(e) => e.stopPropagation()}>
                                {(() => {
                                    const { avg, count } = getRatingInfo(expandedProduct.id);
                                    const avgRound = Math.round(avg);
                                    const userVote = userVotes[expandedProduct.id] || 0;
                                    const display = hover || userVote || avgRound;

                                    return (
                                        <div className="rating-row" aria-label={`Puntuación promedio ${avg.toFixed(1)} de 5`}>
                                            <div className="rating-div">
                                                <div className="stars-input" aria-label="Puntuación del producto">
                                                    {[1, 2, 3, 4, 5].map(i => (
                                                        <button
                                                            key={i}
                                                            className="star-btn"
                                                            title={`Votar ${i} estrellas`}
                                                            onMouseEnter={() => setHover(i)}
                                                            onMouseLeave={() => setHover(0)}
                                                            onClick={() => { submitRating(expandedProduct.id, i); }}
                                                            aria-label={`Votar ${i} estrellas`}
                                                        >
                                                            <span className={`star ${i <= display ? "filled" : ""}`}>★</span>
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="avg-number" >
                                                    {count > 0 ? `${avg.toFixed(1)} / 5 (${count})` : "Sin puntuaciones"}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                            <div className="actions">
                                <button className="btn-primary" onClick={() => { /* informacion emprendedor */ }}>Mas informacion</button>
                                <button className="btn-secondary" onClick={closeExpanded}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}