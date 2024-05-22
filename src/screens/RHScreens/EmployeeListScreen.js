// EmployeeListScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const EmployeeListScreen = () => {
  const [employees, setEmployees] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await axios.get("http://192.168.100.173:3333/rh/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error loading employees:", error);
      Alert.alert("Error", "An error occurred while loading employees. Please try again later.");
    }
  };

  const handleEditEmployee = (employeeId) => {
    navigation.navigate("EditEmployee", { employeeId });
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://192.168.100.173:3333/rh/employees/${employeeId}`);
      Alert.alert("Success", "Employee deleted successfully.");
      loadEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      Alert.alert("Error", "An error occurred while deleting the employee. Please try again later.");
    }
  };

  const renderEmployeeItem = ({ item }) => (
    <View style={styles.employeeItem}>
      <Text style={styles.employeeName}>{`${item.firstName} ${item.lastName}`}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => handleEditEmployee(item.id)}
        >
          <Icon name="edit" size={20} color="#fff" />
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDeleteEmployee(item.id)}
        >
          <Icon name="trash" size={20} color="#fff" />
          <Text style={styles.buttonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
        renderItem={renderEmployeeItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingVertical: 20,
  },
  employeeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "#007BFF",
  },
  deleteButton: {
    backgroundColor: "#DC3545",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 5,
  },
});

export default EmployeeListScreen;
