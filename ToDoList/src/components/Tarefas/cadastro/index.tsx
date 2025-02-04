import { Tarefa } from "@/app/models/Tarefas"
import { useApiService } from "@/app/services/api.service"
import { useTarefaService } from "@/app/services/tarefa.service"
import { useEffect, useState } from "react"
import { Home } from "./form"
export const CadastroTarefa = () =>
{
    const service = useTarefaService()
    const apiService = useApiService();
    const [tarefas, setTarefas] = useState<Tarefa[]>([])

    useEffect(() => {
        carregarTarefas()
    }, [])


    const carregarTarefas = async () => {
        
        const tarefasSalvas = await service.list();

        const tarefasApi = await apiService.listarTodos();

        const listaFinal = [...tarefasSalvas, ...tarefasApi];

        setTarefas(listaFinal);
    };

    const handleSubmit = async (tarefa: Tarefa) => {
        await service.salvar(tarefa)
        setTarefas(prevTarefas => [...prevTarefas, tarefa]);
    }
    return(
        <Home onSubmit={handleSubmit} tarefas={tarefas}/>
    )
}

