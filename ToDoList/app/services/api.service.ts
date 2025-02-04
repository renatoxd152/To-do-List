import { AxiosResponse } from 'axios';
import { httpClient } from "../http";
import { Tarefa } from "../models/Tarefas";
const resourceURL:string = "/posts";

export const useApiService = () =>
{
    const listarTodos = async (): Promise<Tarefa[]> => {
        const response: AxiosResponse<any[]> = await httpClient.get<any[]>(resourceURL);
        
        const tarefas: Tarefa[] = response.data.map(item => ({
            id: String(item.id),
            titulo: item.title,
            descricao: item.body,
            checkbox: false
        }));
    
        return tarefas;
    };

    const salvarTarefasNoLocalStorage = async () => {
        const tarefas = await listarTodos();
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    };
    

    return{
        listarTodos,
        salvarTarefasNoLocalStorage
    }
}