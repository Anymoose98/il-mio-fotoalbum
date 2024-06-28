const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Accesso negato token non fornito 3' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.email = decoded.email; 

        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ error: 'Token non valido' });
    }
}

module.exports = verifyToken;