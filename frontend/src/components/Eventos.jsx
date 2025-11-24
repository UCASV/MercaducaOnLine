import "./Eventos.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import mercaducachiquitob from "../img/mercaducachiquitob.png";
import instagram from "../img/instagram.png";

const data = {
  eventos: [
    {
      id: 1,
      nombre: "Feria de Emprendedoras 2024",
      fecha: "2024-05-10",
      lugar: "Plaza Central",
      emprendimientos: [
        {
          id: 101,
          nombre: "Artesanías Luna",
          categoria: "Artesanía",
          ventas: 120.5,
        },
        { id: 102, nombre: "Dulce Hogar", categoria: "Repostería", ventas: 85 },
        { id: 103, nombre: "EcoPack", categoria: "Sustentable", ventas: 200 },
      ],
    },
    {
      id: 2,
      nombre: "Expo Juventud",
      fecha: "2024-07-01",
      lugar: "Gimnasio UCA",
      emprendimientos: [
        { id: 201, nombre: "TechGirls", categoria: "Tecnología", ventas: 350 },
        { id: 202, nombre: "GreenLife", categoria: "Sustentable", ventas: 100 },
      ],
    },
  ],
};

function Evento() {}

function Eventos() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

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
    <div className="Eventos">
      <nav>
        <ul class="navbar">
          <img
            class="mercaducaLogonav"
            src={mercaducachiquitob}
            alt="Logo de Mercaduca On Line"
          />
          {/* <!-- llevarlo a una zona de la pagina --> */}
          <a class="elemento" onClick={Home}>
            <li>Inicio</li>
          </a>
          {/* <!-- otra pagina para eventos --> */}
          <a class="elemento" onClick={Eventos}>
            <li id="eventos">Eventos</li>
          </a>
          {/* <!-- otra pagina para productos --> */}
          <a class="elemento" onClick={Productos}>
            <li id="productos">Productos</li>
          </a>
          {/* <contacto footer */}
          <a class="elemento" href="#footer">
            <li>Contacto</li>
          </a>
        </ul>
      </nav>
      <div className="Evento"></div>
      <footer id='footer'>
        <h3>Contactanos</h3>
            <p>
              Telefono: 123-456-7890
              <br />
              Email: mercaduca@gmail.com
              <br />
              Direccion: UCA, El Salvador
              <br />
              Encuentranos en
              <img class="icono" src={instagram} alt="Instagram" />
              <a class="link" href="https://www.instagram.com/mercaduca/">
                Instagram!
              </a>
            </p>
      </footer>
    </div>
  );
}

export default Eventos;
