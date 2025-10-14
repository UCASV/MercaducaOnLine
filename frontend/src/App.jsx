import { useState } from "react";
import mercadoucapneg from "./img/mercaducaopng.png";
import mercaducachiquitob from "./img/mercaducachiquitob.png";
import instagram from "./img/instagram.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <link href="style.css" rel="stylesheet" />
          <title> Mercaduca On Line</title>
        </head>
        <body id="inicio">
          <nav>
            <ul class="navbar">
              <img
                class="mercaducaLogonav"
                src={mercaducachiquitob}
                alt="Logo de Mercaduca On Line"
              />
              {/* <!-- llevarlo a una zona de la pagina --> */}
              <a class="elemento" href="#inicio">
                <li>Inicio</li>
              </a>
              {/* <!-- otra pagina para eventos --> */}
              <a class="elemento" href="#">
                <li id="eventos">Eventos</li>
              </a>
              {/* <!-- otra pagina para productos --> */}
              <a class="elemento" href="#">
                <li id="productos" onclick="productos()">
                  Productos
                </li>
              </a>
              {/* <!-- llevarlo a una zona de la pagina --> */}
              <a class="elemento" href="#contenedorEmprendimientos">
                <li>Emprendimientos</li>
              </a>
              {/* <!-- llevarlo a una zona de la pagina --> */}
              <a class="elemento" href="#contenedorMasVendidos">
                <li>Productos más vendidos</li>
              </a>
              {/* <!-- llevarlo a una zona de la pagina --> */}
              <a class="elemento" href="#contenedorProximos">
                <li>Emprendimientos próximos</li>
              </a>
              {/* <contacto footer */}
              <a class="elemento" href="#footer">
                <li>Contacto</li>
              </a>
            </ul>
          </nav>
          <section>
            <div class="contenedorLogo">
              <img
                class="mercaducaLogoPrincipal"
                src={mercadoucapneg}
                alt="Logo de Mercaduca On Line"
              />
            </div>

            <div class="contenedorPrincipal">
              <h1>Bienvenidos a Mercaduca On Line</h1>
              <p>
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                non reprehenderit harum dicta quod odio officiis facere et natus
                earum. Aliquam quia, aliquid illo amet a quo exercitationem
                deserunt explicabo. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Suscipit fugiat id optio, maiores magnam
                asperiores distinctio labore. Assumenda modi, rerum ut,
                similique vero non officia, obcaecati facilis quo provident
                ipsum? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nostrum non reprehenderit harum dicta quod odio officiis facere
                et natus earum. Aliquam quia, aliquid illo amet a quo
                exercitationem deserunt explicabo. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Eligendi minus deserunt sed ex
                aliquid debitis unde necessitatibus repellat porro veritatis
                facilis exercitationem suscipit, quam, fugiat assumenda
                sapiente, temporibus officia quaerat. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nostrum non reprehenderit harum
                dicta quod odio officiis facere et natus earum. Aliquam quia,
                aliquid illo amet a quo exercitationem deserunt explicabo. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Eligendi
                minus deserunt sed ex aliquid debitis unde necessitatibus
                repellat porro veritatis facilis exercitationem suscipit, quam,
                fugiat assumenda sapiente, temporibus officia quaerat. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Nostrum non
                reprehenderit harum dicta quod odio officiis facere et natus
                earum. Aliquam quia, aliquid illo amet a quo exercitationem
                deserunt explicabo. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Eligendi minus deserunt sed ex aliquid debitis
                unde necessitatibus repellat porro veritatis facilis
                exercitationem suscipit, quam, fugiat assumenda sapiente,
                temporibus officia quaerat. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nostrum non reprehenderit harum
                dicta quod odio officiis facere et natus earum. Aliquam quia,
                aliquid illo amet a quo exercitationem deserunt explicabo. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Eligendi
                minus deserunt sed ex aliquid debitis unde necessitatibus
                repellat porro veritatis facilis exercitationem suscipit, quam,
                fugiat assumenda sapiente, temporibus officia quaerat.
              </p>
              <section id="contenedorEmprendimientos">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum non reprehenderit harum dicta quod odio officiis
                  facere et natus earum. Aliquam quia, aliquid illo amet a quo
                  exercitationem deserunt explicabo. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Suscipit fugiat id optio,
                  maiores magnam asperiores distinctio labore. Assumenda modi,
                  rerum ut, similique vero non officia, obcaecati facilis quo
                  provident ipsum? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Nostrum non reprehenderit harum dicta quod
                  odio officiis facere et natus earum. Aliquam quia, aliquid
                  illo amet a quo exercitationem deserunt explicabo. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Eligendi minus
                  deserunt sed ex aliquid debitis unde necessitatibus repellat
                  porro veritatis facilis exercitationem suscipit, quam, fugiat
                  assumenda sapiente, temporibus officia quaerat. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Nostrum non
                  reprehenderit harum dicta quod odio officiis facere et natus
                  earum. Aliquam quia, aliquid illo amet a quo exercitationem
                  deserunt explicabo. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Eligendi minus deserunt sed ex aliquid
                  debitis unde necessitatibus repellat porro veritatis facilis
                  exercitationem suscipit, quam, fugiat assumenda sapiente,
                  temporibus officia quaerat. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Nostrum non reprehenderit harum
                  dicta quod odio officiis facere et natus earum. Aliquam quia,
                  aliquid illo amet a quo exercitationem deserunt explicabo.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi minus deserunt sed ex aliquid debitis unde
                  necessitatibus repellat porro veritatis facilis exercitationem
                  suscipit, quam, fugiat assumenda sapiente, temporibus officia
                  quaerat. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Nostrum non reprehenderit harum dicta quod odio officiis
                  facere et natus earum. Aliquam quia, aliquid illo amet a quo
                  exercitationem deserunt explicabo. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Eligendi minus deserunt sed ex
                  aliquid debitis unde necessitatibus repellat porro veritatis
                  facilis exercitationem suscipit, quam, fugiat assumenda
                  sapiente, temporibus officia quaerat.
                </p>
              </section>
              <div id="contenedorMasVendidos">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum non reprehenderit harum dicta quod odio officiis
                  facere et natus earum. Aliquam quia, aliquid illo amet a quo
                  exercitationem deserunt explicabo. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Suscipit fugiat id optio,
                  maiores magnam asperiores distinctio labore. Assumenda modi,
                  rerum ut, similique vero non officia, obcaecati facilis quo
                  provident ipsum? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Nostrum non reprehenderit harum dicta quod
                  odio officiis facere et natus earum. Aliquam quia, aliquid
                  illo amet a quo exercitationem deserunt explicabo. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Eligendi minus
                  deserunt sed ex aliquid debitis unde necessitatibus repellat
                  porro veritatis facilis exercitationem suscipit, quam, fugiat
                  assumenda sapiente, temporibus officia quaerat. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Nostrum non
                  reprehenderit harum dicta quod odio officiis facere et natus
                  earum. Aliquam quia, aliquid illo amet a quo exercitationem
                  deserunt explicabo. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Eligendi minus deserunt sed ex aliquid
                  debitis unde necessitatibus repellat porro veritatis facilis
                  exercitationem suscipit, quam, fugiat assumenda sapiente,
                  temporibus officia quaerat. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Nostrum non reprehenderit harum
                  dicta quod odio officiis facere et natus earum. Aliquam quia,
                  aliquid illo amet a quo exercitationem deserunt explicabo.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi minus deserunt sed ex aliquid debitis unde
                  necessitatibus repellat porro veritatis facilis exercitationem
                  suscipit, quam, fugiat assumenda sapiente, temporibus officia
                  quaerat. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Nostrum non reprehenderit harum dicta quod odio officiis
                  facere et natus earum. Aliquam quia, aliquid illo amet a quo
                  exercitationem deserunt explicabo. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Eligendi minus deserunt sed ex
                  aliquid debitis unde necessitatibus repellat porro veritatis
                  facilis exercitationem suscipit, quam, fugiat assumenda
                  sapiente, temporibus officia quaerat.
                </p>
              </div>
              <div id="contenedorProximos">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum non reprehenderit harum dicta quod odio officiis
                  facere et natus earum. Aliquam quia, aliquid illo amet a quo
                  exercitationem deserunt explicabo. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Suscipit fugiat id optio,
                  maiores magnam asperiores distinctio labore. Assumenda modi,
                  rerum ut, similique vero non officia, obcaecati facilis quo
                  provident ipsum? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Nostrum non reprehenderit harum dicta quod
                  odio officiis facere et natus earum. Aliquam quia, aliquid
                  illo amet a quo exercitationem deserunt explicabo. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Eligendi minus
                  deserunt sed ex aliquid debitis unde necessitatibus repellat
                  porro veritatis facilis exercitationem suscipit, quam, fugiat
                  assumenda sapiente, temporibus officia quaerat. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Nostrum non
                  reprehenderit harum dicta quod odio officiis facere et natus
                  earum. Aliquam quia, aliquid illo amet a quo exercitationem
                  deserunt explicabo. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Eligendi minus deserunt sed ex aliquid
                  debitis unde necessitatibus repellat porro veritatis facilis
                  exercitationem suscipit, quam, fugiat assumenda sapiente,
                  temporibus officia quaerat. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Nostrum non reprehenderit harum
                  dicta quod odio officiis facere et natus earum. Aliquam quia,
                  aliquid illo amet a quo exercitationem deserunt explicabo.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi minus deserunt sed ex aliquid debitis unde
                  necessitatibus repellat porro veritatis facilis exercitationem
                  suscipit, quam, fugiat assumenda sapiente, temporibus officia
                  quaerat. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Nostrum non reprehenderit harum dicta quod odio officiis
                  facere et natus earum. Aliquam quia, aliquid illo amet a quo
                  exercitationem deserunt explicabo. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Eligendi minus deserunt sed ex
                  aliquid debitis unde necessitatibus repellat porro veritatis
                  facilis exercitationem suscipit, quam, fugiat assumenda
                  sapiente, temporibus officia quaerat.
                </p>
              </div>
            </div>
          </section>
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
              <img class="icono" src={instagram} alt="Instagram" />
              <a class="link" href="#">
                Instagram!
              </a>
            </p>
          </footer>
          <script src="script.js"></script>
        </body>
      </html>
    </>
  );
}

export default App;
