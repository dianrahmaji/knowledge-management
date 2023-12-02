import express from 'express';

const app = express();

app.get('/healthcheck', (req, res) => {
  return res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`api running at port ${PORT}`);
});
