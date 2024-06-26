require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        email: user.email,
        password: user.password
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

