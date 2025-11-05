import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

// Futbol API URL’si (örnek: Premier League, Champions League vs.)
const API_URL = "https://api.football-data.org/v4/competitions/CL/matches";

// Render ortam değişkeninden API anahtarı al (Render’da ekleyeceğiz)
const API_KEY = process.env.FOOTBALL_API_KEY;

// Ana endpoint
app.get("/matches", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { "X-Auth-Token": API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    console.error("❌ API isteği hatası:", error.message);
    res.status(500).json({ error: "API isteği başarısız" });
  }
});

// Test rotası (sunucu çalışıyor mu görmek için)
app.get("/", (req, res) => {
  res.send("✅ Proxy çalışıyor! /matches endpoint'ini deneyin.");
});

app.listen(PORT, () => {
  console.log(`✅ Proxy ${PORT} portunda çalışıyor!`);
});
