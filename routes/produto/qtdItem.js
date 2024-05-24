// URL base do produto: http://localhost:3000/qtdItem/
/*
Modelo de inserção de dados para teste no postman: 

{
    "item_fk": 2
    "qtd"
:10}
*/

const express = require('express');

const router = express.Router();

const createDBConnection = require('../../db')
const db = createDBConnection()

router.post('/', (req, res) => {
    const {
        fk_cadItemId,
        qtde,
        valorItem
    } = req.body

    if (!fk_cadItemId || !qtde || !valorItem) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios!'
        })
    }

    if (!Number.isInteger(fk_cadItemId)) {
        return res.status(400).json({
            message: 'Insira o id do item como um número inteiro'
        });
    }
    if (!Number.parseFloat(fk_cadItemId)) {
        return res.status(400).json({
            message: 'Insira o id do item como um número inteiro'
        });
    }

    if (qtde < 0) {
        return res.status(400).json({
            message: 'Insira um valor válido para quantidade'
        })
    }
    if (!Number.parseFloat(valorItem)) {
        return res.status(400).json({
            message: 'O valor do item deve entrar como Float'
        });
    }
    if (valorItem < 0) {
        return res.status(400).json({
            message: 'Insira um valor válido o preço do item'
        })
    }
    const validationItem = "SELECT COUNT(*) AS count FROM cadastroitem WHERE cadItemId  = ?";
    db.query(validationItem, [fk_cadItemId], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        const produtoExists = result[0].count > 0;
        if (!produtoExists) {
            return res.status(400).json({
                message: "Item invalido"
            });
        }

        const sql = "INSERT INTO qtditem (`fk_cadItemId`, `qtde`, `valorItem`) VALUES (?, ?, ?)";
        const values = [fk_cadItemId, qtde, valorItem];

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
    const sql = "SELECT qtdItemId, fk_cadItemId, qtde, valorItem FROM qtditem";
    const values = [req.body.qtdItemId, req.body.fk_cadItemId, req.body.fk_qtde, req.body.fk_valorItem];

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

// NOVA ROTA
router.get('/cadItem', (req, res) => {
    const sql =  `
    SELECT
    c.fk_categoriaId,
    q.fk_cadItemId, 
    q.qtdItemId, 
    c.foto,
    c.nome_item,
    cat.nome_categoria,
    c.qtdMin,
    q.qtde, 
    q.valorItem
    FROM qtditem q
    INNER JOIN cadastroItem c ON q.fk_cadItemId = c.cadItemId
    INNER JOIN categoria cat ON cat.cateId = c.fk_categoriaId;
    ` 
    const values = [req.body.qtdItemId, req.body.fk_cadItemId, req.body.qtde, req.body.valorItem, req.body.foto, req.body.nome_item, req.body.qtdMin, req.body.fk_categoriaId];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        } else {
            if (data.length > 0) {
                res.status(200).json(data); 
            } else {
                res.status(404).json({ error: "Item não encontrado" });
            }
        }
    });
});

//Não deu certo
// router.post('/cadItem', (req, res) => {
//     const sql =  `
//     SELECT
//     c.fk_categoriaId,
//     q.fk_cadItemId, 
//     q.qtdItemId, 
//     c.foto,
//     c.nome_item,
//     cat.nome_categoria,
//     c.qtdMin,
//     q.qtde, 
//     q.valorItem
//     FROM qtditem q
//     INNER JOIN cadastroItem c ON q.fk_cadItemId = c.cadItemId
//     INNER JOIN categoria cat ON cat.cateId = c.fk_categoriaId;
//     ` 
//     const values = [req.body.qtdItemId, req.body.fk_cadItemId, req.body.qtde, req.body.valorItem, req.body.foto, req.body.nome_item, req.body.qtdMin, req.body.fk_categoriaId];

//     db.query(sql, values, (err, data) => {
//         if (err) {
//             return res.status(500).json({
//                 error: err.message
//             });
//         } else {
//             res.status(200).json(data); 
//         }
//     });
// });

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT qtdItemId, fk_cadItemId, qtde, valorItem FROM qtditem WHERE qtdItemId = ?";
    const values = [id];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Item não encontrado'
            });
        }
        res.status(200).json(data[0]);
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const {
        fk_cadItemId,
        qtde,
        valorItem
    } = req.body

    if (!fk_cadItemId || !qtde || !valorItem) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios!'
        })
    }

    if (!Number.isInteger(fk_cadItemId)) {
        return res.status(400).json({
            message: 'Insira o id do item como um número inteiro'
        });
    }
    if (!Number.parseFloat(fk_cadItemId)) {
        return res.status(400).json({
            message: 'Insira o id do item como um número inteiro'
        });
    }

    if (qtde < 0) {
        return res.status(400).json({
            message: 'Insira um valor válido para quantidade'
        })
    }
    if (!Number.parseFloat(valorItem)) {
        return res.status(400).json({
            message: 'O valor do item deve entrar como Float'
        });
    }
    if (valorItem < 0) {
        return res.status(400).json({
            message: 'Insira um valor válido o preço do item'
        })
    }
    const validationItem = "SELECT COUNT(*) AS count FROM cadastroitem WHERE cadItemId  = ?";
    db.query(validationItem, [fk_cadItemId], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        const produtoExists = result[0].count > 0;
        if (!produtoExists) {
            return res.status(400).json({
                message: "Item invalido"
            });
        }


        const sql = "UPDATE qtditem SET fk_cadItemId = ?, qtde = ?, valorItem = ? WHERE qtdItemId = ?";
        const values = [fk_cadItemId, qtde, valorItem, id];

        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            if (data.length === 0) {
                return res.status(404).json({
                    message: 'Item não encontrado'
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
    const sql = "DELETE FROM qtditem WHERE qtdItemId = ?";
    const values = [id];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Item não encontrado'
            });
        }
        res.status(200).json({
            message: 'Dados deletados do sistema com sucesso'
        });
    });
});

module.exports = router;