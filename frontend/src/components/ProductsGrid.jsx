import { useEffect, useState } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from  "./ProductsGrid.module.css";


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
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [expandedProduct]);

    async function submitRating(productId, value) {
  try {
    // Llamada al backend que recalcula PuntajeProm y total de votos
    const res = await axios.post("http://localhost:5050/actualizarPromedio", {
      id_empxprod: productId,
      voto: value
    });

    const { promedioProducto, promedioEmprendimiento, totalVotosProducto } = res.data;

    // Actualizar rating local del producto
    setRating(prev => ({
      ...prev,
      [productId]: promedioProducto // guardamos solo el promedio actual
    }));

    // Guardar voto del usuario para resaltar estrella
    setUserVotes(prev => ({
      ...prev,
      [productId]: value
    }));

    setHover(0);

    // Actualizar objeto seleccionado con los datos reales del backend
    if (expandedProduct && expandedProduct.id_empxprod === productId) {
      setExpandedProduct(prev => ({
        ...prev,
        PuntajeProm: promedioProducto,
        votos: totalVotosProducto // <-- aquí usamos el total real de votos
      }));
    }

  } catch (err) {
    console.error("Error al enviar voto:", err);
  }
}


return (
   <section className={styles["products-grid-section"]}>
  <header className={styles["pg-page-header"]}>
    <div className={styles["pg-header-inner"]}>
      <button
        type="button"
        className={styles["back-btn"]}
        onClick={() => window.history.back()}
        aria-label="Pagina principal"
      >
        ← Inicio
      </button>
      <h1 className={styles["pg-header-title"]}>Productos</h1>
    </div>
  </header>

  {/* === CATEGORIAS === */}
  <div className={styles["categories-row"]} role="tablist" aria-label="Categorías">
      {/* === BOTÓN TODOS === */}
  <button
    className={`${styles["cat-btn"]} ${selectedCategory === "Todos" ? styles.active : ""}`}
    onClick={() => setSelectedCategory("Todos")}
    role="tab"
    aria-selected={selectedCategory === "Todos"}
  >
    <span className={styles["cat-circle"]} aria-hidden="true">
      <img
        src={`../../Iconos/Todos.png`}
        alt="Todos"
        className={styles["cat-icon"]}
      />
    </span>
    <small className={styles["cat-label"]}>Todos</small>
  </button>
    {categories.map((c) => (
      <button
        key={c.id}
        className={`${styles["cat-btn"]} ${c.nombre === selectedCategory ? styles.active : ""}`}
        onClick={() => setSelectedCategory(prev => prev === c.nombre ? "Todos":c.nombre)}
        role="tab"
        aria-selected={c.nombre === selectedCategory}
      >
        <span className={styles["cat-circle"]} aria-hidden="true">
          <img
            src={`../../Iconos/${c.nombre}.png`}
            alt={c.nombre}
            className={styles["cat-icon"]}
          />
        </span>

        <small className={styles["cat-label"]}>{c.nombre}</small>
      </button>
    ))}
  </div>

  {/* === PRODUCTOS GRID === */}
  <div className={styles["products-grid-main"]} aria-live="polite">
    {filtered.map((p) => (
      <article
        key={p.id_empxprod}
        className={`${styles["product-card"]} ${styles["grid-card"]}`}
        onClick={() => openExpanded(p)}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") openExpanded(p); }}
        role="button"
        aria-label={`${p.nombre_emprendimiento} ${p.nombre_producto}`}
      >
        <div className={styles["product-img-wrap"]}>
          {p.codigo_imagen ? (
            <img
              className={styles["ImagenesProducto"]}
              src={`http://localhost:5050/Imagenes/${p.codigo_imagen}`}
              alt={p.nombre_producto}
            />
          ) : (
            <div className={styles["no-img"]}>Sin imagen</div>
          )}
        </div>

        <div className={styles["product-info"]}>
          <small className={styles.brand}>{p.nombre_emprendimiento}</small>
          <h3 className={styles.title}>{p.nombre_producto}</h3>
          <div className={styles.price}>${p.precio}</div>
        </div>
      </article>
    ))}

    {filtered.length === 0 && (
      <div className={styles["no-results"]}>No hay productos en esta categoría.</div>
    )}
  </div>

  {/* === MODAL EXPANDIDO === */}
  {expandedProduct && (
    <div className={styles["pg-overlay"]} onClick={closeExpanded} role="dialog" aria-modal="true">
      <div className={styles["pg-expanded-card"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles["pg-expanded-left"]}>
          <div className={`${styles["product-img-wrap"]} ${styles["expanded-img"]}`}>
            {expandedProduct.codigo_imagen ? (
              <img
                className={styles["ImagenesProducto"]}
                src={`http://localhost:5050/Imagenes/${expandedProduct.codigo_imagen}`}
                alt={expandedProduct.nombre_producto}
              />
            ) : (
              <div className={styles["no-img"]}>Sin imagen</div>
            )}
          </div>
        </div>

        <div className={styles["pg-expanded-right"]}>
          <small className={styles.brand}>{expandedProduct.nombre_emprendimiento}</small>
          <h3 className={styles.title}>{expandedProduct.nombre_producto}</h3>
          <div className={styles.price}>${expandedProduct.precio}</div>

          <p className={styles.description}>{expandedProduct.descripcion}</p>

          <div className={styles["rating-block"]} onClick={(e) => e.stopPropagation()}>
            {(() => {
              const avg = expandedProduct.PuntajeProm ? Number(expandedProduct.PuntajeProm) : 0;
              const count = expandedProduct.votos ? Number(expandedProduct.votos) : 0;

              const avgRound = Math.round(avg);
              const userVote = userVotes[expandedProduct.id_empxprod] || 0;
              const display = hover || userVote || avgRound;

              return (
                <div className={styles["rating-row"]} aria-label={`Puntuación promedio ${avg.toFixed(1)} de 5`}>
                  <div className={styles["rating-div"]}>
                    <div className={styles["stars-input"]} aria-label="Puntuación del producto">
                      {[1, 2, 3, 4, 5].map(i => (
                        <button
                          key={i}
                          className={styles["star-btn"]}
                          title={`Votar ${i} estrellas`}
                          onMouseEnter={() => setHover(i)}
                          onMouseLeave={() => setHover(0)}
                          onClick={() => { submitRating(expandedProduct.id_empxprod, i); }}
                        >
                          <span className={`${styles.star} ${i <= display ? styles.filled : ""}`}>★</span>
                        </button>
                      ))}
                    </div>

                    <div className={styles["avg-number"]}>
                      {count > 0
                        ? `${avg.toFixed(1)} / 5 (${count})`
                        : "Sin puntuaciones"}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          <div className={styles.actions}>
            {/* <button className={styles["btn-primary"]}>Más información</button> */}
            <button className={styles["btn-secondary"]} onClick={closeExpanded}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  )}
</section>

    );
}