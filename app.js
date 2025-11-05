import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

const API_KEY = "b834adbcb96e47edac2a752fb8d2ac73"; // senin key'in

app.get("/", (req, res) => {
  res.send("✅ Football Proxy Aktif! UEFA verileri hazır ⚽");
});

// Şampiyonlar Ligi maçlarını çek
app.get("/matches", async (req, res) => {
  try {
    const response = await fetch("https://api.football-data.org/v4/competitions/CL/matches", {
      headers: { "X-Auth-Token": API_KEY },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("API isteği hatası:", err);
    res.status(500).json({ error: "Football API hatası" });
  }
});

app.listen(PORT, () => {
  console.log(`⚽ Proxy aktif: Port ${PORT}`);
});
