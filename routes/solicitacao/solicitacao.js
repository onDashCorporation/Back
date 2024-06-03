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
const today = dataAtual.toISOString().split('T')[0];

const axios = require("axios");
const dotenv = require('dotenv')
dotenv.config()

router.post("/", async (req, res) => {
  const {
    fk_tipoMoviId,
    fk_usuarioId,
    status,
    itens,
    valor_entrada
  } = req.body;

  if (!fk_usuarioId || !itens || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({
      message: 'Todos os campos são obrigatórios, e itens devem ser uma lista com pelo menos um item!'
    });
  }

  if (!status) {
    status = "Novo";
  } else {
    const statusPattern = /^[A-Z][a-zà-ú ]*$/;
    if (!status.match(statusPattern)) {
      return res.status(400).json({
        message: 'O status deve ter apenas a primeira letra da sentença maiúscula'
      });
    }
    const statusOptions = ["Novo", "Lido", "Autorizado"];
    if (!statusOptions.includes(status)) {
      return res.status(400).json({
        message: 'Status inválido. Os status possíveis são: Novo, Lido, Autorizado'
      });
    }
  }

  const new_fk_tipoMoviId = parseInt(fk_tipoMoviId);
  const new_fk_usuarioId = parseInt(fk_usuarioId);

  if (!Number.isInteger(new_fk_tipoMoviId) || !Number.isInteger(new_fk_usuarioId)) {
    return res.status(400).json({
      message: 'Insira os IDs como um número inteiro'
    });
  }

  const validationUsuario = "SELECT COUNT(*) AS count FROM usuarios WHERE usuId = ?";
  db.query(validationUsuario, [new_fk_usuarioId], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }
    const usuarioExists = result[0].count > 0;
    if (!usuarioExists) {
      return res.status(400).json({
        message: "Usuário inválido"
      });
    }

    // Validate each fk_cadItemId before proceeding
    const itemIds = itens.map(item => item.fk_cadItemId);
    const validationItems = "SELECT cadItemId FROM cadastroItem WHERE cadItemId IN (?)";
    db.query(validationItems, [itemIds], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      const validItemIds = results.map(row => row.cadItemId);
      const invalidItemIds = itemIds.filter(id => !validItemIds.includes(id));

      if (invalidItemIds.length > 0) {
        return res.status(400).json({
          message: `Itens inválidos: ${invalidItemIds.join(", ")}`
        });
      }

      const sql = "INSERT INTO solicitacaoProd (`data`, `fk_tipoMoviId`, `fk_usuarioId`, `status`, valor_entrada) VALUES (?, ?, ?, ?, ?)";
      const values = [today, new_fk_tipoMoviId, new_fk_usuarioId, status, valor_entrada];

      db.query(sql, values, (err, data) => {
        if (err) {
          return res.status(500).json({
            error: err.message
          });
        } else {
          const fk_solicId = data.insertId;
          const listaProdutosSQL = "INSERT INTO lista_produtos (fk_cadItemId, qtde, fk_solicId) VALUES ?";
          const listaProdutosValues = itens.map(item => [item.fk_cadItemId, item.qtde, fk_solicId]);

          db.query(listaProdutosSQL, [listaProdutosValues], (err) => {
            if (err) {
              return res.status(500).json({
                error: err.message
              });
            }

            axios.post(process.env.CLIENT_URL + "/controle", {
              fk_solicId: fk_solicId
            })
            .then(response => {
              console.log("Dados inseridos no controle com sucesso");
            })
            .catch(error => {
              console.error("Erro ao inserir dados no controle:", error);
            });

            res.status(201).json({
              message: 'Dados inseridos no sistema com sucesso'
            });
          });
        }
      });
    });
  });
});


router.get('/', (req, res) => {
  const sqlSolicitacoes = `
    SELECT solicId, data, fk_tipoMoviId, fk_usuarioId, status, valor_entrada 
    FROM solicitacaoProd
  `;

  const sqlItens = `
    SELECT fk_solicId, fk_cadItemId, qtde 
    FROM lista_produtos
  `;

  db.query(sqlSolicitacoes, (err, solicitacoesData) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (solicitacoesData.length === 0) {
      return res.status(404).json({ message: 'Nenhuma solicitação encontrada' });
    }

    db.query(sqlItens, (err, itensData) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const itensMap = {};
      itensData.forEach(item => {
        const { fk_solicId, fk_cadItemId, qtde } = item;
        if (!itensMap[fk_solicId]) {
          itensMap[fk_solicId] = [];
        }
        itensMap[fk_solicId].push({ fk_cadItemId, qtde });
      });

      const solicitacoes = solicitacoesData.map(solicitacao => {
        return {
          ...solicitacao,
          itens: itensMap[solicitacao.solicId] || []
        };
      });

      res.status(200).json(solicitacoes);
    });
  });
});

