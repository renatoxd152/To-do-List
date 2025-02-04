import { Tarefa } from "@/app/models/Tarefas"
import { useTarefaService } from "@/app/services/tarefa.service"
import { useEffect, useState } from "react"
import { Home } from "./form"
export const CadastroTarefa = () =>
{
    const service = useTarefaService()

    const [tarefas, setTarefas] = useState<Tarefa[]>([])

    useEffect(() => {
        carregarTarefas()
    }, [])

    const carregarTarefas = async () => {
        const lista = await service.list()
        setTarefas(lista)
    }

    const handleSubmit = async (tarefa: Tarefa) => {
        await service.salvar(tarefa)
        setTarefas(prevTarefas => [...prevTarefas, tarefa]);
    }
    return(
        <Home onSubmit={handleSubmit} tarefas={tarefas}/>
    )
}

