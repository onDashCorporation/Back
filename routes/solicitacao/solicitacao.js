// Rota para lidar com a inserção de uma nova solicitação

// URL base da solicitação do produto: http://localhost:3000/solicitacao/
/*
Modelo para testes no postman: 

{
  "fk_produtoId": 1,
  "qtd": 50,
  "preco": 550,
  "fk_tipoMoviId": 2,
  "fk_usuarioId": 2,
}
*/

//Nome do banco no Xampp: signup (aí é só importar o login lá que já funciona)

const express = require('express');

const router = express.Router();

const createDBConnection = require('../../db')
const db = createDBConnection()

const dataAtual = new Date();
const today = dataAtual.getDate();

router.post("/", async (req, res) => {
      const {
        qtdEntrada,
        qtdSaida,
        fk_tipoMoviId,
        fk_usuarioId,
        fk_qtdItemId,
        fk_cadItemId,
        status
      } = req.body;

      if (!fk_usuarioId || !fk_qtdItemId || !fk_cadItemId) {
        return res.status(400).json({
          message: 'Todos os campos são obrigatórios!'
        })
      }

      if (!status) {
       const new_status = "novo";
        let status = new_status ;
      }
      console.log(status)

      if (!qtdEntrada && !qtdSaida) {
        return res.status(400).json({
          message: 'Quantidade obrigatória'
        })
      }

      if (qtdEntrada && qtdSaida) {
        return res.status(400).json({
          message: 'Apenas uma quantidade deve ser especificada!'
        })
      }
      if (qtdEntrada && !qtdSaida) {
        const new_qtdSaida = 0
        // req.body.qtdSaida = 0;
        let qtdSaida = new_qtdSaida 
      }

      if (qtdSaida && !qtdEntrada) {
        // req.body.qtdEntrada = 0;
        qtdEntrada = 0
      }

      if (qtdEntrada > 0) {
        //   req.body.fk_tipoMoviId == 1;
        const new_fk_tipoMoviId = 1
        let fk_tipoMoviId = new_fk_tipoMoviId
        }
        if (qtdSaida > 0) {
          // req.body.fk_tipoMoviId == "2";
          fk_tipoMoviId = 2
        }
        const new_fk_tipoMoviId = parseInt(fk_tipoMoviId)
        const new_fk_usuarioId = parseInt(fk_usuarioId)
        const new_fk_qtdItemId = parseInt(fk_qtdItemId)
        const new_fk_cadItemId = parseInt(fk_cadItemId)

        console.log(typeof new_fk_cadItemId)
        console.log(typeof new_fk_tipoMoviId)
        console.log(typeof new_fk_usuarioId)
        console.log(typeof new_fk_cadItemId)
        console.log(new_fk_cadItemId)
        console.log(new_fk_tipoMoviId)
        console.log(new_fk_usuarioId)
        console.log(new_fk_cadItemId)

        if (!Number.isInteger(new_fk_tipoMoviId) || !Number.isInteger(new_fk_usuarioId) || !Number.isInteger(new_fk_qtdItemId) || !Number.isInteger(new_fk_cadItemId)) {
          return res.status(400).json({
            message: 'Insira os IDs como um número inteiro'
          });
        }

        const validationUsuario = "SELECT usuarioId FROM usuarios WHERE usuarioId = ?";
        db.query(validationUsuario, [new_fk_usuarioId], (err, result) => {
          if (err) {
            return res.status(500).json({
              error: err.message
            });
          }
          const usuarioExists = result[0].count > 0;
          if (!usuarioExists) {
            return res.status(400).json({
              message: "Usuário invalido"
            });
          }

          const validationQtdProduto = "SELECT COUNT(*) AS count FROM qtdItem WHERE qtdItem_id = ?";
          db.query(validationQtdProduto, [new_fk_qtdItemId], (err, result) => {
            if (err) {
              return res.status(500).json({
                error: err.message
              });
            }
            const qtdProdutoExists = result[0].count > 0;
            if (!qtdProdutoExists) {
              return res.status(400).json({
                message: "Item invalido (qtd)"
              });
            }
            const validationProduto = "SELECT COUNT(*) AS count FROM cqtditem WHERE fk_cadItemId = ?";
            db.query(validationProduto, [new_fk_cadItemId], (err, result) => {
              if (err) {
                return res.status(500).json({
                  error: err.message
                });
              }
              const qtdProdutoExists = result[0].count > 0;
              if (!qtdProdutoExists) {
                return res.status(400).json({
                  message: "Item invalido (cad)"
                });
              }

              const sql = "INSERT INTO solicitacaoproduto (`data`, `qtdEntrada`,`qtdSaida`, `fk_tipoMoviId`,`fk_usuarioId`, `fk_qtdItemId`, `fk_cadItemId`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

              const values = [
                today,
                qtdEntrada,
                qtdSaida,
                new_fk_tipoMoviId,
                new_fk_usuarioId,
                new_fk_qtdItemId,
                new_fk_cadItemId,
                status
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
          })
        })
      })


    router.get('/', (req, res) => {
      const sql = "SELECT solicId, data, qtdEntrada, qtdSaida, fk_tipoMoviId, fk_usuarioId, fk_qtdItemId FROM solicitacaoproduto";
      const values = [req.body.solicId, req.body.data, req.body.qtdEntrada, req.body.qtdSaida, req.body.fk_tipoMoviId, req.body.fk_usuarioId, req.body.fk_qtdItemId];

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
      const sql = "SELECT solicId, data, qtdEntrada, qtdSaida, fk_tipoMoviId, fk_usuarioId, fk_qtdItemId FROM solicitacaoproduto WHERE solicId = ?";
      const values = [id];

      db.query(sql, values, (err, data) => {
        if (err) {
          return res.status(500).json({
            error: err.message
          });
        }
        if (data.length === 0) {
          return res.status(404).json({
            message: 'Solicitação não encontrada'
          });
        }
        res.status(200).json(data[0]);
      });
    });

    router.put('/:id', (req, res) => {
      const id = req.params.id;
      const {
        qtdEntrada,
        qtdSaida,
        fk_tipoMoviId,
        fk_usuarioId,
        fk_qtdItemId
      } = req.body;

      if (!fk_tipoMoviId || fk_usuarioId || fk_qtdItemId) {
        return res.status(400).json({
          message: 'Todos os campos são obrigatórios!'
        })
      }
      if (!qtdEntrada && !qtdSaida) {
        return res.status(400).json({
          message: 'A quantidade é obrigatória!'
        })
      }

      if (qtdEntrada && qtdSaida) {
        return res.status(400).json({
          message: 'Apenas uma quantidade deve ser especificada!'
        })
      }

      if (qtdEntrada && !qtdSaida) {
        req.body.qtdSaida = 0;
      }

      if (qtdSaida && !qtdEntrada) {
        req.body.qtdEntrada = 0;
      }

      const validationUsuario = "SELECT usuarioId FROM usuarios WHERE usuarioId = ?";
      db.query(validationUsuario, [fk_usuarioId], (err, result) => {
        if (err) {
          return res.status(500).json({
            error: err.message
          });
        }
        const usuarioExists = result[0].count > 0;
        if (!usuarioExists) {
          return res.status(400).json({
            message: "Usuário invalido"
          });
        }

        const validationProduto = "SELECT COUNT(*) AS count FROM qtdItem WHERE qtdItem_id = ?";
        db.query(validationProduto, [fk_qtdItemId], (err, result) => {
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

          const sql = "UPDATE solicitacaoproduto SET data = ?, qtdEntrada = ?, qtdSaida = ?, fk_tipoMoviId = ?, fk_usuarioId = ?, fk_qtdItemId = ? WHERE solicId = ?";
          const values = [today, qtdEntrada, qtdSaida, fk_tipoMoviId, fk_usuarioId, fk_qtdItemId, id];

          db.query(sql, values, (err, data) => {
            if (err) {
              return res.status(500).json({
                error: err.message
              });
            }
            if (data.length === 0) {
              return res.status(404).json({
                message: 'Solicitação não encontrada'
              });
            }
            res.status(200).json({
              message: 'Dados atualizados do sistema com sucesso'
            });
          });
        });
      });
    });

    router.delete('/:id', (req, res) => {
      const id = req.params.id;
      const sql = "DELETE FROM solicitacaoproduto WHERE solicId = ?";
      const values = [id];

      db.query(sql, values, (err, data) => {
        if (err) {
          return res.status(500).json({
            error: err.message
          });
        }
        if (data.length === 0) {
          return res.status(404).json({
            message: 'Solicitacao não encontrada'
          });
        }
        res.status(200).json({
          message: 'Dados deletados do sistema com sucesso'
        });
      });
    });

    module.exports = router;