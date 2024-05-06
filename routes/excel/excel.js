const router = require("express").Router();
const gerarExcel = require("../../controller/excel");
const fetch = require("node-fetch");

// const {
//   dadosReais,
//   dadosMockados,
//   dadosMockados2,
// } = require("../../database/dadoMockado");

// const URL = "http://localhost:3000/"
// URL = await (await fetch("http://localhost:3000/")).json();
// const{
//   estoque, 
//   controle
// } = require(URL)

// const{
//   estoque, 
//   controle
// } = require($.getJSON("http://localhost:3000/"))

// $.getJSON("http://destiny.trade/JSON/sortieRewards_f.json", function(result){
//   const{
//     estoque, 
//     controle
//   }
// });

// fetch("http://localhost:3000/")
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
    
//     })


router.get("/:tabela", async (req, res) => {
  try {
    // Adicione sua lista de dados
    let listaDados = [];

    switch (req.params.tabela) {
    //   case "dadosReais":
    //     listaDados = dadosReais;

    //     break;
    //   case "dadosMockados":
    //     listaDados = dadosMockados;
      case "estoque":
        const responseEstoque = await fetch("http://localhost:3000/estoque")
        listaDados = await responseEstoque.json();
      break;
      
      case "controle":
        const responseControle = await fetch("http://localhost:3000/estoque")
        listaDados = await responseControle.json();
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
