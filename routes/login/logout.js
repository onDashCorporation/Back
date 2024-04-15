// URL base do logout: http://localhost:3000/logout/

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
router.use(cookieParser());

const dotenv = require('dotenv')
dotenv.config()


router.get('/', (req, res) =>{
    if (req.cookies.token) {
        res.clearCookie('token');
        return res.status(201).json({ message: 'Deslogado do sistema com sucesso' });
    } else {
        return res.status(200).json({ message: 'O usuário já está desconectado' });
    }
});

module.exports = router;
