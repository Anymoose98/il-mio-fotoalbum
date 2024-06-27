const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require('express-validator');
const deletePic = require("../utils/deletePic");

// Crea
const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, categories } = req.body;
        const img_path = req.file.path;

        const data = {
            title,
            description,
            img_path,
            categories: {
                connect: categories ? categories.map(id => ({ id: parseInt(id) })) : []
            },
            visible: true
        };

        const photo = await prisma.photo.create({ data });
        res.status(200).json({ message: 'Foto creata con successo', photo });
    } catch (err) {
        console.error(err);
        
        if (req.file) {
            deletePic('public/', req.file.filename);
        }
        res.status(500).json({ error: "Qualcosa è andato storto" });
    }
};

// Mostra tutti i contenuti
const index = async (req, res) => {
    try {
        const where = {};
        const { visible } = req.query;

        if (visible === 'false') {
            where.visible = false;
        } else if (visible === 'true') {
            where.visible = true;
        }

        const photos = await prisma.photo.findMany({
            where,
            include: {
                categories: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        res.json(photos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Errore nel recupero delle foto' });
    }
};

// Mostra un contenuto
const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const photo = await prisma.photo.findUnique({
            where: { id },
            include: {
                categories: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        });
        if (photo) {
            res.json(photo);
        } else {
            res.status(404).json({ error: "Foto non trovata" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Qualcosa è andato storto show" });
    }
};

// Aggiornamento
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, visible, categories } = req.body;

        let data = {
            title,
            description,
            visible: visible !== undefined ? visible : true,
            categories: {
                connect: categories ? categories.map(id => ({ id: parseInt(id) })) : []
            }
        };

        // Gestione dell'immagine se presente
        if (req.file) {
            const img_path = req.file.path;
            data.img_path = img_path;

            // Trova la foto esistente per eliminare l'immagine precedente
            const existingPhoto = await prisma.photo.findUnique({ where: { id: parseInt(id) } });
            if (existingPhoto && existingPhoto.img_path) {
                deletePic('public/', existingPhoto.img_path);
            }
        }

        const photo = await prisma.photo.update({
            where: { id: parseInt(id) },
            data
        });

        res.status(200).json(photo);
    } catch (err) {
        console.error("Errore nell'update:", err);
        res.status(500).json({ error: "Qualcosa è andato storto durante l'aggiornamento della foto" });
    }
};

// Elimina
const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await prisma.photo.findUnique({
            where: { id: parseInt(id) }
        });
        if (photo) {
            // Elimina l'immagine dal file system
            if (photo.img_path) {
                deletePic('public/', photo.img_path);
            }
            await prisma.photo.delete({
                where: { id: parseInt(id) }
            });
            res.status(200).json({ message: "Foto eliminata con successo" });
        } else {
            res.status(404).json({ message: "Foto non trovata" });
        }
    } catch (err) {
        console.error("Errore nel destroy:", err);
        res.status(500).json({ error: "Qualcosa è andato storto durante l'eliminazione della foto" });
    }
};

module.exports = { index, create, show, update, destroy };
