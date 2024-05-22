import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";

const AddEmployeeScreen = () => {
  const navigation = useNavigation();
  const [employeeDetails, setEmployeeDetails] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
    address: "",
    rib: "",
    accountNumber: "",
    gender: "",
    status: "",
    jobTitle: "",
    department: "",
    salary: "",
    securityNumber: "",
    workHours: "",
    transferCode: "",
    startDate: new Date(),
    contractType: "",
    dateOfBirth: new Date(),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);

  const handleInputChange = (field, value) => {
    setEmployeeDetails({
      ...employeeDetails,
      [field]: value,
    });
  };

  const generatePassword = (length) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  };

  const API_URL = 'http://192.168.100.173:3333';

  const handleAddEmployee = async () => {
    if (
      !employeeDetails.lastName ||
      !employeeDetails.firstName ||
      !employeeDetails.email
    ) {
      Alert.alert(
        "Champs obligatoires",
        "Veuillez remplir tous les champs obligatoires."
      );
      return;
    }

    const password = generatePassword(8);
    
    try {
      // Send employee details to your backend API
      const response = await fetch(`${API_URL}/rh/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeDetails),
      });

      if (response.ok) {
        // Employee added successfully, now send email
        sendEmail(employeeDetails.email, password);
        Alert.alert("Succès", "Employé ajouté avec succès.");
        navigation.navigate("EmployeeList");
      } else {
        throw new Error("Erreur du serveur");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'employé :", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de l'ajout de l'employé. Veuillez réessayer plus tard."
      );
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || employeeDetails.dateOfBirth;
    setShowDatePicker(false);
    handleInputChange("dateOfBirth", currentDate);
  };

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || employeeDetails.startDate;
    setShowStartDatePicker(false);
    handleInputChange("startDate", currentDate);
  };

  const sendEmail = async (email, password) => {
    // Replace with your backend API call or third-party email service
    // Example using a hypothetical backend API
    try {
      const response = await fetch(`${API_URL}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer plus tard."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ajouter un Employé</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Nom de famille<Text style={styles.required}>*</Text>
            </Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon name="user" size={20} color="#808080" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Nom de famille"
                onChangeText={(text) => handleInputChange("lastName", text)}
                value={employeeDetails.lastName}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Prénom<Text style={styles.required}>*</Text>
            </Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon name="user" size={20} color="#808080" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Prénom"
                onChangeText={(text) => handleInputChange("firstName", text)}
                value={employeeDetails.firstName}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Email<Text style={styles.required}>*</Text>
            </Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="envelope"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => handleInputChange("email", text)}
                value={employeeDetails.email}
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Numéro de téléphone</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="phone"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Numéro de téléphone"
                onChangeText={(text) => handleInputChange("phoneNumber", text)}
                value={employeeDetails.phoneNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Adresse</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon name="home" size={20} color="#808080" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Adresse"
                onChangeText={(text) => handleInputChange("address", text)}
                value={employeeDetails.address}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>RIB</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="credit-card"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="RIB"
                onChangeText={(text) => handleInputChange("rib", text)}
                value={employeeDetails.rib}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date de naissance</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="calendar"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="Date de naissance"
                  value={employeeDetails.dateOfBirth.toLocaleDateString()}
                  editable={false}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={employeeDetails.dateOfBirth}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Numéro de compte</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon name="bank" size={20} color="#808080" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Numéro de compte"
                onChangeText={(text) =>
                  handleInputChange("accountNumber", text)
                }
                value={employeeDetails.accountNumber}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Genre</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="venus-mars"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <Picker
                style={styles.input}
                selectedValue={employeeDetails.gender}
                onValueChange={(itemValue) =>
                  handleInputChange("gender", itemValue)
                }
              >
                <Picker.Item label="Masculin" value="Masculin" />
                <Picker.Item label="Féminin" value="Féminin" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
  <Text style={styles.label}>Statut</Text>
  <View style={[styles.inputContainer, styles.iconInput]}>
    <Icon
      name="info-circle"
      size={20}
      color="#808080"
      style={styles.icon}
    />
    <Picker  style={styles.input}
      selectedValue={employeeDetails.status}
      onValueChange={(itemValue) => handleInputChange("status", itemValue)}
     
    >
      <Picker.Item label="Régulier" value="Régulier" />
      <Picker.Item label="Stagiaire" value="Stagiaire" />
      <Picker.Item label="Apprenti" value="Apprenti" />
    </Picker>
  </View>
</View>


          <View style={styles.inputGroup}>
            <Text style={styles.label}>Intitulé de poste</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="briefcase"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Intitulé de poste"
                onChangeText={(text) => handleInputChange("jobTitle", text)}
                value={employeeDetails.jobTitle}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Département</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="building"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Département"
                onChangeText={(text) => handleInputChange("department", text)}
                value={employeeDetails.department}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Salaire</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="money"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Salaire"
                onChangeText={(text) => handleInputChange("salary", text)}
                value={employeeDetails.salary}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Numéro de sécurité sociale</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="shield"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Numéro de sécurité sociale"
                onChangeText={(text) =>
                  handleInputChange("securityNumber", text)
                }
                value={employeeDetails.securityNumber}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Heures de travail</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="clock-o"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Heures de travail"
                onChangeText={(text) => handleInputChange("workHours", text)}
                value={employeeDetails.workHours}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Code de transfert</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="exchange"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Code de transfert"
                onChangeText={(text) => handleInputChange("transferCode", text)}
                value={employeeDetails.transferCode}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date de début</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="calendar"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="Date de début"
                  value={employeeDetails.startDate.toLocaleDateString()}
                  editable={false}
                />
              </TouchableOpacity>
              {showStartDatePicker && (
                <DateTimePicker
                  value={employeeDetails.startDate}
                  mode="date"
                  display="default"
                  onChange={handleStartDateChange}
                />
              )}
            </View>
          </View>

          <Text style={styles.label}>type de contrat</Text>
  <View style={[styles.inputContainer, styles.iconInput]}>
    <Icon
      name="info-circle"
      size={20}
      color="#808080"
      style={styles.icon}
    />
    <Picker  style={styles.input}
      selectedValue={employeeDetails.contractType}
      onValueChange={(itemValue) => handleInputChange("contractType", itemValue)}
     
    >
      <Picker.Item label="CDI" value="CDI" />
      <Picker.Item label="CDD" value="CDD" />
      <Picker.Item label="contrat CIVP" value="contrat CIVP" />
      <Picker.Item label="contrat Karama" value="contrat Karama" />
      <Picker.Item label="contrat de stage" value="contrat de stage" />
    </Picker>
  </View>


          <TouchableOpacity style={styles.button} onPress={handleAddEmployee}>
            <Text style={styles.buttonText}>Ajouter Employé</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    maxWidth: "100%",
    textAlign: "center",
  },
  contentContainer: {
    padding: 20,
  },
  form: {
    backgroundColor: "#f7f7f7",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    color: "#333",
  },
  required: {
    color: "red",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  picker: {
  borderWidth: 1,
  borderColor: "#ced4da",
  borderRadius: 4,
  padding: 10,
  backgroundColor: "#fff",
},

  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#333",
  },
  button: {
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default AddEmployeeScreen;
