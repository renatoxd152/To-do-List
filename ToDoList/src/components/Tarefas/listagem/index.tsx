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
    searchTerm: string;
}

interface ListaTarefas {
    local: Tarefa[];
    api: Tarefa[];
}

export const ListagemTarefas = ({ dadosAtualizadosTarefa, searchTerm }: ListagemTarefasProps) => {
    const tarefas = useTarefaService();
    const tarefasApi = useApiService();
    const [listaTarefas, setListaTarefas] = useState<ListaTarefas>({ local: [], api: [] });

    useEffect(() => {
        handleListTarefas();
    }, [dadosAtualizadosTarefa, searchTerm]);

    const handleListTarefas = async () => {
        try {
            let tarefasdaApi: Tarefa[] = [];
            if (dadosAtualizadosTarefa.arrayApi.length === 0) {
                tarefasdaApi = await tarefasApi.obterArray();
            } else {
                tarefasdaApi = dadosAtualizadosTarefa.arrayApi;
            }

            const filteredLocal = filtrarTarefas(dadosAtualizadosTarefa.arrayLocal, searchTerm);
            const filteredApi = filtrarTarefas(tarefasdaApi, searchTerm);

            setListaTarefas({
                local: filteredLocal,
                api: filteredApi,
            });
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


    const filtrarTarefas = (tarefas: Tarefa[], searchTerm: string): Tarefa[] => {
        return tarefas.filter(tarefa =>
            tarefa.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };
    
    const atualizarCheckboxItem = async (tarefa: Tarefa) => {
        try {
            const isLocal = listaTarefas.local.some(t => t.id === tarefa.id);

            if (isLocal) {
                setListaTarefas(prevTarefas => ({
                    ...prevTarefas,
                    local: prevTarefas.local.map(t => t.id === tarefa.id ? { ...t, checkbox: !t.checkbox } : t),
                }));
                await tarefas.alternarCheckbox(tarefa);
            } else {
                setListaTarefas(prevTarefas => ({
                    ...prevTarefas,
                    api: prevTarefas.api.map(t => t.id === tarefa.id ? { ...t, checkbox: !t.checkbox } : t),
                }));
                await tarefasApi.alternarCheckbox(tarefa);
            }
        } catch (error) {
            console.error("Erro ao atualizar checkbox da tarefa:", error);
        }
    };

    const combinedTarefas = [...listaTarefas.local, ...listaTarefas.api];

    return <Listagem data={combinedTarefas} onDelete={deletar} onEdit={atualizarCheckboxItem} />;
};