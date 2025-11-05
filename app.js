// app.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;
const API_KEY = process.env.API_FOOTBALL_KEY; // Render ayarlarında ekleyeceğiz

// Bugünkü Şampiyonlar Ligi maçlarını getir
app.get("/matches", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const apiUrl = `https://v3.football.api-sports.io/fixtures?date=${today}&league=2&season=2025`; // 2 = Champions League

    const response = await fetch(apiUrl, {
      headers: {
        "x-apisports-key": API_KEY,
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("API hata:", text);
      return res.status(response.status).json({ error: "API isteği başarısız" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Hata:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

app.listen(PORT, () => console.log(`✅ Proxy ${PORT} portunda çalışıyor!`));
