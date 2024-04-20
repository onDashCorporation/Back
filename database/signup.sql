CREATE DATABASE onDash;
USE onDash;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `cadastroitem` (
  `cadItemId` int(11) NOT NULL,
  `foto` blob NOT NULL,
  `nome` varchar(150) NOT NULL,
  `qtdMinima` int(11) NOT NULL,
  `fk_categoriaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `cadastroitem`
--

INSERT INTO `cadastroitem` (`cadItemId`, `foto`, `nome`, `qtdMinima`, `fk_categoriaId`) VALUES
(1, 0x666f746f5f313731303935373534353439382e6a7067, 'Monitor samsung', 200, 4),
(2, 0x666f746f5f313731303838373333333239342e6a7067, 'Monitor dell', 2, 4),
(3, 0x666f746f5f313731303838373936363134302e6a7067, 'Monitor dell', 2, 4),
(4, 0x666f746f5f313731333230373038343036372e77656270, 'Monitor teste', 2000, 1),
(5, 0x666f746f5f313731313536393336373432312e6a7067, 'Monitor samsung', 20, 4),
(6, 0x666f746f5f313731333230363639393034352e6a7067, 'Teclado dell', 200, 1);

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
(5, 'Teclado'),
(6, 'Mouse');

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
-- Estrutura da tabela `departamento`
--

CREATE TABLE `departamento` (
  `departamentoId` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `departamento`
--

INSERT INTO `departamento` (`departamentoId`, `nome`) VALUES
(1, 'Estoque'),
(2, 'Administração'),
(3, 'Contabilidade'),
(5, 'Logística'),
(6, 'Rh');

-- --------------------------------------------------------

--
-- Estrutura da tabela `qtditem`
--

CREATE TABLE `qtditem` (
  `qtdItem_id` int(11) NOT NULL,
  `fk_cadItemId` int(11) NOT NULL,
  `qtde` int(11) NOT NULL DEFAULT 0,
  `valorItem` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `qtditem`
--

INSERT INTO `qtditem` (`qtdItem_id`, `fk_cadItemId`, `qtde`, `valorItem`) VALUES
(1, 1, 500, 500.00),
(2, 2, 600, 500.89),
(3, 4, 800, 500.89),
(4, 4, 700, 500.89);

-- --------------------------------------------------------

--
-- Estrutura da tabela `solicitacaoproduto`
--

CREATE TABLE `solicitacaoproduto` (
  `solicId` int(11) NOT NULL,
  `data` date NOT NULL,
  `qtdEntrada` int(11) NOT NULL,
  `qtdSaida` int(11) NOT NULL,
  `fk_tipoMoviId` int(11) NOT NULL,
  `fk_usuarioId` int(11) NOT NULL,
  `fk_qtdItemId` int(11) NOT NULL
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
(2, 'Saida');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `usuarioId` int(11) NOT NULL,
  `usuNome` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `fk_cargoId` int(1) NOT NULL,
  `fk_departamentoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`usuarioId`, `usuNome`, `email`, `senha`, `fk_cargoId`, `fk_departamentoId`) VALUES
