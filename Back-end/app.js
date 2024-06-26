const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000; 
const photoRouter = require("./Router/photoRouter.js")

app.use(express.json());

// Route Home
app.get('/', (req, res) => {
    res.send("<h1>Prova</h1>"); 
});

// Route per CRUD Foto
app.use('/photo', photoRouter)

// Route per Crud Category

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});