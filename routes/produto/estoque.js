// URL base da controle: http://localhost:3000/estoque/
/*
Modelo de inserção de dados para teste no postman: 

{
    "fk_solicId":1
}
*/

const express = require('express');

const router = express.Router();

const createDBConnection = require('../../db')
const db = createDBConnection()

router.post('/', (req, res) => {
    const {
        fk_solicId
    } = req.body

    if (!fk_solicId) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios!'
        })
    }

    const validationSolicitacao = "SELECT COUNT(*) AS count FROM solicitacaoproduto WHERE solicId = ?";
    db.query(validationSolicitacao, [fk_solicId], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        const solicitaçãoExists = result[0].count > 0;
        if (!solicitaçãoExists) {
            return res.status(400).json({
                message: 'Solicitação inválida'
            });
        }

        const sql = "INSERT INTO controle (`fk_solicId`) VALUES (?)";
        const values = [
            fk_solicId
        ];

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
    const sql = "SELECT * FROM view_controle_soli";
    const values = [req.body.fk_solicId];

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
    const sql = "SELECT solicId FROM view_controle_soli WHERE solicId = ?";
    const values = [id];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Controle não encontrado'
            });
        }
        res.status(200).json(data[0]);
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const {
        fk_solicId
    } = req.body

    if (!fk_solicId) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios!'
        })
    }

    const validationSolicitacao = "SELECT COUNT(*) AS count FROM solicitacaoproduto WHERE solicId = ?";
    db.query(validationSolicitacao, [fk_solicId], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        const solicitaçãoExists = result[0].count > 0;
        if (!solicitaçãoExists) {
            return res.status(400).json({
                message: 'Solicitação inválida'
            });
        }

        const sql = "UPDATE controle SET fk_solicId = ? WHERE fk_solicId = ? ";
        const values = [fk_solicId, id];

        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            if (data.length === 0) {
                return res.status(404).json({
                    message: 'Controle não encontrado'
                });
            }
            res.status(200).json({
                message: 'Dados atualizados do sistema com sucesso'
            });
        });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM controle WHERE fk_solicId = ?";
    const values = [id];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Controle não encontrado'
            });
        }
        res.status(200).json({
            message: 'Dados deletados do sistema com sucesso'
        });
    });
});

module.exports = router;