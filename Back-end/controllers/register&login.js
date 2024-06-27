const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
const generateToken = require("../middlewares/jwtToken.js");
const { hashPassword, comparePassword } = require("../utils/hashPassword.js")

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        const token = generateToken({ email: user.email });

        res.json({ token, user: { email: user.email } });
    } catch (err) {
        if (err.code === 'P2002' && err.meta.target.includes('email')) {
            res.status(400).json({ message: 'Email già in uso' });
        } else {
            res.status(500).json({ message: 'Errore del server' });
        }
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ message: 'Credenziali non valide 1' });
        }

        const passwordValid = await comparePassword(password, user.password);
        if (!passwordValid) {
            return res.status(401).json({ message: 'Credenziali non valide 2' });
        }

        const token = generateToken({ email: user.email });

        res.json({ token, user: { email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Errore del server' });
        next(err);
    }
};

module.exports = {
    register,
    login
};