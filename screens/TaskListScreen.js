import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TaskListScreen() {
  return (
    <View style={styles.container}>
      <Text>Lista de Tarefas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});
