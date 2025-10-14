const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => res.json({ ok: true }));

// --- Servir frontend Vite ---
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Escuchar en un puerto libre
const server = app.listen(0, () => {
  const PORT = server.address().port;
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

