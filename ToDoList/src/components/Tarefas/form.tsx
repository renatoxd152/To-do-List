import { Tarefa } from '@/app/models/Tarefas';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Input } from '../common';

export const Home = () => {
  const[modalVisible,setModalVisible] = useState(false);
  const{register,setValue,handleSubmit} = useForm<Tarefa>()
  const onSubmit = (data:Tarefa) => Alert.alert(data.titulo, data.descricao)

  useEffect(()=> 
{
    register('titulo'),
    register('descricao')
},[register])
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal animationType='slide' 
      transparent={true} 
      visible={modalVisible}
      onRequestClose={()=>{
        Alert.alert("Modal has been closed");
        setModalVisible(!modalVisible)
      }}
      >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>

            <Input 
            styleInput={styles.input} 
            styleIcon={styles.icon}
            styleView={styles.inputContainer}
            nameIcon='title'
            colorIcon='gray'
            onChange={text=>setValue('titulo',text)} 
            sizeIcon={30}
            placeHolder="Título" 
            keyboardType='default'/>

            <Input 
            styleInput={styles.input} 
            styleIcon={styles.icon}
            styleView={styles.inputContainer}
            nameIcon='description'
            colorIcon='gray'
            sizeIcon={30}
            onChange={text=>setValue('descricao',text)} 
            placeHolder="Descrição" 
            keyboardType='default'/>

              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}>
                  <Icon name="close" size={30} color="gray" />
              </Pressable>

              <Pressable
                style={styles.buttonConfirm}
                onPress={() =>{
                    handleSubmit(onSubmit)
                    setModalVisible(!modalVisible)
                }}>
                <Icon name="check" size={30} color="gray" />
            </Pressable>


            </View>
          </View>
      </Modal>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position:'absolute',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    bottom:20,
    right:20
  },centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    top:0,
    left:0,
    position:"absolute",
    padding:10
  },
  buttonConfirm: {
    top:0,
    right:0,
    position:"absolute",
    padding:10
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:10,
    flex: 1,
    height: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 8,
    width: '100%'
  },
  icon: {
    marginRight: 10
  }
  
});

export default Home;
