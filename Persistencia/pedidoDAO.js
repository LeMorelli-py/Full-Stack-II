import Pedido from "../Modelo/Pedido.js";
import Cliente from "../Modelo/Cliente.js";
import Marca from "../Modelo/marca.js";
import Console from "../Modelo/console.js";
import ItemPedido from "../Modelo/ItemPedido.js";
import conectar from "./conexao.js";

export default class PedidoDAO {
    async gravar(pedido){
        if (pedido instanceof Pedido){
            const conexao = await conectar();
            await conexao.beginTransaction();
            try{
                const sql = `INSERT INTO pedido(cliente_codigo, data_pedido, total) VALUES(?, str_to_date(?, "%d/%m/%y"),?)`;
                const parametros = [pedido.cliente.codigo, pedido.data, pedido.total];
                const retorno = await conexao.execute(sql, parametros);
                pedido.codigo = retorno[0].insertID; 

                const sql2 = `INSERT INTO item_pedido(pedido_codigo, console_codigo, quantidade, preco_unitario) VALUES (?,?,?,?)`;
                for (const item of pedido.item) {
                    let paramentros2 = [pedido.codigo, item.produto.codigo,]
                }
            }

        }
    }
}