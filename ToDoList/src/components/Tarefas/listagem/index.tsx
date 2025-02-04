import { Tarefa } from "@/app/models/Tarefas";
import { useTarefaService } from "@/app/services/tarefa.service";
import { useEffect, useState } from "react";
import { Listagem } from "./ListagemComponente";

export const ListagemTarefas = () => {
    const tarefas = useTarefaService();
    const [listaTarefas, setListaTarefas] = useState<Tarefa[]>([]);

    useEffect(() => {
        handleListTarefas();
    }, []);

    const handleListTarefas = async () => { 
        try {
            const tarefasLista = await tarefas.list();
            setListaTarefas(tarefasLista);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };

    const deletar = async (tarefa:Tarefa) =>
    {
       try{
        await tarefas.deleteTarefas(tarefa.id).then(response=>
        {
            const listaAlterada = listaTarefas?.filter(t=>t.id != tarefa.id)
            setListaTarefas(listaAlterada)
        }
        )
       }
       catch(error)
       {
        console.error("Erro ao deletar a tarefa:",error)
       }
    }

    const editar = async(tarefasNovas:Tarefa) =>
    {
        try {
           tarefas.atualizar(tarefasNovas);
           const tarefasAtualizadas= await tarefas.list();
           setListaTarefas(tarefasAtualizadas);
        } catch (error) {
            console.error("Erro ao atualizar as tarefas",error)
        }
    }

    
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
