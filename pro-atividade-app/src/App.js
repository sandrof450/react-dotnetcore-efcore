import { Fragment, useEffect, useState } from 'react';
import './App.css';
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';


function App() {
    const [index, setIndex] = useState(0);
    const [atividades, setAtividades] = useState([]);
    const [atividade, setAtividade] = useState({id: 0});

    console.log(atividade);

    useEffect(() => {
        atividades.length <= 0 ? setIndex(1) 
        : setIndex(Math.max.apply(Math, atividades.map(item => item.id)) + 1)//A função max.apply traz o maior valor do atribito que eu colocar na minha arrow function,)
    }, [atividades]);

    function addAtividade(ativ){
        //Um evento padrão de um botão dentro do form é que ele seja uma submit
        //isso faz com que toda vez que clique no botão recarregue a pagina.
        //event.preventDefault();//Essa função previne que aconteça o evento padrão do  botão dentro do formulario

        //atividades.push(atividade);

        //Utilização do Spread Operator(...) serve para quando fazemos uma alteração do array. Caso não utilizarmos o "Spread Operator" ele ocorrerá um erro, pois no momento de inserir o novo elemnto no array sem o Spread Operator fará com que o array se perca.
        setAtividades([...atividades, 
            {...ativ, id: index}]
        );
    }

    function atualizarAtividade(ativ){
        setAtividades(atividades.map(item => item.id === ativ.id ? ativ : item))
        setAtividade({id: 0});
    }

    function cancelarAtividade(){
        setAtividade({id: 0})
    }

    function deleteAtividade(id){
        const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id);
        
        setAtividades([...atividadesFiltradas]);
    }

    function pegarAtividade(id)
    {
        const atividade = atividades.filter(atividade => atividade.id === id);

        setAtividade(atividade[0])
    }

    return (
        <Fragment>
            <AtividadeForm 
                addAtividade = {addAtividade}//Passando o método addAtividade como parametro para o component AtividadeForm. Dentro do componet é utilizada a função addAtividade, mas precisa ser passada para o component que eu quero usar.
                cancelarAtividade = {cancelarAtividade}
                atividades = {atividades}
                atividadeSelecionada = {atividade}
                atualizarAtividade = {atualizarAtividade}
            />

            <AtividadeLista 
                atividades = {atividades}
                deleteAtividade = {deleteAtividade}
                pegarAtividade = {pegarAtividade}
            />

        </Fragment>
    
    );
}

export default App;