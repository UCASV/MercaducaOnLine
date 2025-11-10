import { useEffect, useState } from "react";
import "./ProductsGrid.css";

import img1 from "../img/2227.jpg";
import img2 from "../img/Empanadas.jpg";
import img3 from "../img/F100031656.jpg";
import img4 from "../img/Galletas.jpeg";
import img5 from "../img/images.jpeg";
import img6 from "../img/mermeladafrutosrojos.jpg";
import img7 from "../img/Pan.jpeg";
import genericIcon from "../img/generic.png";

export default function ProductsGrid() {
    const [categories, setCategories] = useState([
        { name: "Todos", icon: genericIcon },
        { name: "Alimentos y bebidas", icon: genericIcon },
        { name: "Productos artesanales", icon: genericIcon },
        { name: "Belleza y cuidado personal", icon: genericIcon },
        { name: "Moda y accesorios", icon: genericIcon },
        { name: "Salud y bienestar", icon: genericIcon },
        { name: "Tecnologia y electronica", icon: genericIcon },
        { name: "Arte y cultura", icon: genericIcon },
        { name: "Agricultura", icon: genericIcon },
        { name: "Articulos coleccionables", icon: genericIcon }
    ]);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [products, setProducts] = useState([]);
    const [expandedProduct, setExpandedProduct] = useState(null);

    useEffect(() => {

        const sample = [
            // Jochips (Galletas)
            { id: 1, brand: "Jochips", title: "Galletas Clásicas", categoria: "Alimentos y bebidas", price: "$2.50", img: img4 },
            { id: 2, brand: "Jochips", title: "Galletas Premium", categoria: "Alimentos y bebidas", price: "$3.50", img: genericIcon },

            // Evy Fantasy (Joyas artesanales)
            { id: 3, brand: "Evy Fantasy", title: "Pulseras de hilo", categoria: "Productos artesanales", price: "$5.00", img: genericIcon },
            { id: 4, brand: "Evy Fantasy", title: "Aretes", categoria: "Productos artesanales", price: "$7.00", img: genericIcon },
            { id: 5, brand: "Evy Fantasy", title: "Pulseras", categoria: "Productos artesanales", price: "$6.00", img: genericIcon },
            { id: 6, brand: "Evy Fantasy", title: "Collares", categoria: "Productos artesanales", price: "$12.00", img: genericIcon },
            { id: 7, brand: "Evy Fantasy", title: "Cadenas", categoria: "Productos artesanales", price: "$10.00", img: genericIcon },
            { id: 8, brand: "Evy Fantasy", title: "Anillos", categoria: "Productos artesanales", price: "$8.00", img: genericIcon },

            // Meowfa
            { id: 9, brand: "Meowfa", title: "Ganchos para cabello", categoria: "Moda y accesorios", price: "$1.50", img: genericIcon },
            { id: 10, brand: "Meowfa", title: "Peines", categoria: "Moda y accesorios", price: "$2.00", img: genericIcon },
            { id: 11, brand: "Meowfa", title: "Peluches", categoria: "Productos artesanales", price: "$9.00", img: genericIcon },
            { id: 12, brand: "Meowfa", title: "Monederos", categoria: "Moda y accesorios", price: "$4.00", img: genericIcon },
            { id: 13, brand: "Meowfa", title: "Llaveros", categoria: "Productos artesanales", price: "$2.50", img: genericIcon },

            // Es De Café
            { id: 14, brand: "Es De Café", title: "Café molido", categoria: "Alimentos y bebidas", price: "$6.00", img: img2 },
            { id: 15, brand: "Es De Café", title: "Dulces de café", categoria: "Alimentos y bebidas", price: "$3.00", img: genericIcon },
            { id: 16, brand: "Es De Café", title: "Horchata de café", categoria: "Alimentos y bebidas", price: "$4.00", img: genericIcon },
            { id: 17, brand: "Es De Café", title: "Prensas francesas", categoria: "Hogar", price: "$18.00", img: genericIcon },

            // Mascabado
            { id: 18, brand: "Mascabado", title: "Brownies", categoria: "Alimentos y bebidas", price: "$2.50", img: genericIcon },
            { id: 19, brand: "Mascabado", title: "Porciones de pastel", categoria: "Alimentos y bebidas", price: "$3.50", img: genericIcon },
            { id: 20, brand: "Mascabado", title: "Alfajores", categoria: "Alimentos y bebidas", price: "$1.75", img: genericIcon },
            { id: 21, brand: "Mascabado", title: "Muffins", categoria: "Alimentos y bebidas", price: "$2.00", img: genericIcon },
            { id: 22, brand: "Mascabado", title: "Tartaletas", categoria: "Alimentos y bebidas", price: "$2.75", img: genericIcon },

            // Two Lux (joyería)
            { id: 23, brand: "Two Lux", title: "Anillos", categoria: "Moda y accesorios", price: "$15.00", img: genericIcon },
            { id: 24, brand: "Two Lux", title: "Collares", categoria: "Moda y accesorios", price: "$18.00", img: genericIcon },
            { id: 25, brand: "Two Lux", title: "Aritos", categoria: "Moda y accesorios", price: "$9.00", img: genericIcon },
            { id: 26, brand: "Two Lux", title: "Pulseras", categoria: "Moda y accesorios", price: "$12.00", img: genericIcon },

            // Kithsune
            { id: 27, brand: "Kithsune", title: "Llaveros", categoria: "Productos artesanales", price: "$3.00", img: genericIcon },
            { id: 28, brand: "Kithsune", title: "Cartas TGC", categoria: "Articulos coleccionables", price: "$4.00", img: genericIcon },
            { id: 29, brand: "Kithsune", title: "Figuras de Anime", categoria: "Articulos coleccionables", price: "$20.00", img: genericIcon },

            // Oh My Glow!
            { id: 30, brand: "Oh My Glow!", title: "Mascarillas", categoria: "Belleza y cuidado personal", price: "$5.00", img: genericIcon },
            { id: 31, brand: "Oh My Glow!", title: "Bloqueadores", categoria: "Belleza y cuidado personal", price: "$8.00", img: genericIcon },
            { id: 32, brand: "Oh My Glow!", title: "Labiales", categoria: "Belleza y cuidado personal", price: "$6.00", img: genericIcon },
            { id: 33, brand: "Oh My Glow!", title: "Limpiadores", categoria: "Belleza y cuidado personal", price: "$7.00", img: genericIcon },
            { id: 34, brand: "Oh My Glow!", title: "Hidratantes", categoria: "Belleza y cuidado personal", price: "$9.00", img: genericIcon },

            // Tannie Go´s
            { id: 35, brand: "Tannie Go´s", title: "Llaveros", categoria: "Productos artesanales", price: "$2.50", img: genericIcon },
            { id: 36, brand: "Tannie Go´s", title: "Stickers", categoria: "Arte y cultura", price: "$1.50", img: genericIcon },
            { id: 37, brand: "Tannie Go´s", title: "Cardholders", categoria: "Moda y accesorios", price: "$6.00", img: genericIcon },
            { id: 38, brand: "Tannie Go´s", title: "Hot Wheels", categoria: "Articulos coleccionables", price: "$4.00", img: genericIcon },
            { id: 39, brand: "Tannie Go´s", title: "Straps decorativas", categoria: "Moda y accesorios", price: "$3.50", img: genericIcon },

            // Crochetique
            { id: 40, brand: "Crochetique", title: "Amigurumis", categoria: "Productos artesanales", price: "$10.00", img: genericIcon },
            { id: 41, brand: "Crochetique", title: "Flores de Crochet", categoria: "Productos artesanales", price: "$4.00", img: genericIcon },
            { id: 42, brand: "Crochetique", title: "Llaveros", categoria: "Productos artesanales", price: "$3.00", img: genericIcon },
            { id: 43, brand: "Crochetique", title: "Gorros Tejidos", categoria: "Moda y accesorios", price: "$12.00", img: genericIcon },

            // Le Sweet
            { id: 44, brand: "Le Sweet", title: "Brownies: Oreo, Mantequilla de Maní, Red Velvet, Normales", categoria: "Alimentos y bebidas", price: "$2.50", img: genericIcon },

            // Dulzea
            { id: 45, brand: "Dulzea", title: "Galletas", categoria: "Alimentos y bebidas", price: "$2.00", img: genericIcon },
            { id: 46, brand: "Dulzea", title: "Alfajores", categoria: "Alimentos y bebidas", price: "$1.75", img: genericIcon },
            { id: 47, brand: "Dulzea", title: "Pasteles", categoria: "Alimentos y bebidas", price: "$15.00", img: genericIcon },

            // Pixelari
            { id: 48, brand: "Pixelari", title: "Stickers", categoria: "Arte y cultura", price: "$1.50", img: genericIcon },
            { id: 49, brand: "Pixelari", title: "Llaveros", categoria: "Productos artesanales", price: "$3.00", img: genericIcon },
            { id: 50, brand: "Pixelari", title: "Pines", categoria: "Arte y cultura", price: "$2.50", img: genericIcon },
            { id: 51, brand: "Pixelari", title: "Aretes", categoria: "Moda y accesorios", price: "$5.00", img: genericIcon },

            // GYM Essentials
            { id: 52, brand: "GYM Essentials", title: "Cinturones", categoria: "Salud y bienestar", price: "$20.00", img: genericIcon },
            { id: 53, brand: "GYM Essentials", title: "Straps", categoria: "Salud y bienestar", price: "$8.00", img: genericIcon },
            { id: 54, brand: "GYM Essentials", title: "Muñequeras", categoria: "Salud y bienestar", price: "$7.00", img: genericIcon },
            { id: 55, brand: "GYM Essentials", title: "Tobilleras", categoria: "Salud y bienestar", price: "$6.00", img: genericIcon },

            // Klinto Store
            { id: 56, brand: "Klinto Store", title: "Pines metálicos", categoria: "Arte y cultura", price: "$3.00", img: genericIcon },
        ];
        setProducts(sample);

    }, []);

    const filtered = selectedCategory === "Todos"
        ? products
        : products.filter(p => p.categoria === selectedCategory);

    function openExpanded(p) {
        setExpandedProduct(p);
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

            <div className="categories-row" role="tablist" aria-label="Categorías">
                {categories.map((c) => {
                    const name = typeof c === "string" ? c : c.name;
                    return (
                        <button
                            key={name}
                            className={`cat-btn ${name === selectedCategory ? "active" : ""}`}
                            onClick={() => setSelectedCategory(name)}
                            role="tab"
                            aria-selected={name === selectedCategory}
                        >
                            <span className="cat-circle" aria-hidden="true">
                                {/* si c tiene icon muestra la imagen; si no, muestra la primera letra */}
                                {typeof c === "object" && c.icon ? (
                                    <img src={c.icon} alt={name} className="cat-icon" />
                                ) : (
                                    name[0]
                                )}
                            </span>
                            <small className="cat-label">{name}</small>
                        </button>
                    );
                })}
            </div>

            <div className="products-grid-main" aria-live="polite">
                {filtered.map((p) => (
                    <article
                        key={p.id}
                        className="product-card grid-card"
                        onClick={() => openExpanded(p)}
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter") openExpanded(p); }}
                        role="button"
                        aria-label={`${p.brand} ${p.title}`}
                    >
                        <div className="product-img-wrap">
                            {p.img ? <img src={p.img} alt={p.title} /> : <div className="no-img">Sin imagen</div>}
                        </div>

                        <div className="product-info">
                            <small className="brand">{p.brand}</small>
                            <h3 className="title">{p.title}</h3>
                            <div className="price">{p.price}</div>
                        </div>
                    </article>
                ))}
                {filtered.length === 0 && (
                    <div className="no-results">No hay productos en esta categoría.</div>
                )}
            </div>

            {expandedProduct && (
                <div className="pg-overlay" onClick={closeExpanded} role="dialog" aria-modal="true">
                    <div className="pg-expanded-card" onClick={(e) => e.stopPropagation()}>
                        <div className="pg-expanded-left">
                            <div className="product-img-wrap expanded-img">
                                {expandedProduct.img ? (
                                    <img src={expandedProduct.img} alt={expandedProduct.title} />
                                ) : (
                                    <div className="no-img">Sin imagen</div>
                                )}
                            </div>
                        </div>

                        <div className="pg-expanded-right">
                            <small className="brand">{expandedProduct.brand}</small>
                            <h3 className="title">{expandedProduct.title}</h3>
                            <div className="price">{expandedProduct.price}</div>
                            <p className="description">Aquí irá la descripción completa, opciones, stock y más detalles.</p>

                            <div className="actions">
                                <button className="btn-primary" onClick={() => { /* agregar al carrito */ }}>Mas informacion</button>
                                <button className="btn-secondary" onClick={closeExpanded}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}