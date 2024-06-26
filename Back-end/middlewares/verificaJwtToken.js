const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Accesso negato, token non fornito' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 

        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ error: 'Token non valido' });
    }
}

module.exports = verifyToken;