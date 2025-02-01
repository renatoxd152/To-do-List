import { Tarefa } from "@/app/models/Tarefas"
import { useTarefaService } from "@/app/services/tarefa.service"
import { Home } from "./form"
export const CadastroTarefa = () =>
{
    const service = useTarefaService()
    const handleSubmit = (tarefa:Tarefa) =>
    {
        service.salvar(tarefa)
    }   
    return(
        <Home onSubmit={handleSubmit}/>
    )
}

