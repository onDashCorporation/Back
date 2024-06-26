SHOW TABLES;
USE onDash;

SELECT * FROM  solicitacaoprod;

INSERT INTO categoria(cateId,nome_categoria) VALUES (1, "microfone");
INSERT INTO categoria(cateId,nome_categoria) VALUES (6, "produção");
INSERT INTO categoria(cateId,nome_categoria) VALUES (2, "tecnologia");
INSERT INTO categoria(cateId,nome_categoria) VALUES (3, "vendas");
INSERT INTO categoria(cateId,nome_categoria) VALUES (4, "marketing");
INSERT INTO categoria(cateId,nome_categoria) VALUES (5, "finanças");

insert into cadastroitem (cadItemId, foto, nome_item, qtdMin, fk_categoriaId) values (89, 'null', 'Food Colouring - Pink', 6, 1); 
insert into cadastroitem (cadItemId, foto, nome_item, qtdMin, fk_categoriaId) values (78, 'null', 'Tea - Black Currant', 9, 1); 
insert into cadastroitem (cadItemId, foto, nome_item, qtdMin, fk_categoriaId) values (69, 'null', 'Mustard - Pommery', 5, 4); 
insert into cadastroitem (cadItemId, foto, nome_item, qtdMin, fk_categoriaId) values (22, 'null', 'Pepper - Yellow Bell', 9, 4); 
insert into cadastroitem (cadItemId, foto, nome_item, qtdMin, fk_categoriaId) values (28, 'null', 'Bread - Frozen Basket Variety', 8,1); 
insert into cadastroitem (cadItemId, foto, nome_item, qtdMin, fk_categoriaId) values (40, 'null', 'Extract - Almond', 9, 6); 
insert into cadastroitem (cadItemId, foto, nome_item, qtdMin, fk_categoriaId) values (58, 'null', 'Basil - Pesto Sauce', 5, 3); 
insert into cadastroitem (cadItemId, foto, nome_item, qtdMin, fk_categoriaId) values (43, 'null', 'Cinnamon Rolls', 8, 2); 
insert into cadastroitem (cadItemId, foto, nome_item, qtdMin, fk_categoriaId) values (41, 'null', 'Cup - 3.5oz, Foam', 7, 4); 
insert into cadastroitem (cadItemId, foto, nome_item, qtdMin, fk_categoriaId) values (20, 'null', 'Veal - Liver', 6, 4); 
insert into cadastroitem (cadItemId, foto, nome_item, qtdMin, fk_categoriaId) values (58, 'null', 'Cookies - Amaretto', 5, 2); 
insert into cadastroitem (cadItemId, foto, nome_item, qtdMin, fk_categoriaId) values (30, 'null', 'Wine - Lamancha Do Crianza', 8, 4); 
insert into cadastroitem (cadItemId, foto, nome_item, qtdMin, fk_categoriaId) values (42, 'null', 'Dc - Sakura Fu', 5, 3); 
insert into cadastroitem (cadItemId, foto, nome_item, qtdMin, fk_categoriaId) values (25, 'null', 'Island Oasis - Peach Daiquiri', 5, 3); 
insert into cadastroitem (cadItemId, foto, nome_item, qtdMin, fk_categoriaId) values (58, 'null', 'Dill - Primerba, Paste', 5, 3);

insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (42, 25, 9, 91.17); 
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (78, 30, 16, 168.9); 
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (69, 25, 38, 143.82); 
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (22, 42, 18, 170.78); 
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (78, 43, 15, 184.32); 
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (85, 41, 35, 50.48); 
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (80, 28, 22, 140.58); 
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (15, 69, 3, 53.96); 
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (31, 28, 26, 179.13); 
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (99, 58, 23, 149.99); 
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (60, 20, 35, 149.74); 
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (27, 41, 44, 162.62);
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (66, 89, 20, 164.13);
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (13,78, 21, 110.54); 
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (90, 69, 34, 127.0);
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (33, 25, 5, 85.82); 
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (70, 30, 20, 173.67); 
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (32, 43, 40, 126.3);
insert into qtditem (qtditemId, fk_cadItemId, qtde, valorItem) values (75, 20, 24, 112.9); 

insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (66, 8, 22); 
insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (31, 15, 39);
insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (15, 2, 80); 
insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (12, 14, 99); 
insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (23, 6, 56); 
insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (14, 6, 27); 
insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (8, 2, 85); 
insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (18, 8, 69); 
insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (13, 12, 78);
insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (38, 6, 28); 
insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (24, 12, 32); 
insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (17, 8, 80); 
insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (22, 5, 32); 
insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (33, 6, 32); 
insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (40, 4, 22); 
insert into estoque (estoqueId, qtdeTotal, fk_qtdItemId) values (10, 9, 99);

