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
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const ReportAccidentScreen = () => {
  const navigation = useNavigation();
  const [employeeName, setEmployeeName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [witnesses, setWitnesses] = useState("");
  const [injuryDetails, setInjuryDetails] = useState("");
  const [personInCharge, setPersonInCharge] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");

  const handleSubmit = async () => {
    // Vérifier que les champs obligatoires sont remplis
    if (!employeeName || !location || !description || !date || !time) {
      Alert.alert(
        "Champs obligatoires",
        "Veuillez remplir tous les champs obligatoires."
      );
      return;
    }

    // Ajoutez ici la logique de soumission à votre API
    try {
      const response = await fetch("YOUR_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeName,
          description,
          location,
          date,
          time,
          witnesses,
          injuryDetails,
         
          personInCharge,
          additionalComments,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Erreur", errorData.message);
        return;
      }

      const responseData = await response.json();
      Alert.alert("Succès", responseData.message);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erreur lors de la déclaration :", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la déclaration. Veuillez réessayer plus tard."
      );
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Déclarer un Accident</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Nom de l'employé<Text style={styles.required}>*</Text>
            </Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="user"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Nom de l'employé"
                onChangeText={setEmployeeName}
                value={employeeName}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Lieu de l'accident<Text style={styles.required}>*</Text>
            </Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="map-marker"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Lieu de l'accident"
                onChangeText={setLocation}
                value={location}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Description<Text style={styles.required}>*</Text>
            </Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="file-text"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Description"
                onChangeText={setDescription}
                value={description}
                multiline
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Date de l'accident<Text style={styles.required}>*</Text>
            </Text>
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
                  placeholder="Date de l'accident"
                  value={date.toLocaleDateString()}
                  editable={false}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Heure de l'accident<Text style={styles.required}>*</Text>
            </Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="clock-o"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="Heure de l'accident"
                  value={time.toLocaleTimeString()}
                  editable={false}
                />
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="default"
                  onChange={handleTimeChange}
                />
              )}
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Témoins</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="users"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Témoins"
                onChangeText={setWitnesses}
                value={witnesses}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Détails de la blessure</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="medkit"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Détails de la blessure"
                onChangeText={setInjuryDetails}
                value={injuryDetails}
              />
            </View>
          </View>
         
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Personne en charge</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="user"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Personne en charge"
                onChangeText={setPersonInCharge}
                value={personInCharge}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Commentaires supplémentaires</Text>
            <View style={[styles.inputContainer, styles.iconInput]}>
              <Icon
                name="comment"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Commentaires supplémentaires"
                onChangeText={setAdditionalComments}
                value={additionalComments}
                multiline
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Soumettre</Text>
      </TouchableOpacity>
    </View>


)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: 'center',
  },
 title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    maxWidth: "100%",
    textAlign: "center",
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  iconInput: {
    marginBottom: 12,
  },
  label: {
    width: 500,
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  required: {
    color: "red",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 20,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default ReportAccidentScreen;

