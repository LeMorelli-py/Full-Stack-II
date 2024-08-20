CREATE DATABASE sistema;

USE sistema;

CREATE TABLE marca(
    mar_codigo INT NOT NULL AUTO_INCREMENT,
    mar_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_marca PRIMARY KEY(mar_codigo)
);

CREATE TABLE console(
    cons_codigo INT NOT NULL AUTO_INCREMENT,
    cons_descricao VARCHAR(100) NOT NULL,
    cons_precoCusto DECIMAL(10,2) NOT NULL DEFAULT 0,
    cons_precoVenda DECIMAL(10,2) NOT NULL DEFAULT 0,
    cons_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    mar_codigo INT NOT NULL,
    CONSTRAINT pk_console PRIMARY KEY(cons_codigo),
);


