require("dotenv/config");

const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// Tratamento de error
app.use((error, request, response, next) => {
  response.status(500).json({ message: error.message });
});

// Iniciando o server
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`Server rodando na port ${PORT}`));
