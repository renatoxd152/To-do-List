import { Tarefa } from "@/app/models/Tarefas";
import React from "react";
import { FlatList, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ListagemProps
{
  data:Tarefa[];
  onDelete:(tarefa:Tarefa) =>void;
  onEdit:(tarefa:Tarefa)=>void;
}

export const Listagem:React.FC<ListagemProps> = ({
    data,
    onDelete,
    onEdit
}) =>
{
  const toggleCheckbox = (tarefa: Tarefa) => {
    const updatedTarefa = { ...tarefa, checkbox: !tarefa.checkbox };
    onEdit(updatedTarefa);
};

  
  const Item: React.FC<{ tarefa: Tarefa }> = ({ tarefa }) => {
    const { titulo, descricao } = tarefa;

    return (
        <View style={styles.item}>
            <View style={styles.itemContent}>
                <View style={styles.textWrapper}>
                <CheckBox
                  checked={tarefa.checkbox}
                  onPress={() => toggleCheckbox(tarefa)}
              />

                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{titulo}</Text>
                        <Text style={styles.descricao}>{descricao}</Text>
                    </View>
                </View>
                <Pressable style={{marginRight:"20%"}} onPress={() => onDelete(tarefa)}>
                    <Icon name="delete" size={30} color="red" />
                </Pressable>
            </View>
        </View>
    );
};


    return(
        <SafeAreaProvider style={{width:"100%"}}>
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                  
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Item tarefa={item} />}
                    keyExtractor={item => item.id}
                />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#F5F5F5',
  },
  item: {
    backgroundColor: '#FFF',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 12, 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  descricao: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
