// URL base de cargo: http://localhost:3000/cargo/
/*
Modelo de inserção de dados para teste no postman: 

{
    "cargo_nome": "microfone"
}
*/

const express = require('express');

const router = express.Router();

const createDBConnection = require('../../db')
const db = createDBConnection() 


router.post('/', (req, res) => {
    const {cargoId } = req.query; 
    const{cargo_nome} = req.body

    if(!cargo_nome){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }

    const cargoPattern = /^[A-Z][a-zà-ú ]*$/; // regex para que apenas a primeira letra da sentença seja maiuscula

    if (!cargo_nome.match(cargoPattern)) {
        return res.status(400).json({ message: 'O nome do cargo deve ter apenas a primeira letra da sentença maiuscula' })
    }
    
    const validationCargo = "SELECT COUNT(*) AS count FROM cargos WHERE cargo_nome = ?";
    db.query(validationCargo, [cargo_nome], (err, result) => {
        if (err) {
             return res.status(500).json({ error: err.message });
         }
        const cargoExists = result[0].count > 0;
            if (cargoExists) {
                return res.status(400).json({ message: 'Esta cargo já está cadastrado' });
            }
            if (cargoId < 1 || cargoId > 3) {
                return res.status(400).json({ message: 'ID de cargo deve estar entre 1 e 3' });
            }

            const sql = "INSERT INTO cargos (`cargo_nome`) VALUES (?)";
            const values = [cargoId, cargo_nome];
            // const values = [cargo_nome];
            
            db.query(sql, values, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({ error: err.message });
                }
                else{
                    res.status(201).json({message: 'Dados inseridos no sistema com sucesso'}) 
                }
        });
    });
});

router.get('/', (req, res) => {
    const sql = "SELECT cargoId, cargo_nome FROM cargos";
    const values = [req.body.cargoId, req.body.cargo_nome];
    
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
        const sql = "SELECT cargoId, cargo_nome FROM cargos WHERE cargoId = ?";
        const values = [id];
     
        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (data.length === 0) {
                return res.status(404).json({ message: 'Cargo não encontrada' });
            }
            res.status(200).json(data[0]);
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const {cargoId } = req.query; 
    const{cargo_nome} = req.body

    if(!cargo_nome){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }

    const cargoPattern = /^[A-Z][a-zà-ú ]*$/; // regex para que apenas a primeira letra da sentença seja maiuscula

    if (!cargo_nome.match(cargoPattern)) {
        return res.status(400).json({ message: 'O nome do cargo deve ter apenas a primeira letra da sentença maiuscula' })
    }
    
    const validationCargo = "SELECT COUNT(*) AS count FROM cargos WHERE cargo_nome = ?";
    const validationCargoId = "SELECT cargoId FROM cargos WHERE cargoId = ?";
    db.query(validationCargo, [cargo_nome], (err, result) => {
        if (err) {
             return res.status(500).json({ error: err.message });
         }
        const cargoExists = result[0].count > 0;
            if (cargoExists) {
                return res.status(400).json({ message: 'Esta cargo já está cadastrada' });
            }
            db.query(validationCargoId, [cargoId], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
    
                if (result.length === 0) {
                    return res.status(400).json({ message: 'ID de cargo inválido' });
                }
    
                const sql = "UPDATE cargos SET cargo_nome = ? WHERE cargoId = ?";
                const values = [nome, id];
                
                    db.query(sql, values, (err, data) => {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }
                        if (data.length === 0) {
                            return res.status(404).json({ message: 'Cargoa não encontrado' });
                        }
                        res.status(200).json({message: 'Dados atualizados do sistema com sucesso'});
            });
        });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
        const sql = "DELETE FROM cargos WHERE cargoId = ?";
        const values = [id];
         
        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (data.length === 0) {
                return res.status(404).json({ message: 'Cargo não encontrado' });
            }
            res.status(200).json({message: 'Dados deletados do sistema com sucesso'});
            });
        });
 
module.exports = router;