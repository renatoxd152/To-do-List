import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosResponse } from 'axios';
import { httpClient } from "../http";
import { Tarefa } from "../models/Tarefas";
const resourceURL:string = "/posts";
const STORAGE_KEY = "tarefasApi"
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

    const salvarTarefasNoLocalStorage = async (tarefas: Tarefa[]) => {
        const tarefasExistentes = localStorage.getItem(STORAGE_KEY);
        
        if (tarefasExistentes) return;
    
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    };

    const deleteTarefasApi = async (id: string): Promise<void> => {
        try {
            const tarefas = await listarTodos(); 
            const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
    
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novasTarefas));
        } catch (error) {
            console.error('Erro ao remover tarefa:', error);
        }
    };
    
    const obterArray = async (): Promise<Tarefa[]> => {
        const tarefasLocalStorage = localStorage.getItem(STORAGE_KEY);
        return tarefasLocalStorage ? JSON.parse(tarefasLocalStorage) as Tarefa[] : [];
    };


    return{
        listarTodos,
        salvarTarefasNoLocalStorage,
        obterArray,
        deleteTarefasApi
    }
}