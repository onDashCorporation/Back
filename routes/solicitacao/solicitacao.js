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
    fk_qtdItemId
  } = req.body;

  if (!fk_tipoMoviId || fk_usuarioId || fk_qtdItemId) {
    return res.status(400).json({
      message: 'Todos os campos são obrigatórios!'
    })
  }
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

      const sql = "INSERT INTO solicitacaoproduto (`data`, `qtdEntrada`,`qtdSaida`, `fk_tipoMoviId`,`fk_usuarioId`, `fk_qtdItemId`) VALUES (?, ?, ?, ?, ?, ?)"

      const values = [
        today,
        qtdEntrada,
        qtdSaida,
        fk_tipoMoviId,
        fk_usuarioId,
        fk_qtdItemId
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