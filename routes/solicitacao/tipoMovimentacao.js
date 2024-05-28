// URL base da movimentação: http://localhost:3000/movimentacao/
/*
Modelo de inserção de dados para teste no postman: 

{
    "tipo": "entrada"
}
*/

const express = require('express');

const router = express.Router();

const createDBConnection = require('../../db')
const db = createDBConnection() 

router.post('/', (req, res) => {
    const{tipo, tmId} = req.body

    if(!tipo){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }
    const tipoPattern = /^[A-Z][a-zà-ú ]*$/; // regex para que apenas a primeira letra da sentença seja maiuscula

    if(tmId > 2 || tmId < 1){
        return res.status(400).json({ message: 'Tipo de movimentação inválido' })
    }
    if (!tipo.match(tipoPattern)) {
        return res.status(400).json({ message: 'O tipo de movimentação deve ter apenas a primeira letra da sentença maiuscula' })
    }
    
    const validationTipo = "SELECT COUNT(*) AS count FROM tipomovi WHERE tipo = ?";
    db.query(validationTipo, [tipo], (err, result) => {
        if (err) {
             return res.status(500).json({ error: err.message });
         }
        const tipoExists = result[0].count > 0;
            if (tipoExists) {
                return res.status(400).json({ message: 'Esse tipo de movimentação já está cadastrado' });
            }


        const sql = "INSERT INTO tipomovi (`tipo`) VALUES (?)";
        const values = [tipo];
    
        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            else{
                res.status(201).json({message: 'Dados inseridos no sistema com sucesso'}) 
            }
        });
    });
});

router.get('/', (req, res) => {
    const sql = "SELECT tmId, tipo FROM tipomovi";
    const values = [req.body.tmId, req.body.tipo];
    
        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            else{
                res.status(201).json(data);
            }
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
        const sql = "SELECT tmId, tipo FROM tipomovi WHERE tmId = ?";
        const values = [id];
     
        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (data.length === 0) {
                return res.status(404).json({ message: 'Tipo de movimentação não encontrado' });
            }
            res.status(200).json(data[0]);
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const{tipo} = req.body

    if(!tipo){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }
    const tipoPattern = /^[A-Z][a-zà-ú ]*$/; // regex para que apenas a primeira letra da sentença seja maiuscula

    if (!tipo.match(tipoPattern)) {
        return res.status(400).json({ message: 'O tipo de movimentação deve ter apenas a primeira letra da sentença maiuscula' })
    }
    
    const sql = "UPDATE tipomovi SET tipo = ? WHERE tmId = ?";
    const values = [tipo, id];
     
        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (data.length === 0) {
                return res.status(404).json({ message: 'Tipo de movimentação não encontrado' });
            }
            res.status(200).json({message: 'Dados atualizados do sistema com sucesso'});
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
        const sql = "DELETE FROM tipomovi WHERE tmId = ?";
        const values = [id];
         
        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (data.length === 0) {
                return res.status(404).json({ message: 'Tipo de movimentação não encontrado' });
            }
            res.status(200).json({message: 'Dados deletados do sistema com sucesso'});
            });
        });
 
module.exports = router;