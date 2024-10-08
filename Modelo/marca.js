import MarcaDAO from "../Persistencia/marcaDAO.js";
//não esqueça do .js no final da importação

export default class Marca{
    //definição dos atributos privados
    #codigo;
    #descricao;

    constructor(codigo=0, descricao=''){
        this.#codigo=codigo;
        this.#descricao=descricao;
    }

    //métodos de acesso públicos

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDesc){
        this.#descricao = novaDesc;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo:this.#codigo,
            descricao:this.#descricao
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const marcaDAO = new MarcaDAO();
        await marcaDAO.gravar(this);
    }

    async excluir(){
        const marcaDAO = new MarcaDAO();
        await marcaDAO.excluir(this);
    }

    async atualizar(){
        const marcaDAO = new MarcaDAO();
        await marcaDAO.atualizar(this);

    }

    async consultar(parametro){
        const marcaDAO = new MarcaDAO();
        return await marcaDAO.consultar(parametro);
    }
    async possuiProdutos(){
        const marcaDAO = new MarcaDAO();
        return await marcaDAO.possuiProdutos(this);
    }
}