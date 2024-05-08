/* 
URL base do Excel: 
    http://localhost:3000/excel/estoque
    http://localhost:3000/excel/controle

*/


const router = require("express").Router();
const gerarExcel = require("../../controller/excel");
const axios = require("axios");


router.get("/:tabela", async (req, res) => {
  try {
    // Adicione sua lista de dados
    let listaDados = [];

    switch (req.params.tabela) {

      case "estoque":
        // const responseEstoque = await axios.get("http://localhost:3000/estoque");
        // listaDados = responseEstoque.data; 
        
        // try {
        //   const responseEstoque = await axios.get("http://localhost:3000/estoque");
        //   listaDados = responseEstoque.data.map(item => {
        //     const { foto, ...rest } = item;
        //     return rest;
        //   });
        // } catch (err) {
        //   console.error("Erro ao obter dados de estoque:", err);
        // }

        try {
          const responseEstoque = await axios.get("http://localhost:3000/estoque");
          listaDados = responseEstoque.data.map(item => {
            return {
              "Quantidade Total": item.qtdeTotal,
              "Nome da Categoria": item.nome_categoria,
              "Nome do Item": item.nome_item,
              "Quantidade Mínima": item.qtdMin,
              "Quantidade": item.qtde,
              "Valor do Item": item.valorItem
            };
          });
        } catch (err) {
          console.error("Erro ao obter dados de estoque:", err);
        }
      
      break;
      
      case "controle":
        // const responseControle = await axios.get("http://localhost:3000/controle");
        // listaDados = responseControle.data;

        try {
          const responseEstoque = await axios.get("http://localhost:3000/controle");
          listaDados = responseEstoque.data.map(control => {
            return {
              "Solicitação": control.solicId,
              "Data": control.data,
              "Quantidade de Entrada": control.qtdEntrada,
              "Quantidade de Saída": control.qtdSaida,
              "Valor Entrada": control.valor_entrada,
              "Status": control.status,
              "Nome do Usuário": control.usuNome,
              "Cargo": control.cargo_nome
            };
          });
        } catch (err) {
          console.error("Erro ao obter dados de estoque:", err);
        }

      break;

      default:
        break;
    }

    // Verifica se a lista ta vazia e devolve erro
    if (!!listaDados[0] == false) {
      res.status(404).json({ errado: "sim" });
    }

    const response = await gerarExcel(listaDados);
    // Define os cabeçalhos para informar que estamos devolvendo um buffer de um arquivo.

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=relatorio.xlsx");

    res.send(response);
  } catch (err) {
    res.status(500).json({
      msg: "Erro ao tentar gerar relatório",
      statusMsg: 500,
      errMsg: err.message,
    });
  }
});

module.exports = router;
