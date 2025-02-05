import { Tarefa } from "@/app/models/Tarefas";
import { useApiService } from "@/app/services/api.service";
import { useTarefaService } from "@/app/services/tarefa.service";
import React, { useEffect, useState } from "react";
import { Listagem } from "./ListagemComponente";
interface ListagemTarefasProps
{
    dadosAtualizadosTarefa:{
        arrayLocal: Tarefa[];
        arrayApi: Tarefa[];
    };
}
export const ListagemTarefas = ({dadosAtualizadosTarefa}:ListagemTarefasProps) => {
    const tarefas = useTarefaService();
    const tarefasApi = useApiService();
    const [listaTarefas, setListaTarefas] = useState<Tarefa[]>([]); 
    
    useEffect(() => {
        handleListTarefas();
    }, [dadosAtualizadosTarefa]);


    const handleListTarefas = async () => {
        try {
            let tarefasdaApi:Tarefa[] = [];
            if(dadosAtualizadosTarefa.arrayApi.length === 0)
            {
                tarefasdaApi = await tarefasApi.obterArray();
                setListaTarefas([...dadosAtualizadosTarefa.arrayLocal, ...tarefasdaApi]);
            }
            setListaTarefas([...dadosAtualizadosTarefa.arrayLocal, ...dadosAtualizadosTarefa.arrayApi]);
           
            
           
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };
    const deletar = async (tarefa: Tarefa) => {
        try {
            const existeNaListaLocal = listaTarefas.some(t => t.id === tarefa.id);
    
            if (existeNaListaLocal) {
                await tarefas.deleteTarefas(tarefa.id);
            } else {
                await tarefasApi.deleteTarefasApi(tarefa.id);
            }
            setListaTarefas(prevLista => prevLista.filter(t => t.id !== tarefa.id));
        } catch (error) {
            console.error("Erro ao deletar a tarefa:", error);
        }
    };

    const atualizarCheckboxItem = async (tarefa: Tarefa) => {
        try {
            setListaTarefas(prevTarefas =>
                prevTarefas.map(t => t.id === tarefa.id ? { ...t, checkbox: !t.checkbox } : t)
            );
            await tarefas.alternarCheckbox(tarefa);
        } catch (error) {
            console.error("Erro ao atualizar checkbox da tarefa:", error);
        }
    };

    return <Listagem data={listaTarefas} onDelete={deletar} onEdit={atualizarCheckboxItem}/>;
};
