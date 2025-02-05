import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

export default function GoalsApp() {
  const [goalsList, updateGoalsList] = useState([]);
  const [goalInput, setGoalInput] = useState('');
  const [copilotVisible, setCopilotVisible] = useState(false);
  const webViewRef = useRef(null);

  const addGoalHandler = () => {
    if (goalInput.trim().length === 0) return;
    updateGoalsList(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), name: goalInput },
    ]);
    setGoalInput('');
  };

  const removeGoalHandler = id => {
    updateGoalsList(currentGoals => currentGoals.filter(goal => goal.id !== id));
  };


  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your goal..."
          value={goalInput}
          onChangeText={text => setGoalInput(text)}
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>

      <View style={styles.goalsContainer}>
        <FlatList
          data={goalsList}
          renderItem={({ item }) => (
            <View style={styles.goalItem}>
              <Text>{item.name}</Text>
              <Button title="Remove" onPress={() => removeGoalHandler(item.id)} />
            </View>
          )}
          keyExtractor={item => item.id}
          alwaysBounceVertical={false}
        />
      </View>

      <TouchableOpacity
        style={styles.copilotButton}
        onPress={() => setCopilotVisible(!copilotVisible)}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={30} color="white" />
      </TouchableOpacity>

      {copilotVisible && (
        <View style={styles.copilotContainer}>
          <WebView
            ref={webViewRef}
            source={{
              uri: 'https://copilotstudio.microsoft.com/environments/Default-063fad6b-e190-4c69-a9ca-1721c758a752/bots/cr503_copyOfYui/webchat?_version_=2',
            }}
            style={{ flex: 1 }}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setCopilotVisible(false)}>
            <Ionicons name="close-circle-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#cccccc',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 5,
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 4,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  copilotButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  copilotContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 300,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});