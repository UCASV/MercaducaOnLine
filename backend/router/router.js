import express from "express";

import { Productos } from "../controllers/Productos.js"

const router = express.Router();

router.get("/productos", Productos);

export default router;
