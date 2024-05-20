# Tarefandoo - TODO List
Descrição... API - Back-End

# Documentção Swagger
- [Documentação](https://app.swaggerhub.com/apis-docs/annaagabi/onDash/1.0.0#/Solicita%C3%A7%C3%A3o/get_solicitacao{:target="_blank"})

## 1. Criando:
**No terminal (Back):**
- [x] Inicializando o projeto (criar o package. json): `npm init -y`
- [x] `npm i express mysql2 cors nodemon dotenv`
- [x] `npm i bcrypt`
<!-- - [x] `npm i -D @types/bcrypt` -->
- [x] `npm i cookie-parser express-session jsonwebtoken`
- [x] `npm i nodemailer`
- [x] `npm i --save multer`
- [x] `npm i --save path`
- [x] `npm install exceljs`
- [x] `npm install axios`


## 2. Video base
- [x] https://www.youtube.com/watch?v=0i86B4mU-vw
      
## 3. Endpoints
### 3.1 Para Verificar se a API Está Funcionando
- [x] {{URL}}/
- [x] http://localhost:3000/

## 3.2 Login 

### 3.2.1 Para verificar os usuarios cadastrados e para adicionar um novo cadastro
- [x] {{URL}}/signup
- [x] http://localhost:3000/signup/

### 3.2.2 Para logar os usuarios 
- [x] {{URL}}/login
- [x] http://localhost:3000/login/

### 3.2.3 Para deslogar os usuarios 
- [x] {{URL}}/logout
- [x] http://localhost:3000/logout/

### 3.2.4 Para redefinir senha 
- [x] {{URL}}/reset-password
- [x] http://localhost:3000/reset-password/

## 3.3 Cargos

### 3.3.1 Para verificar os cargos cadastrados e para adicionar um novo cadastro
- [x] {{URL}}/cargo
- [x] http://localhost:3000/cargo/
  
### 3.3.2 Para deletar, editar ou vizualizar um cargo específica
- [x] {{URL}}/cargo/:id
- [x] http://localhost:3000/cargo/2
  
### 3.3.3 Para verificar os cargos cadastrados e para adicionar um novo cadastro
- [x] {{URL}}/cargo
- [x] http://localhost:3000/cargo/

## 3.4 Departamento

### 3.4.1 Para verificar os departamentos cadastrados e para adicionar um novo cadastro
- [x] {{URL}}/departamento
- [x] http://localhost:3000/departamento/
  
### 3.4.2 Para deletar, editar ou vizualizar um departamento específico
- [x] {{URL}}/departamento/:id
- [x] http://localhost:3000/departamento/2
  
### 3.4.3 Para verificar os departamento cadastrados e para adicionar um novo cadastro
- [x] {{URL}}/departamento
- [x] http://localhost:3000/departamento/


## 3.5 Cadastro de Item

### 3.5.1 Para verificar os itens cadastrados e para adicionar um novo cadastro
- [x] {{URL}}/cadItem
- [x] http://localhost:3000/cadItem/
  
### 3.5.2 Para deletar, editar ou vizualizar um cadastro de item específico
- [x] {{URL}}/cadItem/:id
- [x] http://localhost:3000/cadItem/2
  
### 3.5.3 Para verificar os itens cadastrados e para adicionar um novo cadastro
- [x] {{URL}}/cadItem
- [x] http://localhost:3000/cadItem/

## 3.6 Categorias

### 3.6.1 Para verificar as categorias cadastradas e para adicionar um novo cadastro
- [x] {{URL}}/categoria
- [x] http://localhost:3000/categoria/
  
### 3.6.2 Para deletar, editar ou vizualizar uma categoria específica
- [x] {{URL}}/categoria/:id
- [x] http://localhost:3000/categoria/2
  
### 3.6.3 Para verificar as categorias cadastradas e para adicionar um novo cadastro
- [x] {{URL}}/categoria
- [x] http://localhost:3000/categoria/

## 3.7 Estoque

### 3.7.1 Para verificar os itens no estoque cadastrados e para adicionar um novo cadastro
- [x] {{URL}}/estoque
- [x] http://localhost:3000/estoque/
  
### 3.7.2 Para deletar, editar ou vizualizar um estoque específica
- [x] {{URL}}/estoque/:id
- [x] http://localhost:3000/estoque/2
  
### 3.7.3 Para verificar os itens no estoque cadastrados e para adicionar um novo cadastro
- [x] {{URL}}/estoque
- [x] http://localhost:3000/estoque/

## 3.8 Quantidade de Item

### 3.8.1 Para verificar as quantidades de itens cadastradas e para adicionar um novo cadastro
- [x] {{URL}}/qtditem
- [x] http://localhost:3000/qtditem/
  
### 3.8.2 Para deletar, editar ou vizualizar a quantidade de um item específico
- [x] {{URL}}/qtditem/:id
- [x] http://localhost:3000/qtditem/2
  
### 3.8.3 Para verificar as quantidades de itens cadastradas e para adicionar um novo cadastro
- [x] {{URL}}/qtditem
- [x] http://localhost:3000/qtditem/

## 3.9 Controle

### 3.9.1 Para verificar os controles cadastrados e para adicionar um novo cadastro
- [x] {{URL}}/controle
- [x] http://localhost:3000/controle/
  
### 3.9.2 Para deletar, editar ou vizualizar um controle específico
- [x] {{URL}}/controle/:id
- [x] http://localhost:3000/controle/2
  
### 3.9.3 Para verificar os controles cadastradas e para adicionar um novo cadastro
- [x] {{URL}}/controle
- [x] http://localhost:3000/controle/

### 3.9.4 Para verificar os controles cadastrados pelo mês
- [x] {{URL}}/controle/mes/:month
- [X] {{URL}}/controle/mes/05

### 3.9.5 Para verificar os controles cadastados em um dia e mês específico
- [x] {{URL}}/controle/datas/:day/:month
- [x] {{URL}}/controle/datas/14/05

## 3.10 Solicitação

### 3.10.1 Para verificar as solicitações cadastradas e para adicionar um novo cadastro
- [x] {{URL}}/solicitacao
- [x] http://localhost:3000/solicitacao/
  
### 3.10.2 Para deletar, editar ou vizualizar uma solicitação específica
- [x] {{URL}}/solicitacao/:id
- [x] http://localhost:3000/solicitacao/2
  
### 3.10.3 Para verificar as solicitações cadastradas e para adicionar um novo cadastro
- [x] {{URL}}/solicitacao
- [x] http://localhost:3000/solicitacao/

## 3.11 Tipo de Movimentação

### 3.11.1 Para verificar os tipo de movimentação cadastrados e para adicionar um novo cadastro
- [x] {{URL}}/movimentacao
- [x] http://localhost:3000/movimentacao/
  
### 3.11.2 Para deletar, editar ou vizualizar um tipo de movimentação específico
- [x] {{URL}}/movimentacao/:id
- [x] http://localhost:3000/movimentacao/2
  
### 3.11.3 Para verificar os tipo de movimentação cadastrados e para adicionar um novo cadastro
- [x] {{URL}}/movimentacao
- [x] http://localhost:3000/movimentacao/
  
## 3.12 Baixar relatórios do Excel

### 3.12.1 Para baixar relatórios da View Estoque
- [x] {{URL}}/excel/estoque
- [x] http://localhost:3000/excel/estoque
  
### 3.12.2 Para baixar relatórios da View Controle
- [x] {{URL}}/excel/controle
- [x] http://localhost:3000/excel/controle
