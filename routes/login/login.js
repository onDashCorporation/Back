// URL base do login: http://localhost:3000/login/
/*
Modelo para testes no postman: 

{
    "email":"cargoaaa@gmail.com",
    "senha":"Cargo1234@"
}
*/

const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const salt = 10

const createDBConnection = require('../../db')

const db = createDBConnection() 

const dotenv = require('dotenv')
dotenv.config()
const secret = process.env.JWT_KEY
router.use(cookieParser());

const verifyjwt = require('../../middleware/jwt_autorization')

// const queryLogin = require('../../Querys/login/usuarios')

router.get('/', verifyjwt, (req,res) => {
    return res.json({Status: "Sucesso", usuarioId: req.usuarioId})
})

router.post('/', (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    const emailpattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    // if (!email.match(emailpattern)) {
    //     return res.status(400).json({ message: 'Email inválido' })
    // }

    const passwordpattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

        // if (!senha.match(passwordpattern)) {
        //     return res.status(400).json({ message: 'Senha inválida, a senha deve conter: 1 letra minúscula, 1 letra maiúscula, 1 caractere especial, 1 número, 12 dos caracteres' })
        // }
    if(!email.match(emailpattern) || !senha.match(passwordpattern)){
        return res.status(400).json({message: 'Email ou senha inválidos'})
    }

    const sql = "SELECT * FROM usuarios WHERE email = ? "
    db.query(sql, [email], (err, data) => {
    // db.query(queryLogin, [email], (err, data) => {
        if (err) return res.json({Error:"Erro de login no servidor"});
    
        if (data.length > 0) {
            bcrypt.compare(req.body.senha.toString(), data[0].senha, (err, response) => {
                if(err) return res.json({Error: "Erro ao comparar senhas"})
                if(response) {
                    const id = data[0].id
                    const token = jwt.sign({id}, secret, {expiresIn: '1d'})
                    res.cookie('token', token)

                    return res.json({Login: true, token, data})
                    // return res.json({Status: "Success"})
                    // return res.status(201).json({ message: 'Logado no sistema com sucesso' })

                } else{
                    return res.json({Error: "Senha inválida"})
                }
            })

            // const id = data[0].id
            // const token = jwt.sign({id}, secret, {expiresIn: 300})
            // return res.json({Login: true, token, data})

            }else{
                return res.json({Error:"email inexistente"})
            }
        
    })
})
module.exports=router