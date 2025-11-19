import { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./ProductsCarousel.css";

export default function ProductsCarousel() {
  const [productsTop, setProductsTop] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const carouselRef = useRef(null);

  //Obtener todas las categorias
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5050/productos");

        let productos = Array.isArray(res.data)
          ? res.data
          : res.data?.recordset || res.data?.productos || [];

        // extraer categorías sin repetir
        const cats = [...new Set(productos.map((p) => p.categoria))];

        setCategories(cats);
      } catch (err) {
        setError("Error cargando categorías");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  //Por cada categoria, traer su TOP 1 desde el BE
  useEffect(() => {
    if (categories.length === 0) return;

    const fetchTopByCategory = async () => {
      setLoading(true);
      const tops = [];

      for (const cat of categories) {
        try {
          const res = await axios.get(
            `http://localhost:5050/productos/masvendidos/${encodeURIComponent(cat)}`
          );

          // la consulta de backend devuelve solamente 1 producto
          const producto =
            Array.isArray(res.data) && res.data.length > 0
              ? res.data[0]
              : res.data?.recordset?.[0] || res.data?.[0] || null;

          if (producto) {
            tops.push(producto);
          }
        } catch (err) {
          console.error("Error cargando top de categoría:", cat, err);
        }
      }

      setProductsTop(tops);
      setLoading(false);
    };

    fetchTopByCategory();
  }, [categories]);

  // scroll del carrusel
  const scrollByWidth = (dir = 1) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * dir, behavior: "smooth" });
  };

  return (
    <>
      <div className="products-carousel">
        <h2>Top 1 de cada categoría</h2>

        <div className="carousel-wrapper">
          <button className="arrow left" onClick={() => scrollByWidth(-1)}></button>

          <div className="carousel" ref={carouselRef}>
            {productsTop.map((u) => (
              <article
                key={u.id}
                className="card"
                onClick={() => setSelected(u)}
              >
                <div className="card-img">
                  <img
                    src={`http://localhost:5050/Imagenes/${u.codigo_imagen}`}
                    alt={u.nombre_producto}
                  />
                </div>
                <div className="card-body">
                  <h3>{u.nombre_producto}</h3>
                  <p className="categoria">{u.categoria}</p>
                  <p className="short">{u.descripcion}</p>
                  <p className="short">{u.PuntajeProm}</p>
                  <div className="price">${u.precio}</div>
                </div>
              </article>
            ))}
          </div>

          <button className="arrow right" onClick={() => scrollByWidth(1)}>›</button>
        </div>
      </div>

      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}>✕</button>

            <div className="modal-img">
              <img
                src={`http://localhost:5050/Imagenes/${selected.codigo_imagen}`}
                alt={selected.nombre_producto}
              />
            </div>

            <div className="modal-body">
              <h2>{selected.nombre_producto}</h2>
              <p className="long-desc">{selected.descripcion}</p>
              <p className="price-large">Precio: ${selected.precio}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
