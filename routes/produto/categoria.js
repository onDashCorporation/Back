// URL base da categoria: http://localhost:3000/categoria/
/*
Modelo de inserção de dados para teste no postman: 

{
    "nome_categoria": "microfone"
}
*/

const express = require('express');

const router = express.Router();

const createDBConnection = require('../../db')
const db = createDBConnection() 

router.post('/', (req, res) => {
    const{nome_categoria} = req.body

    if(!nome_categoria){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }

    const categoriaPattern = /^[A-Z][a-zà-ú ]*$/; // regex para que apenas a primeira letra da sentença seja maiuscula

    if (!nome_categoria.match(categoriaPattern)) {
        return res.status(400).json({ message: 'O nome da categoria deve ter apenas a primeira letra da sentença maiuscula' })
    }
    

    const validationCategoria = "SELECT COUNT(*) AS count FROM categoria WHERE nome_categoria = ?";
    db.query(validationCategoria, [nome_categoria], (err, result) => {
        if (err) {
             return res.status(500).json({ error: err.message });
         }
        const categoriaExists = result[0].count > 0;
            if (categoriaExists) {
                return res.status(400).json({ message: 'Esta categoria já está cadastrada' });
            }


        const sql = "INSERT INTO categoria (`nome_categoria`) VALUES (?)";
        const values = [nome_categoria];
    
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
    const sql = "SELECT cateId, nome_categoria FROM categoria";
    const values = [req.body.cateId, req.body.nome_categoria];
    
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
        const sql = "SELECT cateId, nome_categoria FROM categoria WHERE cateId = ?";
        const values = [id];
     
        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (data.length === 0) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            res.status(200).json(data[0]);
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const{ nome_categoria } = req.body

    if(!nome_categoria){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }
    const categoriaPattern = /^[A-Z][a-zà-ú ]*$/; // regex para que apenas a primeira letra da sentença seja maiuscula

    if (!nome_categoria.match(categoriaPattern)) {
        return res.status(400).json({ message: 'O nome da categoria deve ter apenas a primeira letra da sentença maiuscula' })
    }
    
    
    const sql = "UPDATE categoria SET nome_categoria = ? WHERE cateId = ?";
    const values = [nome_categoria, id];
     
        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (data.length === 0) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            res.status(200).json({message: 'Dados atualizados do sistema com sucesso'});
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
        const sql = "DELETE FROM categoria WHERE cateId = ?";
        const values = [id];
         
        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (data.length === 0) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            res.status(200).json({message: 'Dados deletados do sistema com sucesso'});
            });
        });
 
module.exports = router;