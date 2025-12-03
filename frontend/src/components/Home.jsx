import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import mercadoucapneg from "../img/mercaducaopng.png";
import mercaducachiquitob from "../img/mercaducachiquitob.png";
import instagram from "../img/instagram.png";
import fondo from "../img/fondo.jpg";


import ProductsCarousel from "./ProductsCarousel.jsx";
import EmprendimientosCarousel from "./EmprendimientosCarousel1.jsx";
import EmprendimientosActivosGrid from "./EmprendimientosActivosGrid.jsx";

import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();

  const Productos = () => navigate("/productos");
  const Eventos = () => navigate("/Eventos");

  const [showSmallLogo, setShowSmallLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSmallLogo(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <div className={styles.background}></div>
      <div
      className={styles.homeBackground}

      >
        {/* NAVBAR */}
        <nav
          className={`${styles.navbarWrapper} ${
            showSmallLogo ? styles.withLogo : ""
          }`}
        >
          <ul className={styles.navbar}>
            {showSmallLogo && (
              <li className={styles.logoItem}>
                <img
                  className={styles.mercaducaLogonav}
                  src={mercaducachiquitob}
                  alt="Logo pequeño"
                />
              </li>
            )}

            <li><a className={styles.elemento} href="#inicio">Inicio</a></li>
            <li><button className={styles.elementoBtn} onClick={Eventos}>Eventos</button></li>
            <li><button className={styles.elementoBtn} onClick={Productos}>Productos</button></li>
            <li><a className={styles.elemento} href="#contenedorEmprendimientos">Emprendimientos</a></li>
            <li><a className={styles.elemento} href="#contenedorMasVendidos">Más vendidos</a></li>
            <li><a className={styles.elemento} href="#contenedorProximos">Próximos</a></li>
            <li><a className={styles.elemento} href="#footer">Contacto</a></li>
          </ul>
        </nav>

        {/* SECCIÓN PRINCIPAL */}
        <section id="inicio" className={styles.mainSection}>

          {/* LOGO PRINCIPAL */}
          <div className={styles.contenedorLogo}>
            <img
              className={styles.mercaducaLogoPrincipal}
              src={mercadoucapneg}
              alt="Logo principal"
            />
          </div>

          {/* CONTENIDO */}
          <div className={styles.contenedorPrincipal}>

            {/* BANNER 1 */}
            <section className={styles.bannerWindow}>
              <div className={styles.bannerOverlay}>
                <h1>Bienvenidos a Mercaduca On Line</h1>
                <p className={styles.parrafo}>Un esfuerzo del Centro de Orientación Profesional, <br />
                  ¡para el desarrollo de emprendimientos locales UCA!</p>
              </div>
            </section>

            {/* EMPRENDIMIENTOS ACTIVOS */}
            <section id="contenedorEmprendimientos" style={{ marginBottom: "3rem" }}>
              <EmprendimientosActivosGrid />
            </section>

            {/* MÁS VENDIDOS */}
            <div id="contenedorMasVendidos">
              <ProductsCarousel />
            </div>

            {/* BANNER 2 */}
            <section className={styles.bannerWindow}>
              <div className={styles.bannerOverlay}>
                <h1>¿Preparado para lo que se viene?</h1>
                <p className={styles.parrafo}>¡Actívate para recibir las siguientes novedades!</p>
              </div>
            </section>

            {/* EMPRENDIMIENTOS PRÓXIMOS */}
            <div id="contenedorProximos">
              <EmprendimientosCarousel />
            </div>

          </div>
        </section>

        {/* FOOTER */}
        <footer id="footer" className={styles.footer}>
          <div className={styles.footerContent}>

            {/* CONTACTO */}
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>¡Contáctanos!</h3>
              <p>Teléfono: 123-456-7890</p>
              <p>Email: mercaduca@gmail.com</p>

              <div className={styles.instagramRow}>
                <img className={styles.icono} src={instagram} alt="Instagram" />
                <a className={styles.link} href="https://www.instagram.com/mercaduca/">
                  Instagram Oficial
                </a>
              </div>
            </div>

            {/* UBICACIÓN */}
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>Ubicación y Horarios</h3>
              <p className={styles.footerSmallText}>
                Bulevar Los Próceres, Antiguo Cuscatlán, La Libertad, El Salvador.
              </p>
              <p className={styles.footerSmallText}>
                Lunes a Jueves: 9 AM - 5:30 PM <br />
                Viernes: 9 AM - 1 PM
              </p>
            </div>

          </div>
        </footer>

      </div>
    </>
  );
}

export default Home;
