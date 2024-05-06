// URL base de departamento: http://localhost:3000/departamento/
/*
Modelo de inserção de dados para teste no postman: 

{
    "nome_depart": "TI"
}
*/

const express = require('express');

const router = express.Router();

const createDBConnection = require('../../db')
const db = createDBConnection()

router.post('/', (req, res) => {
    const {
        nome_depart
    } = req.body

    if (!nome_depart) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios!'
        })
    }

    const departamentoPattern = /^[A-Z][a-zà-ú ]*$/; // regex para que apenas a primeira letra da sentença seja maiuscula

    if (!nome_depart.match(departamentoPattern)) {
        return res.status(400).json({
            message: 'O nome do departamento deve ter apenas a primeira letra da sentença maiuscula'
        })
    }

    const validationDepartamento = "SELECT COUNT(*) AS count FROM departamento WHERE nome_depart = ?";
    db.query(validationDepartamento, [nome_depart], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        const departamentoExists = result[0].count > 0;
        if (departamentoExists) {
            return res.status(400).json({
                message: 'Este departamento já está cadastrado'
            });
        }


        const sql = "INSERT INTO departamento (`nome_depart`) VALUES (?)";
        const values = [nome_depart];

        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            } else {
                res.status(201).json({
                    message: 'Dados inseridos no sistema com sucesso'
                })
            }
        });
    });
});

router.get('/', (req, res) => {
    const sql = "SELECT depId, nome_depart FROM departamento";
    const values = [req.body.depId, req.body.nome_depart];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        } else {
            res.status(201).json(data);
        }
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT depId, nome_depart FROM departamento WHERE depId = ?";
    const values = [id];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Departamento não encontrado'
            });
        }
        res.status(200).json(data[0]);
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const {
        nome_depart
    } = req.body

    if (!nome_depart) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios!'
        })
    }
    const departamentoPattern = /^[A-Z][a-zà-ú ]*$/; // regex para que apenas a primeira letra da sentença seja maiuscula

    if (!nome_depart.match(departamentoPattern)) {
        return res.status(400).json({
            message: 'O nome da departamento deve ter apenas a primeira letra da sentença maiuscula'
        })
    }

    const sql = "UPDATE departamento SET nome_depart = ? WHERE depId = ?";
    const values = [nome_depart, id];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Departamento não encontrado'
            });
        }
        res.status(200).json({
            message: 'Dados atualizados do sistema com sucesso'
        });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM departamento WHERE depId = ?";
    const values = [id];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Departamento não encontrada'
            });
        }
        res.status(200).json({
            message: 'Dados deletados do sistema com sucesso'
        });
    });
});

module.exports = router;