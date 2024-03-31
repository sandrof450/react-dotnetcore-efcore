import { useEffect, useState } from 'react'

const atividadeInicial = {
    id: 0,
    titulo: '',
    prioridade: 0,
    descricao: ''
}

export default function AtividadeForm(props) {
    const [atividade, setAtividade] = useState({AtividadeAtual})

    //Toda vez que for construido o component o useefect será executado.
    //Toda vez que alterar o estado do component o useefect também será executado.
    //Caso seja colocado "conchetes"([]) ao lado da arrow function separando com virgula, ele será executado apenas uma vez.
    //Dentro do conchetes([]) indica em qual momento irá executa o use efect, por exemplo se eu colocar o "estado" "atividade", então ele so executará no caso do estado da atividade ser alterado.
    useEffect(() => {
        if(props.atividadeSelecionada.id !== 0){
            setAtividade(props.atividadeSelecionada)
        }
    }, [props.atividadeSelecionada])

    const inputTextHandler = (e) => {
        const {name, value} = e.target;
        
        setAtividade({...atividade, [name] : value});//Adicionando mais uma propiedade ao seu objeto
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(props.atividadeSelecionada.id !== 0){
            props.atualizarAtividade(atividade);
        }
        else {
            props.addAtividade(atividade);
        }
        setAtividade(atividadeInicial)
    }

    const handleCancelar = (e) => {
        e.preventDefault();//Função utilizada para que o submit não realize seu comportamento padrão de recarregar a pagina toda vez que enviar o form
        
        props.cancelarAtividade();

        setAtividade(atividadeInicial)
    }

    function AtividadeAtual(){
        debugger;
        if(props.atividadeSelecionada.id !== 0){
            return props.atividadeSelecionada;
        }
        else{
            return atividadeInicial;
        }
    }

    console.log(props.atividadeSelecionada);
    console.log(atividade);

    return (
        <>
            <h1>Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
        
            <form className="row g-3" onSubmit={handleSubmit}>

                    <div className="col-md-6">
                        <label className="form-label">Título</label>
                        <input 
                            name='titulo'
                            value={atividade.titulo}
                            onChange={inputTextHandler}
                            id='titulo' 
                            type='text' 
                            className="form-control" 
                        />
                    </div>

                    <div className="col-md-6">
                            <label className="form-label">Prioridade</label>
                            <select 
                                name='prioridade'
                                value={atividade.prioridade}
                                onChange={inputTextHandler}
                                id="prioridade" 
                                className="form-select">
                                <option defaultValue={'0'}>Selecione</option>
                                <option value={'1'}>Baixa</option>
                                <option value={'2'}>Normal</option>
                                <option value={'3'}>Alta</option>
                            </select>
                    </div>                    

                    <div className="col-md-12">
                            <label className="form-label">Descrição</label>
                            <textarea
                                name='descricao'
                                value={atividade.descricao}
                                onChange={inputTextHandler}
                                id='descricao' 
                                type='text' 
                                className="form-control" 
                            />
                    
                    <hr/>

                    </div>

                    <div className="col-12 mt-0">
                        {
                            props.atividadeSelecionada.id === 0 ?
                            <button 
                                className='btn btn-outline-secondary' 
                                type='submit'

                            >   
                            <i className='fas fa-plus me-2'></i>                             
                                Atividade
                            </button>
                            :
                            <>
                                <button className='btn btn-outline-success me-2' type='submit'>
                                <i className='fas fa-plus me-2'></i> 
                                    Salvar
                                </button>

                                <button 
                                    className='btn btn-outline-warning' 
                                    onClick={handleCancelar}
                                >
                                <i className='fas fa-plus me-2'></i>
                                    Cancelar
                                </button>
                            </>
                        }
                            
                    </div>

            </form>
        </>
    )
}
