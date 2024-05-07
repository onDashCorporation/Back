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
        const responseEstoque = await axios.get("http://localhost:3000/estoque");
        listaDados = responseEstoque.data; 
      
      break;
      
      case "controle":
        const responseControle = await axios.get("http://localhost:3000/controle");
        listaDados = responseControle.data;

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
