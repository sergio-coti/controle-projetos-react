'use client'; //habilitar as funções do REACT

//importando os componentes
import ConsultaProjeto from "./components/ConsultaProjeto";

//declaração do componente
export default function Home() {

  //Exibir o código HTML do componente
  return (
   <div className="container mt-4">
      <ConsultaProjeto/>
   </div>
  )
}
