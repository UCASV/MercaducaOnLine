import express from "express";

import { Productos } from "../controllers/Productos.js"
import { Categorias, MasVendidoPorCategoria } from "../controllers/Categorias.js";
import { ProductosCategoria } from "../controllers/Productos.js";
import { ActualizarPromedio } from "../controllers/Puntaje.js";
import { Emprendimientos, ProductosPorEmprendimiento, EmprendimientosProximos } from "../controllers/Emprendimientos.js";


const router = express.Router();

router.get("/productos", Productos);
router.get("/categorias", Categorias);
router.get("/productos/categoria/:categoria", ProductosCategoria);
router.get("/productos/masvendidos/:categoria", MasVendidoPorCategoria);
router.post("/actualizarPromedio", ActualizarPromedio);
router.get("/emprendimientos", Emprendimientos);
router.get("/emprendimientos/:id", ProductosPorEmprendimiento);
router.get("/emprendimientosProximos", EmprendimientosProximos)

export default router;
