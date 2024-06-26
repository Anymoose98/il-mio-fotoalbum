const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Creare nuovo contenuto
const create = async (req, res) => {
    const { title, description, visible, img_path, categories } = req.body;

    const data = {
        title,
        description,
        img_path,
        categories: {
            connect: categories ? categories.map(id => ({ id })) : []
        },
        visible: visible !== undefined ? visible : true
    };

    try {
        const photo = await prisma.photo.create({ data });
        res.status(200).json({ message: 'Foto creata con successo', photo });
    } catch (err) {
        console.error(err);
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
            res.json(photo)
        }
        else {
            throw new RestError(`Foto richiesta non trovata`, 404);
        }
    } catch (err) {
        // Per capire se entra nello show
        res.status(500).json({ error: "Qualcosa è andato storto show" });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, visible, img_path, categories } = req.body;

        const data = {
            title,
            description,
            img_path,
            categories: {
                connect: categories ? categories.map(id => ({ id })) : []
            },
            visible: visible !== undefined ? visible : true
        };

        // Gestione dei tags (supponendo intendessi categories)
        if (categories) {
            data.categories = {
                connect: categories.map(id => ({ id }))
            };
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

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await prisma.photo.findUnique({
            where: { id: parseInt(id) }
        });
        if (photo) {
            await prisma.photo.delete({
                where: { id: parseInt(id) }
            });
            res.status(200).json({ message: "Foto eliminata con successo" });
        } else {
            res.status(404).json({ message: "Foto non trovata" });
        }
    } catch (err) {
        console.error("Errore nello destroy:", err);
        res.status(500).json({ error: "Qualcosa è andato storto durante l'eliminazione della foto" });
    }
};

module.exports = { index, create, show, update, destroy }
