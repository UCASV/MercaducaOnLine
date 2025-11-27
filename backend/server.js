import express from 'express';
import cors from 'cors';
import path from 'path';
import sql from 'mssql';
import userRoutes from "./router/router.js"
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

//app.get("/api/test", (req, res) => res.json({ ok: true }));
app.use('/', userRoutes);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/Imagenes', express.static(path.join(__dirname, 'Imagenes')));

// --- Servir frontend Vite ---
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
