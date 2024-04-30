// URL base do cadastro: http://localhost:3000/signup/
/*
Modelo para testes no postman: 

{
  "usuNome":"Testando signup",
  "email":"Teste@gmail.com",
  "senha":"Signup1234@",
  "fk_cargoId": 21
}
*/

//Nome do banco no Xampp: signup (aí é só importar o login lá que já funciona)

const express = require('express');

const router = express.Router();

const createDBConnection = require('../../db')
const db = createDBConnection()

const bcrypt = require('bcrypt')
const salt = 10

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null,'')
    // },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.post('/upload', upload.single('foto'), (req, res) => {
    console.log(req.file)
    const foto = req.file.filename
    const sql = "UPDATE cadastroItem SET foto=?"
    db.query(sql, [foto], (err, result) => {
        if (err) return res.json({
            Message: "Error"
        })
        return res.json({
            Status: "Sucess"
        })
    })
})

// const inserir = require('../../Querys/login/inserirDados')
// const validar = require('../../Querys/login/validarEmail')

router.post('/', upload.single('foto'), (req, res) => {
    const {
        usuNome,
        email,
        senha,
        fk_cargoId,
        fk_depId
    } = req.body
    const foto = req.file

    if (!usuNome || !email || !senha || !fk_depId || !foto) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios!'
        });
    }
    if (usuNome === senha) {
        return res.status(400).json({
            message: 'A senha não pode ser igual ao nome'
        })
    }

    // if (!Number.isInteger(fk_cargoId) || !Number.isInteger(fk_departamentoId)) {
    //     return res.status(400).json({
    //         message: 'Insira os ids do cargo e do departamento como um número inteiro'
    //     });
    // }

    // if (fk_cargoId != 1 && fk_cargoId != 2 && fk_cargoId != 3) {
    //     return res.status(400).json({ message: 'O cargo deve ser um dos seguintes valores: 1 - Auxiliar, 2 - Gestor, 3 - Solicitante' });
    // }
    // const validCargos = ['1', '2', '3'];
    // if (!validCargos.includes(cargo)) {
    //     return res.status(400).json({ message: 'O cargo deve ser um dos seguintes valores: \n1 - Gestor\n2 - Auxiliar\n3 - Solicitante' });
    // }
    // if (cargo != 1 || cargo != 2 ||cargo != 3){
    //     return res.status(400).json({ message: 'O cargo deve ser em número:\n1 - Gestor\n2 - Auxiliar\n3 - Solicitante' })
    // }
    const emailpattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!email.match(emailpattern)) {
        return res.status(400).json({
            message: 'Email inválido'
        })
    }

    const passwordpattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

    if (!senha.match(passwordpattern)) {
        return res.status(400).json({
            message: 'Senha inválida, a senha deve conter: 1 letra minúscula, 1 letra maiúscula, 1 caractere especial, 1 número, 8 dos caracteres'
        })
    }


    const validationEmail = "SELECT COUNT(*) AS count FROM usuarios WHERE email = ?";
    db.query(validationEmail, [email], (err, result) => {
        // db.query(validar, [email], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        const emailExists = result[0].count > 0;
        if (emailExists) {
            return res.status(400).json({
                message: 'Este email já está cadastrado'
            });
        }
        console.log(fk_depId)
        const new_fk_depId = parseInt(fk_depId)

        if (!Number.isInteger(new_fk_depId)) {
            return res.status(400).json({
                message: 'Insira o id do departamento como um número inteiro'
            });
        }

        const validationDepartamento = "SELECT COUNT(*) AS count FROM departamento WHERE departamentoId = ?";
        db.query(validationDepartamento, [new_fk_depId], (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            const departamentoExists = result[0].count > 0;
            if (!departamentoExists) {
                return res.status(400).json({
                    message: 'Departamento inválido'
                });
            }

            const sql = "INSERT INTO usuarios (`usuNome`,`email`,`senha`, `fk_cargoId`, `fk_depId`, `foto`) VALUES (?, ?, ?, ?, ?, ?)"

            bcrypt.hash(req.body.senha.toString(), salt, (err, hash) => {
                if (err) return res.json({
                    Error: "Error no hashing de senha"
                })
                const values = [
                    usuNome,
                    email,
                    hash,
                    3,
                    fk_depId,
                    foto.filename
                ]

                db.query(sql, values, (err, result) => {
                    if (err) {
                        return res.json({
                            Error: "Erro ao inserir dados no sistema"
                        })
                    }
                    res.status(201).json({
                        message: 'Dados inseridos no sistema com sucesso'
                    })
                });
            })
        })
    })
})

router.put('/:id', upload.single('foto'), (req, res) => {
    const id = req.params.id;
    const {
        usuNome,
        email,
        fk_cargoId,
        fk_depId
    } = req.body
    const foto = req.file

    if (!usuNome || !email || !fk_depId || !foto) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios!'
        });
    }

    const emailpattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!email.match(emailpattern)) {
        return res.status(400).json({
            message: 'Email inválido'
        })
    }
    const validationEmail = "SELECT COUNT(*) AS count FROM usuarios WHERE email = ?";
    db.query(validationEmail, [email], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        const emailExists = result[0].count > 0;
        if (!emailExists) {
            return res.status(400).json({
                message: 'Email inválido'
            });
        }
        const new_fk_depId = parseInt(fk_depId)
        if(!Number.isInteger(new_fk_depId)) {
            return res.status(400).json({
                message: 'Insira o id do departamento como um número inteiro'
            });
        }

        const validationDepartamento = "SELECT COUNT(*) AS count FROM departamento WHERE departamentoId = ?";
        db.query(validationDepartamento, [new_fk_depId], (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            const departamentoExists = result[0].count > 0;
            if (!departamentoExists) {
                return res.status(400).json({
                    message: 'Departamento inválido'
                });
            }

            const sql = "UPDATE usuarios SET usuNome =? , email =?, fk_cargoId =?, fk_depId =?, foto=? WHERE usuId =?"

            const values = [
                usuNome,
                email,
                hash,
                fk_cargoId,
                fk_depId,
                foto.filename,
                id
            ]

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.json({
                        Error: "Erro ao inserir dados no sistema",
                    })
                }
                res.status(201).json({
                    message: 'Dados inseridos no sistema com sucesso'
                })
            });
        })
    })
})
module.exports = router;