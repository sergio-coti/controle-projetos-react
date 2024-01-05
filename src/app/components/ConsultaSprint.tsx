import axios from "axios";
import { useEffect, useState } from "react";

const ConsultaSprint: React.FC<{ projetoId: string }> = ({ projetoId }) => {
  //variável para capturar as equipes obtidas da API
  const [sprints, setSprints] = useState([]);

  const [nome, setNome] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (projetoId != "") {
      consultarSprints(projetoId);
    }
  }, [projetoId]);

  //função para consultar as equipes
  const consultarSprints = (projetoId: string) => {
    //consultando as equipes na API
    axios
      .get("http://localhost:8081/api/sprint/" + projetoId)
      .then((result) => {
        setSprints(result.data);
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
      .post("http://localhost:8081/api/sprint", {
        nome,
        dataInicio,
        dataFim,
        projetoId,
      })
      .then((result) => {
        //capturando a resposta de sucesso da API
        //exibindo mensagem:
        alert(`Sprint cadastrada com sucesso!\nID: ${result.data}`);
        //limpar o campo do formulário
        setNome("");
        setDataInicio("");
        setDataFim("");
        //fazendo uma nova consulta
        consultarSprints(projetoId);
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
              <label>Nome da sprint:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o nome aqui"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label>Data de início:</label>
              <input
                type="date"
                className="form-control"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label>Data de fim:</label>
              <input
                type="date"
                className="form-control"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="submit"
                className="btn btn-outline-success mt-4"
                value="Cadastrar Sprint"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="table-responsive mb-3">
        <table className="table table-sm table-hover table-striped">
          <thead>
            <tr>
              <th>Nome da sprint</th>
              <th>Data de início</th>
              <th>Data de fim</th>
              <th>Operações</th>
            </tr>
          </thead>
          <tbody>
            {sprints.map((item: any) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.dataInicio}</td>
                <td>{item.dataFim}</td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#tarefas"
                  >
                    Tarefas da sprint
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
              <td colSpan={4}>
                Quantidade de sprints do projeto: {sprints.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Janela modal para exibir as tarefas da sprint */}
      <div className="modal modal-lg fade" id="tarefas" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Tarefas da sprint</h1>
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

export default ConsultaSprint;
