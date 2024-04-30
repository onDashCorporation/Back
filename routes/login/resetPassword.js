// URL base do reset: será enviada no email
/*
Modelo para testes no postman: 

{
    "newPassword": "adhgasg"
}
*/

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const createDBConnection = require('../../db');
const db = createDBConnection();
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

// const updateSql = require('../../Querys/login/atualizarDados')

const secret = process.env.JWT_KEY;

router.post('/', (req, res) => {
    const { token } = req.body; // Extrai o token e o usuarioId da URL
    const { senha } = req.body;

    console.log("Body: " ,req.body)

    if (!token || !novaSenha) {
        return res.status(400).json({ message: 'Token, nova senha são obrigatórios!' });
    }

    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: 'Token inválido ou expirado' });
        }

        const { userId } = decodedToken;

        bcrypt.hash(novaSenha, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao criptografar senha' });
            }

            const updateSql = "UPDATE usuarios SET senha = ? WHERE usuId = ?";
            db.query(updateSql, [hash, userId], (err, result) => {
            // db.query(updateSql, [hash, userId], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({ error: 'Erro ao atualizar a senha' });
                }
                console.log(hash)
                return res.status(200).json({ message: 'Senha redefinida com sucesso' });
            });
        });
    });
});


module.exports = router;