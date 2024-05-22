import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Switch, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://your-image-url.com/image.jpg' }} 
          style={styles.profileImage}
        />
        <Text style={styles.name}>Bacem Ben Yahya</Text>
        <Text style={styles.email}>bbenyahya@example.com</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemText}>Mot de passe</Text>
        <TouchableOpacity>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemText}>Touch ID</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.itemText}>Entreprise</Text>
        <TouchableOpacity>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemText}>Langues</Text>
        <TouchableOpacity>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemText}>App Information</Text>
        <TouchableOpacity>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemText}>Déconnecter</Text>
        <TouchableOpacity>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 16,
  },
});
