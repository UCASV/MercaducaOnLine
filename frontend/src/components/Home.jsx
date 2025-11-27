import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import mercadoucapneg from "../img/mercaducaopng.png";
import mercaducachiquitob from "../img/mercaducachiquitob.png";
import instagram from "../img/instagram.png";

import ProductsCarousel from "./ProductsCarousel.jsx";
import EmprendimientosCarousel from "./EmprendimientosCarousel1.jsx";
import EmprendimientosActivosGrid from "./EmprendimientosActivosGrid.jsx";

// IMPORTACIÓN CORRECTA DEL CSS MODULE
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();

    const Productos = () => {
      navigate("/productos"); // te lleva a la página de productos
    };
    
    const Eventos = () => {
      navigate("/Eventos")
    };

    const [showSmallLogo, setShowSmallLogo] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 150) {
          setShowSmallLogo(true);
        } else {
          setShowSmallLogo(false);
        } 
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <>
      <nav
        className={`$ {styles.navbarWrapper} ${
          showSmallLogo ? styles.withLogo : styles.contenedorLogoPequeño
        }`}
      >
        <ul className={styles.navbar}>
          {showSmallLogo && (
            <li className={styles.logoItem}>
              <img
                className={styles.mercaducaLogonav}
                src={mercaducachiquitob}
                alt="Logo Pequeño de Mercaduca On Line"
              />
            </li>
          )}
                
          <li>
            <a className={styles.elemento} href="#inicio">Inicio</a>
          </li>

          <li>
            <button className={styles.elementoBtn} onClick={Eventos}>Eventos</button>
          </li>

          <li>
            <button className={styles.elementoBtn} onClick={Productos}>
              Productos
            </button>
          </li>

          <li>
            <a className={styles.elemento} href="#contenedorEmprendimientos">
              Emprendimientos
            </a>
          </li>

          <li>
            <a className={styles.elemento} href="#contenedorMasVendidos">
              Productos más vendidos
            </a>
          </li>

          <li>
            <a className={styles.elemento} href="#contenedorProximos">
              Emprendimientos próximos
            </a>
          </li>

          <li>
            <a className={styles.elemento} href="#footer">Contacto</a>
          </li>
        </ul>
      </nav>

      {/* === CONTENIDO PRINCIPAL === */}
      
      <section id="inicio" className={styles.mainSection}>
        <div className={styles.contenedorLogo}>
          <img
            className={styles.mercaducaLogoPrincipal}
            src={mercadoucapneg}
            alt="Logo de Mercaduca On Line"
          />
        </div>

        <div className={styles.contenedorPrincipal}>
          <h1>Bienvenidos a Mercaduca On Line</h1>

          <p className={styles.parrafo}>
            COSASASSSSSSSSSSSSSSSSSS 
          </p>

          {/* === EMPRENDIMIENTOS ACTIVOS === */}
          <section id="contenedorEmprendimientos">
            <EmprendimientosActivosGrid />
          </section>

          {/* === MAS VENDIDOS === */}
          <div id="contenedorMasVendidos">
            <ProductsCarousel />
          </div>

          {/* === EMPRENDIMIENTOS PROXIMOS === */}
          <div id="contenedorProximos">
            <EmprendimientosCarousel />
          </div>
        </div>
      </section>
          <footer id="footer">
            <h3>Contáctanos</h3>
            <p>
              Teléfono: 123-456-7890
              <br />
              Email: mercaduca@gmail.com
              <br />
              Dirección: UCA, El Salvador
              <br />
              Encuéntranos en  
              <img className={styles.icono} src={instagram} alt="Instagram" />
              <a className={styles.link} href="https://www.instagram.com/mercaduca/">
                  Instagram!
              </a>
            </p>
          </footer>
    </>
  );
}

export default Home;
