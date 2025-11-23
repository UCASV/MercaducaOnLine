import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
    navigate("/productos");
  };

  return (
    <>
      <nav className={styles.navbarWrapper}>
        <ul className={styles.navbar}>
          <img
            className={styles.mercaducaLogonav}
            src={mercaducachiquitob}
            alt="Logo de Mercaduca On Line"
          />

          <li>
            <a className={styles.elemento} href="#inicio">Inicio</a>
          </li>

          <li>
            <a className={styles.elemento} href="#">Eventos</a>
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

      {/* === FOOTER === */}
      <footer id="footer" className={styles.footer}>
        <h3>Contáctanos</h3>
        <p>
          Teléfono: 123-456-7890 <br />
          Email: mercaduca@gmail.com <br />
          Dirección: UCA, El Salvador <br />
          Encuéntranos en
          <img className={styles.icono} src={instagram} alt="Instagram" />
          <a className={styles.link} href="#">Instagram</a>
        </p>
      </footer>
    </>
  );
}

export default Home;
