import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import mercaducachiquitob from "../img/mercaducachiquitob.png";
import instagram from "../img/instagram.png";
import styles from "./Eventos.module.css";
import homeStyles from "./Home.module.css";

function formatearHorario(ini, fn) {
  const inicio = new Date(ini);
  const fin = new Date(fn);

  const fecha = inicio.toLocaleDateString("es-SV");
  const horaInicio = inicio.toLocaleTimeString("es-SV", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const horaFin = fin.toLocaleTimeString("es-SV", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${fecha} - ${horaInicio} a ${horaFin}`;
}

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5050/eventos")
      .then((res) => res.json())
      .then((data) => {
        setMensaje(data.mensaje);
        setEventos(data.data);
      })
      .catch((err) => {
        setMensaje("Error al cargar eventos");
        console.error(err);
      });
  }, []);
  
    const goEventos = () => {
      if (location.pathname === "/Eventos") {
        // Ya estoy en la página → subir arriba
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Ir a Eventos por primera vez
        navigate("/Eventos");
      }
    };

  const Productos = () => {
    navigate("/productos"); // te lleva a la página de productos
  };

  const Eventos = () => {
    navigate("/Eventos");
  };
  const Home = () => {
    navigate("/");
  };

  return (
    <div className={styles.eventosWrapper}>
      <main className={styles.mainContent}>
        <nav>
          <img
            className={styles.mercaducaLogonav}
            src={mercaducachiquitob}
            alt="Logo de Mercaduca On Line"
          />
          <ul className={styles.navbarWrapper}>
            {/* <!-- llevarlo a una zona de la pagina --> */}
            <li>
              <a className={styles.elemento} onClick={Home}>
                Inicio
              </a>
            </li>
            {/* <!-- otra pagina para eventos --> */}
            <li>
              <button className={styles.elementoBtn} onClick={goEventos} href="#nav">
                Eventos
              </button>
            </li>

            <li>
              <button className={styles.elementoBtn} onClick={Productos}>
                Productos
              </button>
            </li>
            {/* <contacto footer */}
            <li>
              <a className={styles.elemento} href="#footer">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.eventosContainer}>
          {eventos.length > 0 ? (
            eventos.map((e) => (
              <div className={styles.eventoCard}>
                <div className={styles.panelVerde}>
                  <h3>{e.nombre}</h3>
                  <div className={styles.cardContenido}>
                    <p>{e.descripcion}</p>
                    <hr></hr>
                    <p>
                      <strong>Horario:</strong>
                    </p>
                    <p>{formatearHorario(e.horario_inicio, e.horario_final)}</p>
                    <hr></hr>
                    <p>
                      <strong>Emprendimientos:</strong>
                    </p>

                    <ul>
                      {e.emprendimientos.map((emp, i) => (
                        <li>{emp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={styles.panelImagen}>
                  <img
                    src={`http://localhost:5050/Imagenes/${e.codigo_imagen}`}
                    className={styles.eventoImg}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className={styles.eventoCardEmpty}>
              <p>{mensaje}</p>
            </div>
          )}
        </div>
      </main>
      {/* FOOTER */}
      <footer id="footer" className={homeStyles.footer}>
        <div className={homeStyles.footerContent}>

          {/* CONTACTO */}
          <div className={homeStyles.footerSection}>
            <h3 className={homeStyles.footerTitle}>¡Contáctanos!</h3>
            <p>Teléfono: 123-456-7890</p>
            <p>Email: mercaduca@gmail.com</p>

            <div className={homeStyles.instagramRow}>
              <img className={homeStyles.icono} src={instagram} alt="Instagram" />
              <a className={homeStyles.link} href="https://www.instagram.com/mercaduca/">
                Instagram Oficial
              </a>
            </div>
          </div>

          {/* UBICACIÓN */}
          <div className={homeStyles.footerSection}>
            <h3 className={homeStyles.footerTitle}>Ubicación y Horarios</h3>
            <p className={homeStyles.footerSmallText}>
              Bulevar Los Próceres, Antiguo Cuscatlán, La Libertad, El Salvador.
            </p>
            <p className={homeStyles.footerSmallText}>
              Lunes a Jueves: 9 AM - 5:30 PM <br />
              Viernes: 9 AM - 1 PM
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default Eventos;
