import { Tarefa } from "@/app/models/Tarefas";
import { useApiService } from "@/app/services/api.service";
import { useTarefaService } from "@/app/services/tarefa.service";
import React, { useEffect, useState } from "react";
import { Listagem } from "./ListagemComponente";

interface ListagemTarefasProps {
    dadosAtualizadosTarefa: {
        arrayLocal: Tarefa[];
        arrayApi: Tarefa[];
    };
}

interface ListaTarefas {
    local: Tarefa[];
    api: Tarefa[];
}

export const ListagemTarefas = ({ dadosAtualizadosTarefa }: ListagemTarefasProps) => {
    const tarefas = useTarefaService();
    const tarefasApi = useApiService();
    const [listaTarefas, setListaTarefas] = useState<ListaTarefas>({ local: [], api: [] });

    useEffect(() => {
        handleListTarefas();
    }, [dadosAtualizadosTarefa]);

    const handleListTarefas = async () => {
        try {
            let tarefasdaApi: Tarefa[] = [];
            if (dadosAtualizadosTarefa.arrayApi.length === 0) {
                tarefasdaApi = await tarefasApi.obterArray();
                setListaTarefas({
                    local: dadosAtualizadosTarefa.arrayLocal,
                    api: tarefasdaApi,
                });
            } else {
                setListaTarefas({
                    local: dadosAtualizadosTarefa.arrayLocal,
                    api: dadosAtualizadosTarefa.arrayApi,
                });
            }
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };

    const deletar = async (tarefa: Tarefa) => {
        try {
            const existeNaListaLocal = listaTarefas.local.some(t => t.id === tarefa.id);
            if (existeNaListaLocal) {
                console.log("Deletando da lista local");
                await tarefas.deleteTarefas(tarefa.id);
                setListaTarefas(prevLista => ({
                    ...prevLista,
                    local: prevLista.local.filter(t => t.id !== tarefa.id),
                }));
            } else {
                console.log("Deletando da API");
                await tarefasApi.deleteTarefasApi(tarefa.id);
                setListaTarefas(prevLista => ({
                    ...prevLista,
                    api: prevLista.api.filter(t => t.id !== tarefa.id),
                }));
            }
        } catch (error) {
            console.error("Erro ao deletar a tarefa:", error);
        }
    };

    const atualizarCheckboxItem = async (tarefa: Tarefa) => {
        try {
            setListaTarefas(prevTarefas => ({
                ...prevTarefas,
                local: prevTarefas.local.map(t => t.id === tarefa.id ? { ...t, checkbox: !t.checkbox } : t),
                api: prevTarefas.api.map(t => t.id === tarefa.id ? { ...t, checkbox: !t.checkbox } : t),
            }));
            await tarefas.alternarCheckbox(tarefa);
        } catch (error) {
            console.error("Erro ao atualizar checkbox da tarefa:", error);
        }
    };

    const combinedTarefas = [...listaTarefas.local, ...listaTarefas.api];

    return <Listagem data={combinedTarefas} onDelete={deletar} onEdit={atualizarCheckboxItem} />;
};
