import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { pool } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// GET /api/stores/nearby?lat=-23.55&lng=-46.63&limit=5
// Retorna as lojas mais próximas da localização informada, ordenadas por distância (km)
app.get('/api/stores/nearby', async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const limit = Math.min(parseInt(req.query.limit) || 5, 50);

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return res.status(400).json({ error: 'Parâmetros "lat" e "lng" são obrigatórios e devem ser números.' });
  }

  try {
    // Fórmula de Haversine para calcular a distância em km direto no MySQL
    const [rows] = await pool.query(
      `SELECT id, name, address, neighborhood, city, state, latitude, longitude, phone, opening_hours,
        (6371 * acos(
          cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?))
          + sin(radians(?)) * sin(radians(latitude))
        )) AS distance_km
      FROM stores
      ORDER BY distance_km ASC
      LIMIT ?`,
      [lat, lng, lat, limit]
    );

    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar lojas próximas:', err);
    res.status(500).json({ error: 'Erro ao consultar o banco de dados.' });
  }
});

// GET /api/stores - lista todas as lojas
app.get('/api/stores', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM stores ORDER BY name ASC');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao listar lojas:', err);
    res.status(500).json({ error: 'Erro ao consultar o banco de dados.' });
  }
});

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
