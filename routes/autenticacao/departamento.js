// URL base de departamento: http://localhost:3000/departamento/
/*
Modelo de inserção de dados para teste no postman: 

{
    "nome": "TI"
}
*/

const express = require('express');

const router = express.Router();

const createDBConnection = require('../../db')
const db = createDBConnection()

router.post('/', (req, res) => {
    const {
        nome
    } = req.body

    if (!nome) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios!'
        })
    }

    const departamentoPattern = /^[A-Z][a-zà-ú ]*$/; // regex para que apenas a primeira letra da sentença seja maiuscula

    if (!nome.match(departamentoPattern)) {
        return res.status(400).json({
            message: 'O nome do departamento deve ter apenas a primeira letra da sentença maiuscula'
        })
    }

    const validationDepartamento = "SELECT COUNT(*) AS count FROM departamento WHERE nome = ?";
    db.query(validationDepartamento, [nome], (err, result) => {
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


        const sql = "INSERT INTO departamento (`nome`) VALUES (?)";
        const values = [nome];

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
    const sql = "SELECT departamentoId, nome FROM departamento";
    const values = [req.body.departamentoId, req.body.nome];

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
    const sql = "SELECT departamentoId, nome FROM departamento WHERE departamentoId = ?";
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
        nome
    } = req.body

    if (!nome) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios!'
        })
    }
    const departamentoPattern = /^[A-Z][a-zà-ú ]*$/; // regex para que apenas a primeira letra da sentença seja maiuscula

    if (!nome.match(departamentoPattern)) {
        return res.status(400).json({
            message: 'O nome da departamento deve ter apenas a primeira letra da sentença maiuscula'
        })
    }

    const sql = "UPDATE departamento SET nome = ? WHERE departamentoId = ?";
    const values = [nome, id];

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
    const sql = "DELETE FROM departamento WHERE departamentoId = ?";
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