create database onDash;
use onDash;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 07/05/2024 às 19:56
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ondash`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `cadastroitem`
--

CREATE TABLE `cadastroitem` (
  `cadItemId` int(11) NOT NULL,
  `foto` blob NOT NULL,
  `nome_item` varchar(150) NOT NULL,
  `qtdMin` int(11) NOT NULL DEFAULT 0,
  `fk_categoriaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cargos`
--

CREATE TABLE `cargos` (
  `cargoId` int(11) NOT NULL,
  `cargo_nome` enum('auxiliar','gestor','solicitante') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cargos`
--

INSERT INTO `cargos` (`cargoId`, `cargo_nome`) VALUES
(1, 'auxiliar'),
(2, 'auxiliar'),
(3, 'solicitante');

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria`
--

CREATE TABLE `categoria` (
  `cateId` int(11) NOT NULL,
  `nome_categoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `controle`
--

CREATE TABLE `controle` (
  `fk_solicId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `departamento`
--

CREATE TABLE `departamento` (
  `depId` int(11) NOT NULL,
  `nome_depart` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `departamento`
--

INSERT INTO `departamento` (`depId`, `nome_depart`) VALUES
(1, 'Estoque'),
(2, 'Administração'),
(3, 'Contabilidade'),
(4, 'Logística'),
(5, 'Rh');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estoque`
--

CREATE TABLE `estoque` (
  `estoqueId` int(11) NOT NULL,
  `qtdeTotal` int(11) NOT NULL,
  `fk_qtdItemId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `qtditem`
--

CREATE TABLE `qtditem` (
  `qtdItemId` int(11) NOT NULL,
  `fk_cadItemId` int(11) NOT NULL,
  `qtde` int(11) NOT NULL,
  `valorItem` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `solicitacaoprod`
--

CREATE TABLE `solicitacaoprod` (
  `solicId` int(11) NOT NULL,
  `data` date NOT NULL,
  `qtdSaida` int(11) DEFAULT NULL,
  `qtdEntrada` int(11) DEFAULT NULL,
  `valor_entrada` decimal(8,2) DEFAULT NULL,
  `fk_usuarioId` int(11) NOT NULL,
  `fk_tipoMoviId` int(11) NOT NULL,
  `fk_qtdItemId` int(11) NOT NULL,
  `fk_cadItemId` int(11) NOT NULL,
  `status` enum('Novo','Lido','Autorizado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Acionadores `solicitacaoprod`
--
DELIMITER $$
CREATE TRIGGER `calcPrecoMedio` 
AFTER INSERT ON `solicitacaoprod` 
FOR EACH ROW 
BEGIN
    -- atualizar os preços na tabela de cadastro de item
    UPDATE qtdItem
    SET valorItem = ((qtde * valorItem) + (NEW.qtdEntrada * NEW.valor_entrada)) / (qtde + NEW.qtdEntrada)
    WHERE qtdItemId = NEW.fk_qtdItemId;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipomovi`
--

CREATE TABLE `tipomovi` (
  `tmId` int(11) NOT NULL,
  `tipo` enum('entrada','saida') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `usuId` int(11) NOT NULL,
  `usuNome` varchar(100) NOT NULL,
  `foto_usu` blob NOT NULL,
  `email` varchar(200) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `fk_cargoId` int(11) NOT NULL,
  `fk_depId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`usuId`, `usuNome`, `foto_usu`, `email`, `senha`, `fk_cargoId`, `fk_depId`) VALUES
(1, 'Testando signup', '', 'Teste@gmail.com', '$2b$10$59riLyyFBCUumo4Ue0Owi.D5DaOgGztI9kw8mlQsS3ranqpR.JLSi', 2, 3),
(2, 'Roberto Carlos', '', 'Roberto123@gmail.com', '$2b$10$tU/qv776AV77sgx8Ph45/.QTtIcMaOo2n7GrQOm5c0m10u5UmtJxS', 2, 1);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `view_controle`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `view_controle` (
`solicId` int(11)
,`data` date
,`qtdEntrada` int(11)
,`qtdSaida` int(11)
,`valor_entrada` decimal(8,2)
,`status` enum('Novo','Lido','Autorizado')
,`usuNome` varchar(100)
,`cargo_nome` enum('auxiliar','gestor','solicitante')
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `view_estoque`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `view_estoque` (
`qtdeTotal` int(11)
,`nome_categoria` varchar(100)
,`foto` blob
,`nome_item` varchar(150)
,`qtdMin` int(11)
,`qtde` int(11)
,`valorItem` decimal(8,2)
);

-- --------------------------------------------------------

--
-- Estrutura para view `view_controle`
--
DROP TABLE IF EXISTS `view_controle`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_controle`  AS SELECT `sp`.`solicId` AS `solicId`, `sp`.`data` AS `data`, `sp`.`qtdEntrada` AS `qtdEntrada`, `sp`.`qtdSaida` AS `qtdSaida`, `sp`.`valor_entrada` AS `valor_entrada`, `sp`.`status` AS `status`, `u`.`usuNome` AS `usuNome`, `carg`.`cargo_nome` AS `cargo_nome` FROM (((`controle` join `solicitacaoprod` `sp` on(`controle`.`fk_solicId` = `sp`.`solicId`)) join `usuarios` `u` on(`sp`.`fk_usuarioId` = `u`.`usuId`)) join `cargos` `carg` on(`u`.`fk_cargoId` = `carg`.`cargoId`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `view_estoque`
--
DROP TABLE IF EXISTS `view_estoque`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_estoque`  AS SELECT `e`.`qtdeTotal` AS `qtdeTotal`, `c`.`nome_categoria` AS `nome_categoria`, `i`.`foto` AS `foto`, `i`.`nome_item` AS `nome_item`, `i`.`qtdMin` AS `qtdMin`, `qti`.`qtde` AS `qtde`, `qti`.`valorItem` AS `valorItem` FROM (((`estoque` `e` join `qtditem` `qti` on(`e`.`fk_qtdItemId` = `qti`.`qtdItemId`)) join `cadastroitem` `i` on(`e`.`fk_qtdItemId` = `i`.`cadItemId`)) join `categoria` `c` on(`e`.`fk_qtdItemId` = `c`.`cateId`)) ;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `cadastroitem`
--
ALTER TABLE `cadastroitem`
  ADD PRIMARY KEY (`cadItemId`),
  ADD KEY `fk_categoriaId` (`fk_categoriaId`);

--
-- Índices de tabela `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`cargoId`);

--
-- Índices de tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`cateId`);

--
-- Índices de tabela `controle`
--
ALTER TABLE `controle`
  ADD KEY `fk_solicId` (`fk_solicId`);

--
-- Índices de tabela `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`depId`);

--
-- Índices de tabela `estoque`
--
ALTER TABLE `estoque`
  ADD PRIMARY KEY (`estoqueId`),
  ADD KEY `fk_qtdItemId` (`fk_qtdItemId`);

--
-- Índices de tabela `qtditem`
--
ALTER TABLE `qtditem`
  ADD PRIMARY KEY (`qtdItemId`),
  ADD KEY `fk_cadItemId` (`fk_cadItemId`);

--
-- Índices de tabela `solicitacaoprod`
--
ALTER TABLE `solicitacaoprod`
  ADD PRIMARY KEY (`solicId`),
  ADD KEY `fk_usuarioId` (`fk_usuarioId`),
  ADD KEY `fk_tipoMoviId` (`fk_tipoMoviId`),
  ADD KEY `fk_qtdItemId` (`fk_qtdItemId`),
  ADD KEY `fk_cadItemId` (`fk_cadItemId`);

--
-- Índices de tabela `tipomovi`
--
ALTER TABLE `tipomovi`
  ADD PRIMARY KEY (`tmId`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuId`),
  ADD KEY `fk_cargoId` (`fk_cargoId`),
  ADD KEY `fk_depId` (`fk_depId`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cadastroitem`
--
ALTER TABLE `cadastroitem`
  MODIFY `cadItemId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `cateId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `estoque`
--
ALTER TABLE `estoque`
  MODIFY `estoqueId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `qtditem`
--
ALTER TABLE `qtditem`
  MODIFY `qtdItemId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `solicitacaoprod`
--
ALTER TABLE `solicitacaoprod`
  MODIFY `solicId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `cadastroitem`
--
ALTER TABLE `cadastroitem`
  ADD CONSTRAINT `cadastroitem_ibfk_1` FOREIGN KEY (`fk_categoriaId`) REFERENCES `categoria` (`cateId`);

--
-- Restrições para tabelas `controle`
--
ALTER TABLE `controle`
  ADD CONSTRAINT `controle_ibfk_1` FOREIGN KEY (`fk_solicId`) REFERENCES `solicitacaoprod` (`solicId`);

--
-- Restrições para tabelas `estoque`
--
ALTER TABLE `estoque`
  ADD CONSTRAINT `estoque_ibfk_1` FOREIGN KEY (`fk_qtdItemId`) REFERENCES `qtditem` (`qtdItemId`);

--
-- Restrições para tabelas `qtditem`
--
ALTER TABLE `qtditem`
  ADD CONSTRAINT `qtditem_ibfk_1` FOREIGN KEY (`fk_cadItemId`) REFERENCES `cadastroitem` (`cadItemId`);

--
-- Restrições para tabelas `solicitacaoprod`
--
ALTER TABLE `solicitacaoprod`
  ADD CONSTRAINT `solicitacaoprod_ibfk_1` FOREIGN KEY (`fk_usuarioId`) REFERENCES `usuarios` (`usuId`),
  ADD CONSTRAINT `solicitacaoprod_ibfk_2` FOREIGN KEY (`fk_tipoMoviId`) REFERENCES `tipomovi` (`tmId`),
  ADD CONSTRAINT `solicitacaoprod_ibfk_3` FOREIGN KEY (`fk_qtdItemId`) REFERENCES `qtditem` (`qtdItemId`),
  ADD CONSTRAINT `solicitacaoprod_ibfk_4` FOREIGN KEY (`fk_cadItemId`) REFERENCES `cadastroitem` (`cadItemId`);

--
-- Restrições para tabelas `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`fk_cargoId`) REFERENCES `cargos` (`cargoId`),
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`fk_depId`) REFERENCES `departamento` (`depId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
