import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/matches", async (req, res) => {
  try {
    const response = await fetch("https://api.football-data.org/v4/competitions/CL/matches", {
      headers: { "X-Auth-Token": "b834adbcb96e47edac2a752fb8d2ac73" }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "API isteği başarısız oldu" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Sunucu hatası", details: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("🏆 Champions League Proxy Çalışıyor! /matches adresine gidin ⚽");
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`✅ Proxy ${port} portunda çalışıyor!`));
