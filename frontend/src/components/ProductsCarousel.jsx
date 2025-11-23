import { useRef, useState, useEffect } from "react";
import axios from "axios";
import styles from  "./ProductsCarousel.module.css";

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
      <div className={styles["products-carousel"]}>
  <h2>Top 1 de cada categoría</h2>

  <div className={styles["carousel-wrapper"]}>
    <button className={styles.arrow} onClick={() => scrollByWidth(-1)}> ‹
 </button>

    <div className={styles.carousel} ref={carouselRef}>
      {productsTop.map((u) => (
        <article
          key={u.id_empxprod}
          className={styles.card}
          onClick={() => setSelected(u)}
        >
          <div className={styles["card-img"]}>
            <img
              src={`http://localhost:5050/Imagenes/${u.codigo_imagen}`}
              alt={u.nombre_producto}
            />
          </div>

          <div className={styles["card-body"]}>
            <h3>{u.nombre_producto}</h3>
            <p className={styles.categoria}>{u.categoria}</p>
            <p className={styles.short}>{u.descripcion}</p>
            <div className={styles.price}>${u.precio}</div>
          </div>
        </article>
      ))}
    </div>

    <button className={styles.arrow} onClick={() => scrollByWidth(1)}>
      ›
    </button>
  </div>
</div>


    </>
  );
}
