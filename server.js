
const express = require('express')
const cors = require('cors')

const createDBConnection = require('./db')

const db = createDBConnection() 

const app = express()

app.use(cors())

app.use(express.json())

const dotenv = require('dotenv')
dotenv.config()

app.use(express.urlencoded({extended: true}))

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida.');
});

// db.query("SELECT id, name, email, password FROM login", function (err, rows, fields) {
//     if (!err) {
//         console.log("Resultado:", rows);
//     } else {
//         console.log('Erro: Consulta não realizada com sucesso!', err);
//     }
// });

const signupRoutes = require('./routes/login/signup')
app.use('/signup', signupRoutes)

const loginRotes = require('./routes/login/login')
app.use('/login', loginRotes)

const logoutRotes = require('./routes/login/logout')
app.use('/logout', logoutRotes)

const forgotPasswordRoutes = require('./routes/login/forgotPassword'); 
app.use('/forgot-password', forgotPasswordRoutes);

const resetPasswordRoutes = require('./routes/login/resetPassword'); 
app.use('/reset-password', resetPasswordRoutes);

const cadItemRoutes = require('./routes/produto/cadItem'); 
app.use('/item', cadItemRoutes);

const categoriaRoutes = require('./routes/produto/categoria'); 
app.use('/categoria', categoriaRoutes);

const estoqueRoutes = require('./routes/produto/estoque'); 
app.use('/estoque', estoqueRoutes);

const qtdItemRoutes = require('./routes/produto/qtdItem'); 
app.use('/qtditem',qtdItemRoutes);

const solicitacaoRoutes = require('./routes/solicitacao/solicitacao'); 
app.use('/solicitacao', solicitacaoRoutes);

const controleRoutes = require('./routes/solicitacao/controle'); 
app.use('/controle', controleRoutes);

const movimentacaoRoutes = require('./routes/solicitacao/tipoMovimentacao'); 
app.use('/movimentacao', movimentacaoRoutes);

const cargoRoutes = require('./routes/autenticacao/cargos'); 
app.use('/cargo', cargoRoutes);

const departamentoRoutes = require('./routes/autenticacao/departamento'); 
app.use('/departamento', departamentoRoutes);

const excelRoutes = require('./routes/excel/excel'); 
app.use('/excel', excelRoutes);

const port = process.env.PORT || 8081

app.listen(port, ()=> {
    console.log(`Servidor iniciado na porta ${port}`)
})
app.get('/', (req,res) =>{
    res.json({message: 'Testando API'})
})