// Pega uma a solicitação baseado no ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT solicId, data, fk_tipoMoviId, fk_usuarioId, fk_cadItemId, status, valor_entrada FROM solicitacaoProd WHERE solicId = ?";
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

// Pega uma a solicitação baseado no ID do usuario
router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = "SELECT solicId, data, fk_tipoMoviId, fk_usuarioId, fk_cadItemId, status, valor_entrada FROM solicitacaoProd WHERE fk_usuarioId = ?";
  const values = [userId];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }
    if (data.length === 0) {
      return res.status(404).json({
        message: 'Nenhuma solicitação encontrada para este usuário'
      });
    }
    res.status(200).json(data);
  });
});


// Pega uma a solicitação baseado no ID do tipo de movimentação
router.get('/tipoMovi/:tmId', (req, res) => {
  const tmId = req.params.tmId;
  const sql = "SELECT fk_tipoMoviId, solicId, data, fk_usuarioId, Id, fk_cadItemId, status, valor_entrada FROM solicitacaoProd WHERE fk_tipoMoviId = ?";
  const values = [tmId];
  let qtdMovimetacao = 0

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    qtdMovimetacao = data.length; 
    if (qtdMovimetacao === 0) {
      return res.status(404).json({
        message: 'Nenhuma solicitação encontrada para este usuário'
      });
    }
    res.status(200).json({
      movimetacoes: data,
      countador: qtdMovimetacao 
    });
  });
});

// Pega o item (cadastro e quantidade) baseado no id da solicitação
// router.get('/item/:solicId', (req, res) => {
//   const solicId = req.params.solicId;
//   const sql = `
//     SELECT s.solicId, 
//             s.fk_tipoMoviId, 
//             s.fk_usuarioId, 
//             s.Id,
//             c.fk_categoriaId,
//             c.cadItemId,
//             c.nome_item,   
//             cat.nome_categoria,
//             c.qtdMin,
//             s.qtdEntrada, 
//             s.qtdSaida, 
//             s.status, 
//             s.valor_entrada,
//             s.data
//     FROM solicitacaoProd s
//     INNER JOIN qtditem q ON s.Id = q.qtdItemId
//     INNER JOIN cadastroItem c ON q.fk_cadItemId = c.cadItemId
//     INNER JOIN categoria cat ON cat.cateId = c.fk_categoriaId
//     WHERE s.solicId = ?`;

//   db.query(sql, [solicId], (err, data) => {
//     if (err) {
//       return res.status(500).json({
//         error: err.message
//       });
//     }
//     if (data.length === 0) {
//       return res.status(404).json({
//         message: 'Solicitação não encontrada'
//       });
//     }
//     res.status(200).json(data[0]);
//   });

// Pega o item (cadastro e quantidade) baseado no id da solicitação
router.get('/item/:solicId', (req, res) => {
  const solicId = req.params.solicId;
  const sql = `
    SELECT s.solicId, 
            s.fk_tipoMoviId, 
            s.fk_usuarioId, 
            s.Id,
            c.fk_categoriaId,
            c.cadItemId,
            c.nome_item,   
            cat.nome_categoria,
            c.qtdMin, 
            s.status, 
            s.valor_entrada,
            s.data
    FROM solicitacaoProd s
    INNER JOIN qtditem q ON s.Id = q.qtdItemId
    INNER JOIN cadastroItem c ON q.fk_cadItemId = c.cadItemId
    INNER JOIN categoria cat ON cat.cateId = c.fk_categoriaId
    WHERE s.solicId = ?`;

  db.query(sql, [solicId], (err, data) => {
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
    res.status(200).json(data);
  });
});

router.get('/teste/:solicId', (req, res) => {
  const solicId = req.params.solicId;
  const sql = `
    SELECT s.solicId, 
            s.fk_tipoMoviId, 
            s.fk_usuarioId, 
            s.Id,
            c.fk_categoriaId,
            c.cadItemId,
            c.nome_item,   
            cat.nome_categoria,
            c.qtdMin,
            s.qtdEntrada, 
            s.qtdSaida, 
            s.status, 
            s.valor_entrada,
            s.data
    FROM solicitacaoProd s
    INNER JOIN qtditem q ON s.Id = q.qtdItemId
    INNER JOIN cadastroItem c ON q.fk_cadItemId = c.cadItemId
    INNER JOIN categoria cat ON cat.cateId = c.fk_categoriaId
    WHERE s.solicId = ?`;

  db.query(sql, [solicId], (err, data) => {
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
    res.status(200).json(data);
  });
});


