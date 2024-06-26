const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Creare nuovo contenuto
const create = async (req, res) => {
    const { name } = req.body;
    const data = {
        name
    }
    try {
        const category = await prisma.category.create({ data });
        res.status(200).json({ message: 'categoria creata con successo', category });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Qualcosa è andato storto" });
    }
};

// Tutti
const index = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Errore nel recupero delle categorie' });
    }
};

// Elimina
const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id) }
        });
        if (category) {
            await prisma.category.delete({
                where: { id: parseInt(id) }
            });
            res.status(200).json({ message: "Categoria eliminata con successo" });
        } else {
            res.status(404).json({ message: "Categoria non trovata" });
        }
    } catch (err) {
        console.error("Errore nello destroy:", err);
        res.status(500).json({ error: "Qualcosa è andato storto durante l'eliminazione della categoria" });
    }
};

module.exports = { create, index, destroy };