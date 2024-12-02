const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000; // Port du serveur

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Stockage temporaire du code
let currentCode = "";

// Endpoint pour recevoir le code depuis React
app.post("/api/code", (req, res) => {
  const { code } = req.body;

  if (code) {
    currentCode = code; // Stocke le code reçu
    console.log("Code reçu depuis React :", currentCode);
    res.status(200).send("Code enregistré avec succès !");
  } else {
    res.status(400).send("Aucun code reçu.");
  }
});

// Endpoint pour que l'ESP32 récupère le code
app.get("/api/code", (req, res) => {
  if (currentCode) {
    res.status(200).json({ code: currentCode });
    console.log("Code envoyé à l'ESP32 :", currentCode);
  } else {
    res.status(404).send("Aucun code disponible.");
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur intermédiaire en cours d'exécution sur le port ${PORT}`);
});
