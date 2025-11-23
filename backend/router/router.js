import express from "express";

import { Productos } from "../controllers/Productos.js"
import { Categorias, MasVendidoPorCategoria } from "../controllers/Categorias.js";
import { ProductosCategoria } from "../controllers/Productos.js";
import { ActualizarPromedio } from "../controllers/Puntaje.js";


const router = express.Router();

router.get("/productos", Productos);
router.get("/categorias", Categorias);
router.get("/productos/categoria/:categoria", ProductosCategoria)
router.get("/productos/masvendidos/:categoria", MasVendidoPorCategoria)
router.post("/actualizarPromedio", ActualizarPromedio);

export default router;
