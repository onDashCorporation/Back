-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02-Abr-2024 às 19:05
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `signup`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `auxiliar`
--

CREATE TABLE `auxiliar` (
  `fk_cargoId` int(1) NOT NULL,
  `fk_usuId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `cargo`
--

CREATE TABLE `cargo` (
  `cargoId` int(1) NOT NULL,
  `cargo_nome` enum('auxiliar','gestor','solicitante') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `cargo`
--

INSERT INTO `cargo` (`cargoId`, `cargo_nome`) VALUES
(0, ''),
(1, 'auxiliar'),
(2, 'gestor'),
(3, 'solicitante');

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE `categoria` (
  `categoriaId` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `categoria`
--

INSERT INTO `categoria` (`categoriaId`, `nome`) VALUES
(1, 'Processadores'),
(2, 'Memoria'),
(4, 'Tela'),
(5, 'Teste teste');

-- --------------------------------------------------------

--
-- Estrutura da tabela `controle`
--

CREATE TABLE `controle` (
  `controleId` int(11) NOT NULL,
  `qtdSaida` int(11) NOT NULL,
  `qtdEntrada` int(11) NOT NULL,
  `precoMedio` decimal(10,0) NOT NULL,
  `fk_solicitacaoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `gestor`
--

CREATE TABLE `gestor` (
  `fk_cargoId` int(1) NOT NULL,
  `fk_usuId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `item`
--

CREATE TABLE `item` (
  `itemId` int(11) NOT NULL,
  `foto` blob NOT NULL,
  `nome` varchar(150) NOT NULL,
  `qtd` decimal(10,0) NOT NULL,
  `valor` int(11) NOT NULL,
  `qtdMinima` int(11) NOT NULL,
  `categoriafk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `item`
--

INSERT INTO `item` (`itemId`, `foto`, `nome`, `qtd`, `valor`, `qtdMinima`, `categoriafk`) VALUES
(1, 0x666f746f5f313731303935373534353439382e6a7067, 'Monitor samsung', 600, 60, 200, 4),
(2, 0x666f746f5f313731303838373333333239342e6a7067, 'Monitor dell', 5, 10, 2, 4),
(3, 0x666f746f5f313731303838373936363134302e6a7067, 'Monitor dell', 5, 10, 2, 4),
(4, 0x666f746f5f313731313536393030323337312e6a7067, 'Monitor samsung', 9000, 5000, 800, 4),
(5, 0x666f746f5f313731313536393336373432312e6a7067, 'Monitor samsung', 20, 5000, 20, 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE `produto` (
  `produtoId` int(11) NOT NULL,
  `item_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `solicitacaoproduto`
--

CREATE TABLE `solicitacaoproduto` (
  `solicitacaoId` int(11) NOT NULL,
  `data` date NOT NULL,
  `fk_produtoId` int(11) NOT NULL,
  `qtd` int(11) NOT NULL,
  `preco` decimal(10,0) NOT NULL,
  `fk_itemId` int(11) NOT NULL,
  `fk_tipoMoviId` int(11) NOT NULL,
  `fk_usuarioId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `solicitante`
--

CREATE TABLE `solicitante` (
  `fk_cargoId` int(1) NOT NULL,
  `fk_usuId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipomovimentacao`
--

CREATE TABLE `tipomovimentacao` (
  `tipoMoviId` int(11) NOT NULL,
  `tipo` enum('Entrada','Saida') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tipomovimentacao`
--

INSERT INTO `tipomovimentacao` (`tipoMoviId`, `tipo`) VALUES
(1, 'Entrada'),
(2, 'Saida'),
(3, '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `usuarioId` int(11) NOT NULL,
  `usuNome` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `fk_cargoId` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`usuarioId`, `usuNome`, `email`, `senha`, `fk_cargoId`) VALUES
(1, 'Testando o cargo', 'cargoaaa@gmail.com', '$2b$10$7fOU2Co41vRQWLAkrt1o6uVrG7L1kYGJLPfTN090mmrg7HxStU.Cy', 2),
(2, 'Testando signup', 'Signup1234@', '$2b$10$h7HU7L6rQu24dJveX0/ryOjKDzRrQn45H/gb9AglT76wYFqxmvgj6', 2),
(3, 'Anna', 'Signup1234@', '$2b$10$npl2zfe2eR7Cfx5B2OPH9uQTgbj.W7u2yGX8BIkR4uxUiwSXhR1JS', 1),
(4, 'Anna', 'Signup1234@', '$2b$10$gKaJ1k4xMtUJW7mvjbxXYuCEdT4msGVjraU/Nl.hT5PjXYJSw2gKW', 1),
(5, 'Anna', 'annaa0478@gamil.com', '$2b$10$aelCSJ3SkJ0/ggGdHRdcm.tgiL2s1KgdZFOHf9EC7zJ/tDEO7dOVO', 1),
(6, 'Anna', 'annaa0478@gmail.com', '$2b$10$o8TfWfncXa0oIO1fLUDmfOHWrOj76zGvsn1xjQF7uWcYy4f0cbCAa', 1),
(7, 'Douglas', 'ondashequipe@gmail.com', '$2b$10$qKwnFuWj6iUFaL4D5HXa0.reRuhu79LcYaWYe64eJXZ/tbCGjeBvy', 3),
(8, 'Gabi', 'gabi@gmail.com', '$2b$10$mqPgN9BtKakn0.jsg2mLxuI/qKAiUuIwPeQcdmkJLJ4UncQTfCqQu', 3);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `auxiliar`
--
ALTER TABLE `auxiliar`
  ADD KEY `fk_cargoAuxiliar` (`fk_cargoId`),
  ADD KEY `fk_usuarioAuxiliar` (`fk_usuId`);

--
-- Índices para tabela `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`cargoId`);

--
-- Índices para tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`categoriaId`);

--
-- Índices para tabela `controle`
--
ALTER TABLE `controle`
  ADD PRIMARY KEY (`controleId`),
  ADD KEY `fk_solicitacao` (`fk_solicitacaoId`);

--
-- Índices para tabela `gestor`
--
ALTER TABLE `gestor`
  ADD KEY `fk_cargoGestor` (`fk_cargoId`),
  ADD KEY `fk_usuarioGestor` (`fk_usuId`);

--
-- Índices para tabela `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`itemId`),
  ADD KEY `fk_categoria` (`categoriafk`);

--
-- Índices para tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`produtoId`),
  ADD KEY `fk_itens` (`item_fk`);

--
-- Índices para tabela `solicitacaoproduto`
--
ALTER TABLE `solicitacaoproduto`
  ADD PRIMARY KEY (`solicitacaoId`),
  ADD KEY `fk_produto` (`fk_produtoId`),
  ADD KEY `fk_tipoMovi` (`fk_tipoMoviId`),
  ADD KEY `fk_usuario` (`fk_usuarioId`),
  ADD KEY `fk_item` (`fk_itemId`);

--
-- Índices para tabela `solicitante`
--
ALTER TABLE `solicitante`
  ADD KEY `fk_cargoSolicitante` (`fk_cargoId`),
  ADD KEY `fk_usuarioSolicitante` (`fk_usuId`);

--
-- Índices para tabela `tipomovimentacao`
--
ALTER TABLE `tipomovimentacao`
  ADD PRIMARY KEY (`tipoMoviId`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuarioId`),
  ADD KEY `fk_cargo_usuario` (`fk_cargoId`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `categoriaId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `controle`
--
ALTER TABLE `controle`
  MODIFY `controleId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `item`
--
ALTER TABLE `item`
  MODIFY `itemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `produtoId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `solicitacaoproduto`
--
ALTER TABLE `solicitacaoproduto`
  MODIFY `solicitacaoId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tipomovimentacao`
--
ALTER TABLE `tipomovimentacao`
  MODIFY `tipoMoviId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuarioId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `auxiliar`
--
ALTER TABLE `auxiliar`
  ADD CONSTRAINT `fk_cargoAuxiliar` FOREIGN KEY (`fk_cargoId`) REFERENCES `cargo` (`cargoId`),
  ADD CONSTRAINT `fk_usuarioAuxiliar` FOREIGN KEY (`fk_usuId`) REFERENCES `usuarios` (`usuarioId`);

--
-- Limitadores para a tabela `controle`
--
ALTER TABLE `controle`
  ADD CONSTRAINT `fk_solicitacao` FOREIGN KEY (`fk_solicitacaoId`) REFERENCES `solicitacaoproduto` (`solicitacaoId`);

--
-- Limitadores para a tabela `gestor`
--
ALTER TABLE `gestor`
  ADD CONSTRAINT `fk_cargoGestor` FOREIGN KEY (`fk_cargoId`) REFERENCES `cargo` (`cargoId`),
  ADD CONSTRAINT `fk_usuarioGestor` FOREIGN KEY (`fk_usuId`) REFERENCES `usuarios` (`usuarioId`);

--
-- Limitadores para a tabela `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`categoriafk`) REFERENCES `categoria` (`categoriaId`);

--
-- Limitadores para a tabela `produto`
--
ALTER TABLE `produto`
  ADD CONSTRAINT `fk_itens` FOREIGN KEY (`item_fk`) REFERENCES `item` (`itemId`);

--
-- Limitadores para a tabela `solicitacaoproduto`
--
ALTER TABLE `solicitacaoproduto`
  ADD CONSTRAINT `fk_item` FOREIGN KEY (`fk_itemId`) REFERENCES `produto` (`item_fk`),
  ADD CONSTRAINT `fk_tipoMovi` FOREIGN KEY (`fk_tipoMoviId`) REFERENCES `tipomovimentacao` (`tipoMoviId`),
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`fk_usuarioId`) REFERENCES `usuarios` (`usuarioId`);

--
-- Limitadores para a tabela `solicitante`
--
ALTER TABLE `solicitante`
  ADD CONSTRAINT `fk_cargoSolicitante` FOREIGN KEY (`fk_cargoId`) REFERENCES `cargo` (`cargoId`),
  ADD CONSTRAINT `fk_usuarioSolicitante` FOREIGN KEY (`fk_usuId`) REFERENCES `usuarios` (`usuarioId`);

--
-- Limitadores para a tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_cargo` FOREIGN KEY (`fk_cargoId`) REFERENCES `cargo` (`cargoId`),
  ADD CONSTRAINT `fk_cargo_usuario` FOREIGN KEY (`fk_cargoId`) REFERENCES `cargo` (`cargoId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
