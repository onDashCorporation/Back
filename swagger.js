const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "ACAI",
      description: "Teste doc",
      termsOfService: "http://localhost:3000/terms",
      contact: {
        email: "ondashequipe@gmail.com",
      },
    },
  },
  //   apis: ["./routes/**/*.js"], // Caminho para os arquivos de rotas
  apis: [
    "./server.js", // Inclua o arquivo server.js
    "./routes/**/*.js", // Inclua todos os arquivos de rota dentro do diretório routes
  ],
};

const specs = swaggerJsdoc(options);
console.log("Rota(s) documentada(s):", specs.apis);


module.exports = { specs };
