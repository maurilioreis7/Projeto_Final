import React,{useState,useEffect} from "react";
import '../../global.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import { Link, useNavigate } from "react-router-dom";
import {FiEdit,FiTrash, FiAlignJustify } from "react-icons/fi";
import Barrasuperior from "../componentes/barrasuperior";

export default function Produto(){

    const navigate = useNavigate();
    const [produtos,setProdutos] = useState([]);
    const [quantidade,setQuantidade] = useState(0);
    
    function mostrarprodutos(){
        const banco = JSON.parse(localStorage.getItem("produtos")|| "[]")
        setQuantidade(banco.length)
        setProdutos(banco);


    }
    // function editarcliente(id){
    //     alert(`Estou editando clienete de id:${id}`)
    //     navigate(`/editarusuario/${id}`)
    //    }


    const excluirproduto = (id) => {
      confirmAlert({
        title: 'Excluir produto',
        message: 'Deseja realmente excluir esse produto?',
        buttons: [
          {
            label: 'Sim',
            onClick: () => {
              try {
                // Obtém a lista de produtos
                const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
                
                // Filtra a lista para remover o produto com o id especificado
                const dadosvelhos = banco.filter(linha => linha.id !== id);
                
                // Atualiza o localStorage com a lista filtrada
                localStorage.setItem("produtos", JSON.stringify(dadosvelhos));
                
                // Atualiza a visualização dos produtos
                mostrarprodutos();  // Verifique se mostrarprodutos é uma função assíncrona
              } catch (error) {
                console.error('Erro ao excluir produto:', error);
                alert('Ocorreu um erro ao tentar excluir o produto.');
              }
            }
          },
          {
            label: 'Não',
            onClick: () => alert('Ação cancelada!')
          }
        ]
      });
    };
    

    useEffect(()=>{
        mostrarprodutos()

    },[])

    return(
        <div className="dashboard-container">
        <Barrasuperior />
        <div className="header">
                <div className="menu">
                    <Menu />
                </div>
                <div className="main">
                   <FiAlignJustify className="btn-menu"/>
                  <Head title="Lista de Produto"  />
                  <Link to="/cadastroproduto" className='btn-novo'>Novo</Link> 
                   <table>
                    <tr>
                     <th>ID</th>
                     <th>Descricao</th>
                     <th>Valor Unitário</th>
                     <th></th>
                     <th></th>
                    </tr>
                    
                        {
                          produtos.map((linha)=>{
                             return(
                                <tr key={linha.toString()}>
                                <td>{linha.id}</td>
                                <td>{linha.descricao}</td>
                                <td>{linha.valor_unitario}</td>
                                {/* <td>
                                    <FiEdit size={24} color="blue" cursor="pointer" onClick={(e)=>{editarcliente(linha.id)}} />
                                </td>
                                <td>
                                    <FiTrash size={24} color="red" cursor="pointer" onClick={(e)=>{excluircliente(linha.id)}}/>
                                </td> */}
                                </tr>
                             )
                          })  
                        }
             
                     <tr>
                      <th colSpan={5}>Total de Registros:{quantidade}</th>
           
                     </tr>
                   </table>
        
        
        
                </div>
                </div>
                
        </div>
            )
        
       
    
}