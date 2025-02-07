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

    const list = async():Promise<Tarefa[]>=>
    {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            return jsonValue ? JSON.parse(jsonValue): [];
        } catch (error) {
            console.error('Erro ao obter tarefas:', error);
            return [];
        }
    }

    const salvarTarefasNoLocalStorage = async (tarefas: Tarefa[]) => {
        try {
            const tarefasExistentes = await AsyncStorage.getItem(STORAGE_KEY);
            
            if (tarefasExistentes) return;
        
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
        } catch (error) {
            console.error('Erro ao salvar tarefas:', error);
        }
    };

    const deleteTarefasApi = async (id: string): Promise<void> => {
        try {
            const tarefas = await list(); 
            const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
    
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novasTarefas));
        } catch (error) {
            console.error('Erro ao remover tarefa:', error);
        }
    };
    
    
    const obterArray = async (): Promise<Tarefa[]> => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            return jsonValue ? JSON.parse(jsonValue) : [];
        } catch (error) {
            console.error('Erro ao obter tarefas:', error);
            return [];
        }
    };
    

    const alternarCheckbox = async (tarefa: Tarefa): Promise<void> => {
        try {
            const tarefas = await list();
            const novasTarefas = tarefas.map(t =>
                t.id === tarefa.id ? { ...t, checkbox: !t.checkbox } : t
            );

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novasTarefas));
            
        } catch (error) {
            console.error('Erro ao alternar checkbox da tarefa:', error);
        }
    };


    return{
        listarTodos,
        salvarTarefasNoLocalStorage,
        obterArray,
        deleteTarefasApi,
        list,
        alternarCheckbox
    }
}