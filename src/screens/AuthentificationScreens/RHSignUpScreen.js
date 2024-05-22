import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import zxcvbn from "zxcvbn";
import { Feather } from "@expo/vector-icons"; // Import de Feather depuis Expo
import NetInfo from "@react-native-community/netinfo";

const RHSignUpScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Ajout de l'état pour gérer l'affichage du mot de passe

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Erreur",
        "Désolé, nous avons besoin des permissions pour accéder à vos photos !"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const API_URL = 'http://192.168.100.173:3333';
  const handleSignUp = async () => {
    try {
      const response = await fetch(`${API_URL}/rh/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone: phoneNumber,
          email,
          password,
          department: 'HR',
          jobTitle: 'HR Manager',
          gender: 'male',
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Erreur", errorData.message);
        return;
      }
  
      const responseData = await response.json();
      Alert.alert("Succès", responseData.message);
      navigation.navigate("RHHome");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard."
      );
    }
  };
  

  // Fonction pour déterminer la force du mot de passe
  const getPasswordStrength = () => {
    const result = zxcvbn(password);
    return result.score; // Retourne un score entre 0 et 4 (0: très faible, 4: très fort)
  };

  // Fonction pour déterminer la couleur du texte en fonction de la force du mot de passe
  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength < 3) {
      return "#FF0000"; // Rouge pour un mot de passe faible
    } else {
      return "#00FF00"; // Vert pour un mot de passe fort
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Créer un compte</Text>
      <TouchableOpacity style={styles.photoPlaceholder} onPress={pickImage}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%", borderRadius: 50 }}
          />
        ) : (
          <Icon name="camera" size={30} color="#FFF" />
        )}
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#808080" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nom"
          onChangeText={setFirstName}
          value={firstName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#808080" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          onChangeText={setLastName}
          value={lastName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#808080" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Numéro de téléphone"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#808080" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={23} color="#808080" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}
        />
        {/* Icône pour afficher/masquer le mot de passe */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="#808080"
          />
        </TouchableOpacity>
      </View>
      {password.length > 0 && (
        <View style={styles.strengthContainer}>
          <Text
            style={[
              styles.passwordStrength,
              { color: getPasswordStrengthColor() },
            ]}
          >
            {getPasswordStrength() < 3 ? "Faible" : "Fort"}
          </Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={23} color="#808080" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirmer le mot de passe"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="#808080"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={acceptTerms ? "checked" : "unchecked"}
          onPress={() => setAcceptTerms(!acceptTerms)}
          color="#007BFF"
        />
        <Text style={styles.checkboxLabel}>
          Accepter les termes et conditions
        </Text>
      </View>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>S'inscrire</Text>
      </TouchableOpacity>
      <Text style={styles.loginPrompt}>
        Vous avez déjà un compte?{" "}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("SignInScreen")}
        >
          Se connecter
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 20,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 10,
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
  signUpButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 10,
  },
  signUpButtonText: {
    color: "#FFF",
    fontSize: 18,
  },
  loginPrompt: {
    fontSize: 16,
    color: "black",
  },
  loginLink: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 10,
    color: "#333",
    flexShrink: 1,
  },
  passwordStrength: {
    marginLeft: 10,
  },
  strengthContainer: {
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: 15,
  },
});

export default RHSignUpScreen;
