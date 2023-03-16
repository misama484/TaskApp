import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import Todo from "./Todo";

const TodoList = ({todosData}) => {
  return (
   <FlatList 
    data={todosData}
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) => <Todo {...item}/>}
     
    />
  );
}



export default TodoList;

