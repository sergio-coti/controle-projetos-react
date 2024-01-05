import axios from "axios";
import { useEffect, useState } from "react";

const ConsultaEquipe: React.FC<{ projetoId: string }> = ({ projetoId }) => {
  //variável para capturar as equipes obtidas da API
  const [equipes, setEquipes] = useState([]);

  const [nome, setNome] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (projetoId != "") {
      consultarEquipes(projetoId);
    }
  }, [projetoId]);

  //função para consultar as equipes
  const consultarEquipes = (projetoId: string) => {
    //consultando as equipes na API
    axios
      .get("http://localhost:8081/api/equipe/" + projetoId)
      .then((result) => {
        setEquipes(result.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  //função para capturar o SUBMIT do formulário
  const handleSubmit = async (e: any) => {
    //anular o recarregamento da página
    //provocado pelo SUBMIT do formulário
    e.preventDefault();

    //limpar os erros
    setErrors([]);

    //realizando uma chamada POST para API
    axios
      .post("http://localhost:8081/api/equipe", {
        nome,
        projetoId,
      })
      .then((result) => {
        //capturando a resposta de sucesso da API
        //exibindo mensagem:
        alert(`Equipe cadastrada com sucesso!\nID: ${result.data}`);
        //limpar o campo do formulário
        setNome('');
        //fazendo uma nova consulta
        consultarEquipes(projetoId);
      })
      .catch((error) => {
        //capturando a resposta de erro da API
        //capturando os erros obtidos
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div>
      <div className="mb-3">
        <ul>
          {errors.map((item) => (
            <li className="text-danger">{item}</li>
          ))}
        </ul>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <label>Nome da equipe:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o nome aqui"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="col-md-8">
              <input
                type="submit"
                className="btn btn-outline-success mt-4"
                value="Cadastrar Equipe"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="table-responsive mb-3">
        <table className="table table-sm table-hover table-striped">
          <thead>
            <tr>
              <th>Nome da equipe</th>
              <th>Operações</th>
            </tr>
          </thead>
          <tbody>
            {equipes.map((item: any) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#membros"
                  >
                    Membros da equipe
                  </button>
                  <button className="btn btn-outline-warning btn-sm me-2">
                    Editar
                  </button>
                  <button className="btn btn-outline-danger btn-sm me-2">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>
                Quantidade de equipes do projeto: {equipes.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Janela modal para exibir as equipes do projeto */}
      <div className="modal modal-lg fade" id="membros" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Membros da equipe</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultaEquipe;
