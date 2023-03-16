import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import React from 'react';
import { updateTodoReducer } from '../redux/todosSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Checkbox = ({id, text, isCompleted, isToday, hour}) => {
  //evalua la propiedad isToday y renderiza el correspondiente
  const dispatch = useDispatch();
  const listTodos = useSelector(state => state.todos.todos);

  const handleCheckbox = () => {
    try{
      //llamamos a la funcion y le pasamos los payloads necesarios
      dispatch(updateTodoReducer({id, isCompleted}));
      //guardamos en el storage, como ya hemos pasado la linea de listTodos(14), la lista no se ha actualizado todavia, asi que la actualizamos
      AsyncStorage.setItem("@Todos", JSON.stringify(
        listTodos.map(todo => {
          //si el id es igual al id de la lista, cambiamos la propiedad isCompleted
          if(todo.id === id){
            return {...todo, isCompleted: !isCompleted}
          }
            return todo;
        })
      ))
      console.log("Save ok");
    } catch (e){ 
      console.log(e); 
    }
  }

  return isToday ? (
    <TouchableOpacity style={isCompleted ? styles.checked : styles.unChecked} onPress={handleCheckbox}>
       {isCompleted && <Icon name="check" size = {14} color="#fff"/>}       
    </TouchableOpacity>
  ) : (
    <View style={styles.isToday}></View>
  )
}

export default Checkbox

const styles = StyleSheet.create({
  checked: {
    width: 20,
    height: 20,
    marginRight: 13,
    borderRadius: 6,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: .3,
    shadowRadius: 5,
    elevation: 5,
  },
  unChecked:{
    width: 20,
    height: 20,
    marginRight: 13,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: .1,
    shadowRadius: 5,
    elevation: 5,
  },
  isToday: {
    width: 10,
    height: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#262626',
    marginRight: 13,
    marginLeft: 15,
  },
}) 