insert into tipomovi (tmId, tipo) values (40, 'saida'); 
insert into tipomovi (tmId, tipo) values (21, 'entrada'); 
insert into tipomovi (tmId, tipo) values (8, 'entrada');
insert into tipomovi (tmId, tipo) values (37, 'entrada'); 
insert into tipomovi (tmId, tipo) values (11, 'saida'); 
insert into tipomovi (tmId, tipo) values (31, 'saida'); 
insert into tipomovi (tmId, tipo) values (30, 'entrada'); 
insert into tipomovi (tmId, tipo) values (3, 'saida'); 
insert into tipomovi (tmId, tipo) values (39, 'saida'); 
insert into tipomovi (tmId, tipo) values (24, 'entrada'); 
insert into tipomovi (tmId, tipo) values (47, 'saida'); 
insert into tipomovi (tmId, tipo) values (41, 'entrada'); 
insert into tipomovi (tmId, tipo) values (33, 'entrada'); 
insert into tipomovi (tmId, tipo) values (16, 'saida'); 
insert into tipomovi (tmId, tipo) values (36, 'entrada'); 
insert into tipomovi (tmId, tipo) values (9, 'entrada'); 
insert into tipomovi (tmId, tipo) values (6, 'entrada'); 
insert into tipomovi (tmId, tipo) values (11, 'entrada');
insert into tipomovi (tmId, tipo) values (22, 'saida');

insert into usuarios (usuId, usuNome, foto_usu, email, senha, fk_cargoId, fk_depId) values (3, 'Colly Cathery', 'null', 'ccathery0@senate.gov', '$2a$04$C4zQcIxaaMXqkn4wwc.PFulyEZHmwN77ieBLn0MFXbJp5OZVBQ8P.', 3, 5);
insert into usuarios (usuId, usuNome, foto_usu, email, senha, fk_cargoId, fk_depId) values (11, 'Wren Toma', 'null', 'wtoma1@trellian.com', '$2a$04$2jqiepQpmYqzGzA/QY1ykevjzcIm04fQM4biJEhZ.ZlBIC8Eb4mT6', 3, 5);
insert into usuarios (usuId, usuNome, foto_usu, email, senha, fk_cargoId, fk_depId) values (12, 'Ashby Doole', 'null', 'adoole2@github.com', '$2a$04$2Fr4dFWFbqfphDKr2nEREOEfBVXZfGLuACzkb0SPqX0L.HYYIh0jK', 2, 2);
insert into usuarios (usuId, usuNome, foto_usu, email, senha, fk_cargoId, fk_depId) values (4, 'Fidelity Warrender', 'null', 'fwarrender3@wufoo.com', '$2a$04$ZTK9YkztemJXMg2qQncfP.HwDmd0x1uQwJ9IoBoTJRmQBLOF96Z3u', 1, 5);
insert into usuarios (usuId, usuNome, foto_usu, email, senha, fk_cargoId, fk_depId) values (5, 'Willow McGarrahan', 'null', 'wmcgarrahan4@cmu.edu', '$2a$04$VuKDLD2es9g8VLsyIgqiLOoptVnu7mqyCxav8ID0tY.vmeeJWbL02', 2, 5);
insert into usuarios (usuId, usuNome, foto_usu, email, senha, fk_cargoId, fk_depId) values (6, 'Ruthi Brandassi', 'null', 'rbrandassi5@nymag.com', '$2a$04$7nHTc0Qm9P3C2KwBdxD3c.ysXgJ7DSe6vzshXUhUNpSgIrxo2iPOG', 2, 3);
insert into usuarios (usuId, usuNome, foto_usu, email, senha, fk_cargoId, fk_depId) values (7, 'Olympe Budleigh', 'null', 'obudleigh6@intel.com', '$2a$04$jPc6RycB7Vum0wnZ5moyhu1q5diLLHHZCLcNL/y4eEXenbACrA8de', 3, 5);
insert into usuarios (usuId, usuNome, foto_usu, email, senha, fk_cargoId, fk_depId) values (8, 'Kermy Elliott', 'null', 'kelliott7@indiegogo.com', '$2a$04$GGzq.2Cmp2bFPd9oUtTpf.h8S1DZSLQt/vpZew4chdiusWvCxpqX.', 2, 3);
insert into usuarios (usuId, usuNome, foto_usu, email, senha, fk_cargoId, fk_depId) values (9, 'Illa Tabour', 'null', 'itabour8@tumblr.com', '$2a$04$DmswTcRg8SmQMwMWARlZTedfeL7Wbi27l1VwtY62hfEREcmAYYblO', 3, 5);
insert into usuarios (usuId, usuNome, foto_usu, email, senha, fk_cargoId, fk_depId) values (10, 'Ashely Norwich', 'null', 'anorwich9@g.co', '$2a$04$VKL3cE1SES8/20Tuzo7/ZeG7g20OO0BoZ4AHO7.3T46hXY.lPUFxO', 3, 2);

insert into solicitacaoprod (solicId, data, qtdSaida, qtdEntrada, valor_Entrada, fk_usuarioId, fk_tipoMoviId, fk_qtdItemId, fk_cadItemId, status) values (66, '2022-7-17', 17, 2, 147.24, 12, 37, 78, 89,'lido'); 
insert into solicitacaoprod (solicId, data, qtdSaida, qtdEntrada, valor_Entrada, fk_usuarioId, fk_tipoMoviId, fk_qtdItemId, fk_cadItemId, status) values (63, '2023-5-31', 14, 4, 89.21, 2, 6, 78, 89,'lido');
insert into solicitacaoprod (solicId, data, qtdSaida, qtdEntrada, valor_Entrada, fk_usuarioId, fk_tipoMoviId, fk_qtdItemId, fk_cadItemId, status) values (60, '2023-8-13', 2, 6, 137.21, 3, 30, 85, 43,'lido');