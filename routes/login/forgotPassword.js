// URL base do esqueceu-senha: http://localhost:3000/forgot-password/
/*
Modelo para testes no postman: 

{
    "email": "ondashequipe@gmail.com"
}
*/

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const createDBConnection = require('../../db');
const db = createDBConnection();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_KEY;
const dotenv = require('dotenv');
dotenv.config();

const frontURL = process.env.FRONT_URL;

// const queryLogin = require('../../Querys/login/usuarios')

router.post('/', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }
   
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!email.match(emailPattern)) {
        return res.status(400).json({ message: 'Email inválido' });
    }

    const novaSenha = Math.random().toString(36).slice(-8);

    // Verificar se o email existe no banco de dados
    const sql = "SELECT * FROM usuarios WHERE email = ?";
    db.query(sql, [email], (err, data) => {
    // db.query(queryLogin, [email], (err, data) => {
        if (err) {
            console.error("Erro ao executar a consulta SQL:", err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        if (data.length === 0) {
            console.log("Nenhum usuário encontrado com o email:", email);
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const user = data[0];

        
            const token = jwt.sign({ novaSenha }, secret, { expiresIn: '1h' });
            // const resetLink = `http://localhost:5173/reset/${token}`;
            const resetLink = `${frontURL}/reset/${token}`;

            // Envie o email de redefinição de senha com o link de reset
            sendResetEmail({ recipient_email: user.email, resetLink })
                .then(() => {
                    return res.status(200).json({ message: 'Email enviado.' });
                })  
                .catch((error) => res.status(500).json({ error: 'Erro ao enviar email de redefinição de senha' }));
        })
        
    
    });

async function sendResetEmail({ recipient_email, resetLink }) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.DB_EMAIL,
                pass: process.env.DB_PASSWORD,
            },
        });

        const mailConfig = {
            from: process.env.DB_EMAIL,
            to: recipient_email,
            subject: "Redefinição de senha - Stock Box",
            html: `
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Stock Box - Redefinição de Senha</title>
            </head>
            <body>
                <div style="font-family: Helvetica, Arial, sans-serif; min-width:1000px; overflow:auto; line-height:2">
                    <div style="margin:50px auto; width:70%; padding:20px 0">
                        <div style="border-bottom:1px solid #eee">
                            <a href="" style="font-size:1.4em; color: #00466a; text-decoration:none; font-weight:600">Koding 101</a>
                        </div>
                        <p style="font-size:1.1em">Olá,</p>
                        <p>Sua senha foi redefinida com sucesso.</p>
                        <p>Por favor, clique no link abaixo para redefinir sua senha:</p>
                        <a href="${resetLink}" style="display: block; margin-top: 10px;">Redefinir senha</a>
                        <p style="font-size:0.9em;">Atenciosamente,<br />Equipe Stock Box</p>
                        <hr style="border:none; border-top:1px solid #eee" />
                        <div style="float:right; padding:8px 0; color:#aaa; font-size:0.8em; line-height:1; font-weight:300">
                            <p>Stock Box Inc</p>
                            <p>R. Bento Branco de Andrade Filho</p>
                            <p>Brasil - SP</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>`,
        };

        transporter.sendMail(mailConfig, function (error, info) {
            if (error) {
                console.error("Erro ao enviar email:", error);
                return reject({ message: `Ocorreu um erro ao enviar o email` });
            }
            return resolve({ message: "Email enviado com sucesso" });
        });
    });
}


module.exports = router;
