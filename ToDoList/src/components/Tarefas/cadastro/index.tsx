import { Tarefa } from "@/app/models/Tarefas"
import { useApiService } from "@/app/services/api.service"
import { useTarefaService } from "@/app/services/tarefa.service"
import { useEffect, useState } from "react"
import { Home } from "./form"
export const CadastroTarefa = () =>
{
    const service = useTarefaService()
    const apiService = useApiService();
    const [tarefas, setTarefas] = useState<{ arrayLocal: Tarefa[], arrayApi: Tarefa[] }>({
        arrayLocal: [],
        arrayApi: []
    });
    useEffect(() => {
        carregarTarefas()
    }, [])

    const carregarTarefas = async () => {
        const tarefasSalvas = await service.list();
        const tarefasLocalStorage = await apiService.obterArray();

        let tarefasApi: Tarefa[] = [];
       
        if (tarefasLocalStorage.length === 0) {
            console.log("oi")
            tarefasApi = await apiService.listarTodos();
            await apiService.salvarTarefasNoLocalStorage(tarefasApi);
        } else {
            tarefasApi = tarefasLocalStorage;
        }

        
        setTarefas({
            arrayLocal: tarefasSalvas,
            arrayApi: tarefasApi
        });
    };

    const handleSubmit = async (tarefa: Tarefa) => {
        await service.salvar(tarefa);
        setTarefas(prevTarefas => ({
            ...prevTarefas,
            arrayLocal: [...prevTarefas.arrayLocal, tarefa]
        }));
    };
    
    return(
        <Home onSubmit={handleSubmit} tarefas={tarefas}/>
    )
}

