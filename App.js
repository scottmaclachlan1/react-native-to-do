import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import TaskItem from './componets/tasks';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = useCallback(() => {
    setTask(currentTask => {
      if (!currentTask?.trim()) {
        return currentTask; // Don't add empty tasks
      }
      Keyboard.dismiss();
      setTaskItems(prev => [...prev, currentTask.trim()]);
      return '';
    });
  }, []);

  const completeTask = useCallback((index) => {
    setTaskItems(prev => prev.filter((_, i) => i !== index));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          {taskItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => completeTask(index)}
              accessibilityLabel={`Complete task: ${item}`}
              accessibilityHint="Tap to mark this task as complete"
            >
              <TaskItem text={item} />
            </TouchableOpacity>
          ))}
        </View>
      </View> 

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput 
          style={styles.input} 
          placeholder="Write a task" 
          value={task} 
          onChangeText={setTask}
          accessibilityLabel="Task input"
          accessibilityHint="Enter a new task to add to your list"
          returnKeyType="done"
          onSubmitEditing={handleAddTask}
        />
        <TouchableOpacity 
          onPress={handleAddTask}
          accessibilityLabel="Add task"
          accessibilityHint="Add the current task to your list"
        >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
