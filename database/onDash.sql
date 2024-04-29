CREATE DATABASE onDash;
USE onDash;

-- CRIAÇÃO DAS TABELAS FORTES/INDEPENDENTES --
CREATE TABLE cargos (
    cargoId INT PRIMARY KEY not null,
    cargo_nome ENUM('auxiliar', 'gestor', 'solicitante') NOT NULL
);

create table tipomovi(
	tmId int primary key not null,
    tipo enum('entrada', 'saida') not null
);

create table categoria(
	cateId int primary key not null,
    nome_categoria varchar(100) not null
);

create table departamento(
	depId int primary key not null,
    nome_depart varchar(100)
);

-- CRIAÇÃO DAS TABELAS FRACAS/DEPENDENTES --

-- TABELAS USUARIOS
create table usuarios(
	usuId int primary key not null auto_increment,
    usuNome varchar(100) not null,
    email varchar(200) not null,
    senha varchar(100) not null,
	fk_cargoId int not null,
    fk_depId int not null,
    
    foreign key (fk_cargoId) references cargos(cargoId),
    foreign key (fk_depId) references departamento(depId)
);

-- TABELAS PARA CADASTRAR ITEMS E ADICIONAR/TIRAR --
create table cadastroItem(
	cadItemId int primary key not null,
    foto blob,
    nome_item varchar(150) not null,
    qtdMin int default(0) not null,
    fk_categoriaId int not null,
    
    FOREIGN KEY (fk_categoriaId) references categoria(cateId)
);

create table qtdItem(
	qtdItemId int primary key not null,
    fk_cadItemId int not null,
    qtde int,
    valorItem decimal(8,2),
    
    FOREIGN KEY(fk_cadItemId) references cadastroItem(cadItemId)
);

-- TABELA ESTOQUE, É UMA VIEW
create table estoque(
	estoqueId int primary key not null,
    qtdeTotal int,
    fk_qtdItemId int not null,

    
    foreign key (fk_qtdItemId) references qtdItem(qtdItemId)
);

-- TABELA PARA REALIZAR A SOLICITACAO DE UM ITEM
create table solicitacaoProd(
	solicId int not null primary key,
    data date,
    qtdSaida int,
    qtdEntrada int,
    valor_entrada decimal (8,2),
    fk_usuarioId int not null,
    fk_tipoMoviId int not null,
    fk_qtdItemId int not null,
    fk_cadItemId int not null,
    status enum('Novo', 'Lido', 'Autorizado'),
    
    foreign key (fk_usuarioId) references usuarios(usuId),
    foreign key (fk_tipoMoviId) references tipomovi(tmId),
    foreign key (fk_qtdItemId) references qtdItem(qtdItemId),
    foreign key (fk_cadItemId) references cadastroItem(cadItemId)
);

-- TABELA CONTROLE, PARA VER TODAS AS SOLICITAÇÕES, É UMA VIEW
create table controle(
    fk_solicId int not null,
    
    foreign key (fk_solicId) references solicitacaoProd(solicId)
);


-- TRIGGER PARA ATUALIZAR O PRECO MEDIO DE UM ITEM JA CADASTRADO
DELIMITER //
CREATE TRIGGER calcPrecoMedio
AFTER INSERT ON solicitacaoProd
FOR EACH ROW
BEGIN
	-- atualizar os preços na tabela de cadastro de item
    UPDATE qtdItem
    SET valor = ((qtde * valorItem) + (qtdEntrada * valor_entrada)) / qtde + qtdEntrada 
    WHERE qtdItem_id = fk_qtdItem_id;
END //
DELIMITER ;
