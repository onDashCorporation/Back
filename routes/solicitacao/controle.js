// URL base da controle: http://localhost:3000/controle/
/*
Modelo de inserção de dados para teste no postman: 

{
    "qtdSaida": 2,
    "qtdEntrada": 1,
    "precoMedio": 400,
    "fk_solicitacaoId":1
}
*/

const express = require('express');

const router = express.Router();

const createDBConnection = require('../../db')
const db = createDBConnection()

router.post('/', (req, res) => {
    const {
        qtdSaida,
        qtdEntrada,
        precoMedio,
        fk_solicitacaoId
    } = req.body

    if (!qtdSaida || !qtdEntrada || !precoMedio || !fk_solicitacaoId) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios!'
        })
    }

    const validationSolicitacao = "SELECT COUNT(*) AS count FROM solicitacaoproduto WHERE solicitacaoId = ?";
    db.query(validationSolicitacao, [fk_solicitacaoId], (err, result) => {
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

        const sql = "INSERT INTO controle (`qtdSaida`, `qtdEntrada`, `precoMedio`, `fk_solicitacaoId`) VALUES (?, ?, ?, ?)";
        const values = [
            qtdSaida,
            qtdEntrada,
            precoMedio,
            fk_solicitacaoId
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
    const sql = "SELECT qtdSaida, qtdEntrada, precoMedio, fk_solicitacaoId FROM controle";
    const values = [req.body.qtdSaida, req.body.qtdEntrada, req.body.precoMedio, req.body.fk_solicitacaoId];

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
    const sql = "SELECT qtdSaida, qtdEntrada, precoMedio, fk_solicitacaoId FROM controle WHERE controleId = ?";
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
        qtdSaida,
        qtdEntrada,
        precoMedio,
        fk_solicitacaoId
    } = req.body

    if (!qtdSaida || !qtdEntrada || !precoMedio || !fk_solicitacaoId) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios!'
        })
    }

    const validationSolicitacao = "SELECT COUNT(*) AS count FROM solicitacaoproduto WHERE solicitacaoId = ?";
    db.query(validationSolicitacao, [fk_solicitacaoId], (err, result) => {
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

        const sql = "UPDATE controle SET qtdSaida = ?, qtdEntrada = ?, precoMedio = ?, fk_solicitacaoId = ? WHERE controleId = ?";
        const values = [qtdSaida, qtdEntrada, precoMedio, fk_solicitacaoId, id];

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
    const sql = "DELETE FROM controle WHERE controleId = ?";
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