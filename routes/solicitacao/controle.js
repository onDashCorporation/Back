// URL base da controle: http://localhost:3000/controle/
/*
Modelo de inserção de dados para teste no postman: 

{
    "fk_solicId":1
}
*/

const express = require('express');
const router = express.Router();
const createDBConnection = require('../../db');
const db = createDBConnection();

router.post('/', (req, res) => {
    const { fk_solicId } = req.body;

    if (!fk_solicId) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios!'
        });
    }
    if (!Number.isInteger(fk_solicId)) {
        return res.status(400).json({
            message: 'Insira o id da categoria como um número inteiro'
        });
    }

    const validationSolicitacao = "SELECT COUNT(*) AS count FROM solicitacaoProd WHERE solicId = ?";
    db.query(validationSolicitacao, [fk_solicId], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        const solicitacaoExists = result[0].count > 0;
        if (!solicitacaoExists) {
            return res.status(400).json({
                message: 'Solicitação inválida'
            });
        }

        const sql = "INSERT INTO controle (`fk_solicId`) VALUES (?)";
        const values = [fk_solicId];

        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            } else {
                res.status(201).json({
                    message: 'Dados inseridos no sistema com sucesso'
                });
            }
        });
    });
});

router.get('/', (req, res) => {
    const sql = "SELECT * FROM view_controle";
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
    const sql = "SELECT controleId, solicId FROM view_controle WHERE controleId = ?";
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

router.get('datas/mes/:month', (req, res) => {
    const mes = parseInt(req.params.month);
    const sql = 'SELECT qtdEntrada, qtdSaida, valor_entrada, cargo_nome FROM view_controle WHERE MONTH(data) = ?';
    const values = [mes]

    db.query(sql, values, (err, data) => {
        if(err){
            return res.status(500).json({
                error: err.message
            })
        }
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Nada correspondente a este mês'
            });
        }
        res.status(200).json(data);
    })
})

router.get('/datas/:day/:month', (req, res) => {
    const mes = parseInt(req.params.month)
    const dia = parseInt(req.params.day);
    const sql = 'SELECT qtdEntrada, qtdSaida, valor_entrada, cargo_nome FROM view_controle WHERE DAY(data) = ? AND MONTH(data) = ?';
    const values = [dia, mes]

    db.query(sql, values, (err, data) => {
        if(err){
            return res.status(500).json({
                error: err.message
            })
        }
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Nada correspondente a esta data'
            });
        }
        res.status(200).json(data);
    })
})

router.get('/datas', (req, res) => {
    const sql = 'SELECT qtdEntrada, qtdSaida, valor_entrada, cargo_nome FROM view_controle ORDER BY data ASC';

    db.query(sql, values, (err, data) => {
        if(err){
            return res.status(500).json({
                error: err.message
            })
        }
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Nada correspondente a esta data'
            });
        }
        res.status(200).json(data);
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { fk_solicId } = req.body;

    if (!fk_solicId) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios!'
        });
    }

    const validationSolicitacao = "SELECT COUNT(*) AS count FROM solicitacaoProd WHERE solicId = ?";
    db.query(validationSolicitacao, [fk_solicId], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        const solicitacaoExists = result[0].count > 0;
        if (!solicitacaoExists) {
            return res.status(400).json({
                message: 'Solicitação inválida'
            });
        }

        const sql = "UPDATE controle SET fk_solicId = ? WHERE controleId = ?";
        const values = [fk_solicId, id];

        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            if (data.affectedRows === 0) {
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
        if (data.affectedRows === 0) {
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