// Altera uma solicitação baseado no ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  let {
    qtdEntrada,
    qtdSaida,
    fk_tipoMoviId,
    fk_usuarioId,
    fk_cadItemId,
    Id,
    status,
    valor_entrada
  } = req.body;

  console.log(status)

  if (!fk_usuarioId || !Id) {
    return res.status(400).json({
      message: 'Todos os campos são obrigatórios!'
    })
  }

  if (!status) {
    status = "novo";
  } else {
    status = req.body.status;
  }
  console.log("status", status)

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
    qtdSaida = 0
  }

  if (qtdSaida && !qtdEntrada) {
    qtdEntrada = 0
    valor_entrada = 0
  }

  if (qtdEntrada > 0) {
    fk_tipoMoviId = 1
  }
  if (qtdSaida > 0) {
    fk_tipoMoviId = 2
  }

  if (!fk_cadItemId) {
    try {
      const getCadItemId = "SELECT fk_cadItemId FROM qtditem WHERE qtdItemId = ?";
      const [rows] = await db.promise().query(getCadItemId, [Id]);
      if (rows.length === 0) {
        return res.status(400).json({
          message: "Item inválido (qtd)"
        });
      }
      fk_cadItemId = rows[0].fk_cadItemId;
    } catch (err) {
      return res.status(500).json({
        error: err.message
      });
    }
  }

  console.log(fk_cadItemId)
  console.log(typeof fk_cadItemId)

  const new_fk_tipoMoviId = parseInt(fk_tipoMoviId)
  const new_fk_usuarioId = parseInt(fk_usuarioId)
  const new_Id = parseInt(Id)
  const new_fk_cadItemId = parseInt(fk_cadItemId)


  if (!Number.isInteger(new_fk_tipoMoviId) || !Number.isInteger(new_fk_usuarioId) || !Number.isInteger(new_Id) || !Number.isInteger(new_fk_cadItemId)) {
    return res.status(400).json({
      message: 'Insira os IDs como um número inteiro'
    });
  }

  const validationUsuario = "SELECT COUNT(*) AS count FROM usuarios WHERE usuId = ?";
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

    const validationQtdProduto = "SELECT COUNT(*) AS count FROM qtditem WHERE qtdItemId = ?";
    db.query(validationQtdProduto, [new_Id], (err, result) => {
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
      const validationProduto = "SELECT COUNT(*) AS count FROM qtditem WHERE fk_cadItemId = ?";
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
        const validationValorEntrada = qtdEntrada > 0 && valor_entrada <= 0;
        if (validationValorEntrada) {
          return res.status(400).json({
            message: "Valor Inválido"
          });
        }

        const sql = "UPDATE solicitacaoProd SET data = ?, qtdEntrada = ?, qtdSaida = ?, fk_tipoMoviId = ?, fk_usuarioId = ?, Id = ?, status =?, valor_entrada = ? WHERE solicId = ?";
        const values = [
          today,
          qtdEntrada,
          qtdSaida,
          new_fk_tipoMoviId,
          new_fk_usuarioId,
          new_Id,
          status,
          valor_entrada,
          id
        ];

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
          // res.status(200).json({
          //   message: 'Dados atualizados do sistema com sucesso'
          // });
          axios.put(`${process.env.CLIENT_URL}/controle/${id}`, {
              fk_solicId: id
            })
            .then(response => {
              console.log("Dados atualizados no controle com sucesso");
            })
            .catch(error => {
              console.error("Erro ao atualizar dados no controle:", error);
            });

          res.status(200).json({
            message: 'Dados atualizados no sistema com sucesso'
          });
        });
      });
    });
  });
});

// Altera apenas o status da solicitação baseado no ID
router.put('/status/:id', (req, res) => {
  const id = req.params.id;
  let {
    status
  } = req.body;

  if (!status) {
    return res.status(400).json({
      message: 'O campo status é obrigatório'
    });
  }

  // Validação do status
  const statusOptions = ["Novo", "Lido", "Autorizado"];
  if (!statusOptions.includes(status)) {
    return res.status(400).json({
      message: 'Status inválido. Os status possíveis são: Novo, Lido, Autorizado'
    });
  }

  const sql = "UPDATE solicitacaoProd SET status = ? WHERE solicId = ?";
  const values = [status, id];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({
        message: 'Solicitação não encontrada'
      });
    }
    res.status(200).json({
      message: 'Status atualizado com sucesso'
    });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM solicitacaoProd WHERE solicId = ?";
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

module.exports = router