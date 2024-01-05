import { useState } from "react";
import axios from "axios";

//declarando o componente
const CadastroProjeto = () => {

    //declarar as variáveis do componente
    const [nome, setNome] = useState("");
    const [escopo, setEscopo] = useState("");
    const [dataEntrega, setDataEntrega] = useState("");
    const [errors, setErrors] = useState([]);

    //função para capturar o SUBMIT do formulário
    const handleSubmit = async (e: any) => {

        //anular o recarregamento da página
        //provocado pelo SUBMIT do formulário
        e.preventDefault();

        //limpar os erros
        setErrors([]);

        //realizando uma chamada POST para API
        axios.post('http://localhost:8081/api/projeto', {
            nome, escopo, dataEntrega /* campos do formulário */
        })
        .then((result) => { //capturando a resposta de sucesso da API
            //exibindo mensagem:
            alert(`Projeto cadastrado com sucesso!\nID: ${result.data}`);
            //recarregar a página
            location.reload();
        })
        .catch((error) => { //capturando a resposta de erro da API
            //capturando os erros obtidos
            setErrors(error.response.data.errors);
        });
    }

    //conteúdo HTML exibido pelo componente
    return(
        <div>           

            <ul>
                {
                    errors.map((item) => (
                        <li className="text-danger">
                            {item}
                        </li>
                    ))
                }
            </ul>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Nome do projeto:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Digite aqui"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        />
                </div>
                <div className="mb-3">
                    <label>Escopo do projeto:</label>
                    <textarea 
                        className="form-control"
                        value={escopo}
                        onChange={(e) => setEscopo(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label>Data de entrega:</label>
                    <input 
                        type="date" 
                        className="form-control"
                        value={dataEntrega}
                        onChange={(e) => setDataEntrega(e.target.value)}
                    />
                </div>
                <div className="mb-3 d-grid">
                    <input type="submit" className="btn btn-outline-success"
                        value="Realizar Cadastro"/>
                </div>
            </form>

        </div>
    )
}

//tornando o componente público
export default CadastroProjeto;