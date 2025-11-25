import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import mercaducachiquitob from "../img/mercaducachiquitob.png";
import instagram from "../img/instagram.png";
import styles from "./Eventos.module.css";

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
              <button className={styles.elementoBtn} onClick={Eventos}>
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
      <section className={styles.footerSection}>
        <footer id="footer">
          <h3>Contactanos</h3>
          <p>
            Telefono: 123-456-7890
            <br />
            Email: mercaduca@gmail.com
            <br />
            Direccion: UCA, El Salvador
            <br />
            Encuentranos en
            <img className={styles.icono} src={instagram} alt="Instagram" />
            <a
              className={styles.link}
              href="https://www.instagram.com/mercaduca/"
            >
              Instagram!
            </a>
          </p>
        </footer>
      </section>
    </div>
  );
}

export default Eventos;
