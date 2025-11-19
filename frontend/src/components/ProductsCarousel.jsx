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
  const [rating, setRating] = useState({});
  const [userVotes, setUserVotes] = useState({});
  const [hover, setHover] = useState(0);

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
  tops.push({
    ...producto,
    PuntajeProm: producto.PuntajeProm ?? producto.promedio ?? 0, // promedio del producto
    votos: producto.votos ?? producto.conteo ?? 0                // cantidad de votos
  });
}

        } catch (err) {
          console.error("Error cargando top de categoría:", cat, err);
        }
      }

      setProductsTop(tops);
      const initialRatings = {};
      tops.forEach(p => {
        if (p.PuntajeProm != null) {
          initialRatings[p.id_empxprod] = [p.PuntajeProm]; 
        }
        });
        setRating(initialRatings);
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

  function getRatingInfo(productId) {
    const arr = rating[productId] || [];
    if (arr.length === 0) return { avg: 0, count: 0 };
    const sum = arr.reduce((s, v) => s + v, 0);
    return { avg: sum / arr.length, count: arr.length };
  }

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
      [productId]: [promedioProducto] // guardamos solo el promedio actual
    }));

    // Guardar voto del usuario para resaltar estrella
    setUserVotes(prev => ({
      ...prev,
      [productId]: value
    }));

    setHover(0);

    // Actualizar objeto seleccionado con los datos reales del backend
    if (selected && selected.id_empxprod === productId) {
      setSelected(prev => ({
        ...prev,
        PuntajeProm: promedioProducto,
        votos: totalVotosProducto // <-- aquí usamos el total real de votos
      }));
    }

  } catch (err) {
    console.error("Error al enviar voto:", err);
  }
}



  useEffect(() => {
    if (selected) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [selected]);


  return (
    <>
      <div className="products-carousel">
        <h2>Top 1 de cada categoría</h2>

        <div className="carousel-wrapper">
          <button className="arrow left" onClick={() => scrollByWidth(-1)}></button>

          <div className="carousel" ref={carouselRef}>
            {productsTop.map((u) => (
              <article
                key={u.id_empxprod}
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
                  <div className="price">${u.precio}</div>
                </div>
              </article>
            ))}
          </div>

          <button className="arrow right" onClick={() => scrollByWidth(1)}>
            ›
          </button>
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

        <div className="rating-block" onClick={(e) => e.stopPropagation()}>
  {(() => {
    // Promedio y conteo vienen de las propiedades correctas
    const avg = selected.PuntajeProm ?? 0;
    const count = selected.votos ?? 0;

    const avgRound = Math.round(avg);
    const userVote = userVotes[selected.id_empxprod] || 0;
    const display = hover || userVote || avgRound;

    return (
      <div className="rating-row" aria-label={`Puntuación promedio ${avg.toFixed(1)} de 5`}>
        <div className="rating">
          <div className="stars-input">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                className="star-btn"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(0)}
                onClick={() => submitRating(selected.id_empxprod, i)}
              >
                <span className={`star ${i <= display ? "filled" : ""}`}>★</span>
              </button>
            ))}
          </div>

          <div className="avg-number">
            {count > 0
              ? `${avg.toFixed(1)} / 5 (${count} votos)`
              : "Sin puntuaciones"}
          </div>
        </div>
      </div>
    );
  })()}
</div>

      </div>
    </div>
  </div>
)}

    </>
  );
}