(1, 'Testando o cargo', 'cargoaaa@gmail.com', '$2b$10$7fOU2Co41vRQWLAkrt1o6uVrG7L1kYGJLPfTN090mmrg7HxStU.Cy', 2, 1),
(2, 'Testando signup', 'Signup1234@', '$2b$10$h7HU7L6rQu24dJveX0/ryOjKDzRrQn45H/gb9AglT76wYFqxmvgj6', 2, 2),
(3, 'Anna', 'Signup1234@', '$2b$10$npl2zfe2eR7Cfx5B2OPH9uQTgbj.W7u2yGX8BIkR4uxUiwSXhR1JS', 1, 3),
(4, 'Anna', 'Signup1234@', '$2b$10$gKaJ1k4xMtUJW7mvjbxXYuCEdT4msGVjraU/Nl.hT5PjXYJSw2gKW', 1, 5),
(5, 'Anna', 'annaa0478@gamil.com', '$2b$10$aelCSJ3SkJ0/ggGdHRdcm.tgiL2s1KgdZFOHf9EC7zJ/tDEO7dOVO', 1, 1),
(6, 'Anna', 'annaa0478@gmail.com', '$2b$10$o8TfWfncXa0oIO1fLUDmfOHWrOj76zGvsn1xjQF7uWcYy4f0cbCAa', 1, 2),
(7, 'Douglas', 'ondashequipe@gmail.com', '$2b$10$qKwnFuWj6iUFaL4D5HXa0.reRuhu79LcYaWYe64eJXZ/tbCGjeBvy', 3, 3),
(8, 'Gabi', 'gabi@gmail.com', '$2b$10$mqPgN9BtKakn0.jsg2mLxuI/qKAiUuIwPeQcdmkJLJ4UncQTfCqQu', 3, 5),
(9, 'Gabi', 'signupteste@gmail.com', '$2b$10$CD9PSxYD2Tg5FVl8iDjl..5XgH2vWTfta8nthMjTstU1oqReX2IYu', 3, 1),
(10, 'aaaaaaa', 'aaaaaaaa@gmail.com', '$2b$10$m1/SBh5jGoeZD1YK7l0Ucu/vNx8KSgVHW5RMb5xtSZPjAjYWWT6Hi', 1, 2),
(11, 'bbbb', 'bbb@gmail.com', '$2b$10$Fw2LKmi6q.VUrzswXxqpz.8gcyYGAGP7e1X.mn67LPu9a68llpnIO', 1, 3),
(12, 'bbbb', 'bbb1@gmail.com', '$2b$10$9uUVeuMKYNAWPYwNjHlt6usj4PThYRfuj/xn0iC89Rj6AI16rDndi', 2, 5),
(13, 'dndn', 'arthurferreira140404@gmail.com', '$2b$10$joPMOUMqXaWK7cfNrm7xuu/m7ZUH4hpHmFB/Qo/ojd1ju0eTKNq8.', 3, 5);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `cadastroitem`
--
ALTER TABLE `cadastroitem`
  ADD PRIMARY KEY (`cadItemId`),
  ADD KEY `fk_categoria` (`fk_categoriaId`);

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
-- Índices para tabela `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`departamentoId`);

--
-- Índices para tabela `qtditem`
--
ALTER TABLE `qtditem`
  ADD PRIMARY KEY (`qtdItem_id`),
  ADD KEY `fk_cadItem` (`fk_cadItemId`);

--
-- Índices para tabela `solicitacaoproduto`
--
ALTER TABLE `solicitacaoproduto`
  ADD PRIMARY KEY (`solicId`),
  ADD KEY `fk_tipoMovi` (`fk_tipoMoviId`),
  ADD KEY `fk_usuario` (`fk_usuarioId`),
  ADD KEY `fk_qtdItem` (`fk_qtdItemId`);

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
  ADD KEY `fk_cargo_usuario` (`fk_cargoId`),
  ADD KEY `fk_departamento` (`fk_departamentoId`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cadastroitem`
--
ALTER TABLE `cadastroitem`
  MODIFY `cadItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `categoriaId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `controle`
--
ALTER TABLE `controle`
  MODIFY `controleId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `departamento`
--
ALTER TABLE `departamento`
  MODIFY `departamentoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `qtditem`
--
ALTER TABLE `qtditem`
  MODIFY `qtdItem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `solicitacaoproduto`
--
ALTER TABLE `solicitacaoproduto`
  MODIFY `solicId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tipomovimentacao`
--
ALTER TABLE `tipomovimentacao`
  MODIFY `tipoMoviId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuarioId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `cadastroitem`
--
ALTER TABLE `cadastroitem`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`fk_categoriaId`) REFERENCES `categoria` (`categoriaId`);

--
-- Limitadores para a tabela `controle`
--
ALTER TABLE `controle`
  ADD CONSTRAINT `fk_solicitacao` FOREIGN KEY (`fk_solicitacaoId`) REFERENCES `solicitacaoproduto` (`solicId`);

--
-- Limitadores para a tabela `qtditem`
--
ALTER TABLE `qtditem`
  ADD CONSTRAINT `fk_cadItem` FOREIGN KEY (`fk_cadItemId`) REFERENCES `cadastroitem` (`cadItemId`);

--
-- Limitadores para a tabela `solicitacaoproduto`
--
ALTER TABLE `solicitacaoproduto`
  ADD CONSTRAINT `fk_qtdItem` FOREIGN KEY (`fk_qtdItemId`) REFERENCES `qtditem` (`qtdItem_id`),
  ADD CONSTRAINT `fk_tipoMovi` FOREIGN KEY (`fk_tipoMoviId`) REFERENCES `tipomovimentacao` (`tipoMoviId`),
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`fk_usuarioId`) REFERENCES `usuarios` (`usuarioId`);

--
-- Limitadores para a tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_cargo` FOREIGN KEY (`fk_cargoId`) REFERENCES `cargo` (`cargoId`),
  ADD CONSTRAINT `fk_departamento` FOREIGN KEY (`fk_departamentoId`) REFERENCES `departamento` (`departamentoId`);
COMMIT;
