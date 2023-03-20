import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Checkbox from './Checkbox'
import moment from 'moment'
//con la libreria moment, convertimos la fecha en formato hora('LT')
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoReducer } from '../redux/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Todo = ({id, text, isCompleted, isToday, hour}) => {  

  //actualiza el checkbox cuando el todo pase de tomorrow a today
  const [thisTodoIsToday, setThisTodoIsToday] = hour ? useState(moment(new Date(hour)).isSame(moment(), 'day')) : useState(false);
  const [localHour, setLocalHour] = useState(new Date(hour));
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const handleDeleteTodo = async () => {
    dispatch(deleteTodoReducer(id));
    try{
      await AsyncStorage.setItem("@Todos", JSON.stringify(
        todos.filter(todo => todo.id !== id)
      ));
      console.log("Deleted");
    }catch(e){
      console.log(e);
    }
  };

  return (   

    <View style = {styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox 
          id={id}
          text={text}
          isCompleted={isCompleted}
          isToday={thisTodoIsToday}
          hour={hour}
        />
        <View>
          <Text style={isCompleted ? styles.textCompleted : styles.text}>{text}</Text>
          <Text style={isCompleted ? styles.hourCompleted : styles.hour}>{moment(localHour).format('LT')}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleDeleteTodo}>
        <DeleteIcon name="delete-outline" size={20} color="black"/>
      </TouchableOpacity>
      
    </View>
  )
}

export default Todo

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'darkslateblue',
  },
  textCompleted: {
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  hour: {
    fontSize: 13,
    color: 'gray',
    fontWeight: 'bold',
  }, 
  hourCompleted: {
    fontSize: 13,
    color: 'gray',
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },

});



