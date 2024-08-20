import Console from '../Modelo/console.js';
import conectar from './conexao.js';

export default class ConsoleDAO {

    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS console(
                cons_codigo INT NOT NULL AUTO_INCREMENT,
                cons_descricao VARCHAR(100) NOT NULL,
                cons_precoCusto DECIMAL(10,2) NOT NULL DEFAULT 0,
                cons_precoVenda DECIMAL(10,2) NOT NULL DEFAULT 0,
                cons_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
                CONSTRAINT pk_Console PRIMARY KEY(cons_codigo)
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }


    async gravar(console) {
        if (console instanceof Console) {
            const sql = `INSERT INTO console(cons_descricao, cons_precoCusto,
                cons_precoVenda, cons_qtdEstoque)
                VALUES(?,?,?,?)`;
            const parametros = [console.descricao, console.precoCusto, console.precoVenda,
             console.qtdEstoque];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            console.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(console) {
        if (console instanceof Console) {
            const sql = `UPDATE Console SET cons_descricao = ?, cons_precoCusto = ?,
            cons_precoVenda = ?, cons_qtdEstoque = ?,
            WHERE cons_codigo = ?`;
            const parametros = [console.descricao, console.precoCusto, console.precoVenda,
             console.qtdEstoque, console.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(console) {
        if (console instanceof Console) {
            const sql = `DELETE FROM Console WHERE cons_codigo = ?`;
            const parametros = [console.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaConsoles = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do Console
            const sql = `SELECT c.cons_codigo, c.cons_descricao,
              c.cons_precoCusto, c.cons_precoVenda, 
              c.cons_qtdEstoque
              FROM Console c 
              WHERE c.cons_codigo = ?
              ORDER BY c.cons_descricao               
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const console = new Console(registro.cons_codigo,registro.cons_descricao,
                                            registro.cons_precoCusto,registro.cons_precoVenda,
                                            registro.cons_dataValidade, registro.cons_qtdEstoque
                                            );
                listaConsoles.push(console);
            }
        }
        else
        {
            //consulta pela descrição do Console
            const sql = `SELECT c.cons_codigo, c.cons_descricao, c.precoCusto, 
                         c.prod_precoVenda, c.prod_qtdEstoque
                         FROM Console c 
                         WHERE c.prod_descricao like ?
                         ORDER BY c.prod_descricao`;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const console = new Console(registro.cons_codigo,registro.cons_descricao,
                                            registro.cons_precoCusto,registro.cons_precoVenda,
                                            registro.cons_qtdEstoque,
                                            );
                listaConsoles.push(console);
            }
        }

        return listaConsoles;
    }
}