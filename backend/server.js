const { testConnection } = require('./config/db');

require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(
    cors({
      origin: process.env.CLIENT_URL || "*",  
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"]
    })
)

// Middleware
app.use(express.json())

// Routes

//Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, async () => {
  await testConnection(); // prueba MySQL al arrancar
  console.log(`API lista en http://localhost:${PORT}`);
});