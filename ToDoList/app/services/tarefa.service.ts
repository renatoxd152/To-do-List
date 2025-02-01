import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tarefa } from '../models/Tarefas';

const STORAGE_KEY = "@tarefas"
export const useTarefaService = () =>
{
    const list =  async ():Promise<Tarefa[]> =>
    {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            return jsonValue ? JSON.parse(jsonValue): [];
        } catch (error) {
            console.error('Erro ao obter tarefas:', error);
            return [];
        }

    }

    const salvar =  async (tarefa:Tarefa):Promise<void> =>
        {
            try {
                const tarefas = await list();
                tarefas.push(tarefa);
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
              } catch (error) {
                console.error('Erro ao salvar tarefa:', error);
              }
    
        }

    const deleteTarefas = async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Erro ao limpar tarefas:', error);
        }
        };
    return{
        list,
        salvar,
        deleteTarefas
    }
}