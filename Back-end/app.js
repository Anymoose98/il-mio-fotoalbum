const express = require("express");
const app = express();
const port = process.env.PORT || 3000; 
const photoRouter = require("./Router/photoRouter.js")
const categoryRouter = require("./Router/categoryRouter.js")
const authRouter = require("./Router/auth.js")
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// Route per le operazioni di autenticazione
app.use('/identificazione', authRouter);

// Route Home
app.get('/', (req, res) => {
    res.send("<h1>Prova</h1>"); 
});

// Route per CRUD Foto
app.use('/photo', photoRouter)

// Route per Crud Category
app.use('/category', categoryRouter)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});