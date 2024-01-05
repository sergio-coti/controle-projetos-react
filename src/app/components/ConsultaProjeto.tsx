import { useEffect, useState } from "react";
import axios from "axios";
import CadastroProjeto from "./CadastroProjeto";
import ConsultaEquipe from "./ConsultaEquipe";
import ConsultaSprint from "./ConsultaSprint";

//declarando o componente
const ConsultaProjeto = () => {
  
  //declarar uma variável para armazenar a lista com
  //os projetos obtidos da consulta da API
  const [projetos, setProjetos] = useState([]);

  //declarar uma variável para capturar o id do projeto selecionado
  const [projetoId, setProjetoId] = useState('');

  //função do REACT executada sempre que a página abre
  useEffect(() => {
    //fazendo uma requisição GET para consulta de projetos na API
    axios
      .get("http://localhost:8081/api/projeto")
      .then((response) => {
        //capturar o retorno de sucesso da API
        //armazenar o valor obtido da API na variável do useState
        setProjetos(response.data);
      })
      .catch((e) => {
        //capturar o retorno de erro da API
        console.log(e);
      });
  });

  //função para capturar o ID do projeto
  const handleButtonClick = (projetoId : string) => {
    setProjetoId(projetoId);
  }

  //função para retornar o conteúdo HTML
  //exibido pelo componente no navegador
  return (
    <div>
      <h1>Sistema de Controle de Projetos</h1>
      <p>Listagem de projetos cadastrados:</p>

      <div className="mb-2">
        <button
          className="btn btn-outline-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#cadastroProjeto"
        >
          Cadastrar Projeto
        </button>
      </div>

      <table className="table table-sm table-hover table-striped">
        <thead>
          <tr>
            <th>Nome do projeto</th>
            <th>Escopo</th>
            <th>Entrega</th>
            <th>Operações</th>
          </tr>
        </thead>
        <tbody>
          {
            //percorrendo a lista de projetos
            projetos.map((item: any) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.escopo}</td>
                <td>{item.dataEntrega}</td>
                <td width={300}>
                  <button
                    className="btn btn-sm btn-outline-success me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#equipes"
                    onClick={() => handleButtonClick(item.id)}
                  >
                    Equipes
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#sprints"
                    onClick={() => handleButtonClick(item.id)}
                  >
                    Sprints
                  </button>
                  <button className="btn btn-sm btn-outline-danger me-2">
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>Quantidade de projetos: {projetos.length}</td>
          </tr>
        </tfoot>
      </table>

      {/* Janela modal para exibir o cadastro de projeto */}
      <div className="modal fade" id="cadastroProjeto" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Cadastro de Projeto</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CadastroProjeto />
            </div>
          </div>
        </div>
      </div>

      {/* Janela modal para exibir as equipes do projeto */}
      <div className="modal modal-xl fade" id="equipes" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Equipes do projeto</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                <ConsultaEquipe projetoId={projetoId}/>
            </div>
          </div>
        </div>
      </div>

      {/* Janela modal para exibir as equipes do projeto */}
      <div className="modal modal-xl fade" id="sprints" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Detalhes do projeto</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                <ConsultaSprint projetoId={projetoId}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//tornando o componente público
export default ConsultaProjeto;
