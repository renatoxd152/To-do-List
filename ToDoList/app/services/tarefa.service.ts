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

        const deleteTarefas = async (id: string): Promise<void> => {
            try {
                const tarefas = await list(); 
                const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
        
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novasTarefas));
            } catch (error) {
                console.error('Erro ao remover tarefa:', error);
            }
        };

        const atualizar = async (tarefaAtualizada: Tarefa): Promise<void> => {
            try {
                const tarefas = await list();
                const novasTarefas = tarefas.map(tarefa =>
                    tarefa.id === tarefaAtualizada.id ? { ...tarefa, ...tarefaAtualizada } : tarefa
                );
    
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novasTarefas));
            } catch (error) {
                console.error('Erro ao atualizar tarefa:', error);
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
        list,
        salvar,
        deleteTarefas,
        atualizar,
        alternarCheckbox
    }
}