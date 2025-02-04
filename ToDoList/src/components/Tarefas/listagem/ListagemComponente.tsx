import { Tarefa } from "@/app/models/Tarefas";
import React, { useState } from "react";
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
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const toggleCheckbox = (tarefa: Tarefa) => {
    const updatedTarefa = { ...tarefa, checkbox: !tarefa.checkbox };
    onEdit(updatedTarefa);
};

  
  const Item: React.FC<{ tarefa: Tarefa }> = ({ tarefa }) => {
    const { id, titulo, descricao,checkbox } = tarefa;

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
                <Pressable onPress={() => onDelete(tarefa)}>
                    <Icon name="delete" size={30} color="red" />
                </Pressable>
            </View>
        </View>
    );
};


    return(
        <SafeAreaProvider>
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
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
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
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  }, 
  descricao: {
      fontSize: 14,
      color: 'black',
  },
});
