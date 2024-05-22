import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const MessagingScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "employee",
      recipient: "rh",
      content: "Bonjour, j'ai une question concernant le travail",
      timestamp: new Date(),
    },
    {
      id: 2,
      sender: "rh",
      recipient: "employee",
      content: "Bonjour, que puis-je faire pour vous aider ?",
      timestamp: new Date(),
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const rhMessages = messages.filter(
    (msg) => msg.recipient === "rh" || msg.sender === "rh"
  );

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      id: messages.length + 1,
      sender: "employee",
      recipient: "rh",
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rhMessages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={item.sender === "employee" ? styles.messageEmployee : styles.messageRH}>
            <Text style={styles.messageContent}>{item.content}</Text>
            <Text style={styles.messageTimestamp}>
              {item.timestamp.toLocaleTimeString()}
            </Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Écrire un message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageEmployee: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
  },
  messageRH: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
  },
  messageContent: {
    fontSize: 16,
  },
  messageTimestamp: {
    fontSize: 12,
    color: "#808080",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default MessagingScreen;
