import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/healthcheck', (req, res) => {
  return res.json({ ok: true });
});

const PORT = process.env.API_PORT || 3000;

app.listen(PORT, () => {
  console.log(`api running at port ${PORT}`);
});
