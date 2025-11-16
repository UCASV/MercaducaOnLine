import express from "express";

import { Productos } from "../controllers/Productos.js"
import { Categorias } from "../controllers/Categorias.js";
import { ProductosCategoria } from "../controllers/Productos.js";


const router = express.Router();

router.get("/productos", Productos);
router.get("/categorias", Categorias);
router.get("/productos/categoria/:categoria", ProductosCategoria)

export default router;
