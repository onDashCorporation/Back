// URL base do cadastro: http://localhost:3000/signup/
/*
Modelo para testes no postman: 

{
  "usuNome":"Testando signup",
  "email":"Teste@gmail.com",
  "senha":"Signup1234@",
  "fk_cargoId": 21
  "fk_depId": 2
}
*/

//Nome do banco no Xampp: signup (aí é só importar o login lá que já funciona)

const express = require('express');

const router = express.Router();

const createDBConnection = require('../../db')
const db = createDBConnection()

// tratamento de imagens
const uploadS3 = require("../../config/upload-s3.js")
const multer = require('multer');

// criptografia
const bcrypt = require('bcrypt')
const salt = 10

router.post('/upload', multer(uploadS3).single("foto"), (req, res) => {
    console.log(req.file)
    const foto = req.file.location
    const sql = "UPDATE usuarios SET foto_usu=?"
    db.query(sql, [foto], (err, result) => {
        if (err) return res.json({
            Message: "Error"
        })
        return res.json({
            Status: "Sucess"
        })
    })
})

router.post('/', multer(uploadS3).single("foto"), (req, res) => {
    const {
        usuNome,
        email,
        senha,
        fk_cargoId,
        fk_depId
    } = req.body

    const foto_padrao = ''
    const foto = req.file ? req.file.location : foto_padrao

    console.log(foto)
    if (!usuNome || !email || !senha || !fk_depId) {
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
        const new_fk_depId = parseInt(fk_depId)
        const new_fk_cargoId = parseInt(fk_cargoId)

        if (!Number.isInteger(new_fk_depId) || (!Number.isInteger(new_fk_cargoId))) {
            return res.status(400).json({
                message: 'Insira os IDs como um número inteiro'
            });
        }

        const validationDepartamento = "SELECT COUNT(*) AS count FROM departamento WHERE depId = ?";
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
            const validationCargo = "SELECT COUNT(*) AS count FROM cargos WHERE cargoId = ?";
            db.query(validationCargo, [new_fk_cargoId], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }
                const cargoExists = result[0].count > 0;
                if (!cargoExists) {
                    return res.status(400).json({
                        message: 'Cargo inválido'
                    });
                }

            const sql = "INSERT INTO usuarios (`usuNome`,`email`,`senha`, `fk_cargoId`, `fk_depId`, `foto_usu`) VALUES (?, ?, ?, 3, ?, ?)"

            bcrypt.hash(req.body.senha.toString(), salt, (err, hash) => {
                if (err) return res.json({
                    Error: "Error no hashing de senha"
                })
                const values = [
                    usuNome,
                    email,
                    hash,
                    // fk_cargoId,
                    fk_depId,
                    foto
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
})

router.get('/', (req, res) => {
    const sql = "SELECT * FROM usuarios";
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json(data);
        }
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT usuId, usuNome, email, fk_cargoId, fk_depId FROM usuarios WHERE usuId = ?";
    const values = [id];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Usuário não encontrado'
            });
        }
        res.status(200).json(data[0]);
    });
});

router.put('/:id',  multer(uploadS3).single("foto_usu"), (req, res) => {
    const id = req.params.id;
    const {
        usuNome,
        email,
        fk_cargoId,
        fk_depId
    } = req.body
    const foto_usu = req.file ? req.file.location : ''

    console.log(req.body)
    if (!usuNome || !email || !fk_depId || !foto_usu) {
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
        if (!Number.isInteger(new_fk_depId)) {
            return res.status(400).json({
                message: 'Insira o id do departamento como um número inteiro'
            });
        }

        const validationDepartamento = "SELECT COUNT(*) AS count FROM departamento WHERE depId = ?";
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

            const sql = "UPDATE usuarios SET usuNome =? , email =?, senha=?, fk_cargoId =?, fk_depId =?, foto_usu=? WHERE usuId =?"

            bcrypt.hash(req.body.senha.toString(), salt, (err, hash) => {
                if (err) return res.json({
                    Error: "Error no hashing de senha"
                })

                const values = [
                    usuNome,
                    email,
                    hash,
                    fk_cargoId,
                    fk_depId,
                    foto_usu,
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
})
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM usuarios WHERE usuId = ?";
    const values = [id];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Usuário não encontrado'
            });
        }
        res.status(200).json({
            message: 'Dados deletados do sistema com sucesso'
        });
    });
});

module.exports = router;