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
}

export const Listagem:React.FC<ListagemProps> = ({
    data,
    onDelete
}) =>
{
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const toggleCheckbox = (id: string) => {
    setCheckedItems(prev => ({
        ...prev,
        [id]: !prev[id],
    }));
  };

  
  const Item: React.FC<{ tarefa: Tarefa }> = ({ tarefa }) => {
    const { id, titulo, descricao } = tarefa;

    return (
        <View style={styles.item}>
            <View style={styles.itemContent}>
                <CheckBox
                    checked={!!checkedItems[id]}
                    onPress={() => toggleCheckbox(id)}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{titulo}</Text>
                    <Text style={styles.descricao}>{descricao}</Text>
                    <Pressable onPress={() => onDelete(tarefa)}>
                        <Icon name="delete" size={30} color="red" />
                    </Pressable>
                </View>
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
    },
    title: {
      fontSize: 18,
    }, 
    descricao: {
        fontSize: 14,
        color: 'black',
      },
      itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      textContainer: {
        marginLeft: 10,
        flex: 1,
      },
  });