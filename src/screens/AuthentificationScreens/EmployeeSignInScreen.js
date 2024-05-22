import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const EmployeeSignInScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadRememberMe();
    }, []);

    const loadRememberMe = async () => {
        try {
            const remembered = await AsyncStorage.getItem('rememberMe');
            setRememberMe(remembered === 'true');
        } catch (error) {
            Alert.alert("Erreur de chargement", "L'état de Se souvenir de moi n'a pas pu être chargé.");
        }
    };

    const validateEmail = email => /\S+@\S+\.\S+/.test(email);

    const handleEmailValidation = () => {
        if (!validateEmail(email)) {
            setEmailError(true);
            Alert.alert('Erreur', 'Veuillez entrer une adresse email valide.');
        } else {
            setEmailError(false);
        }
    };

    const handleSignIn = async () => {
        if (emailError || !validateEmail(email)) {
            Alert.alert('Erreur', 'Veuillez corriger votre adresse email avant de continuer.');
            return;
        }
        if (password.length < 8) {
            Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }

        setLoading(true);
        try {
            if (rememberMe) {
                await AsyncStorage.setItem('rememberMe', 'true');
            } else {
                await AsyncStorage.removeItem('rememberMe');
            }
            setLoading(false);
            Alert.alert('Succès', 'Vous êtes connecté.');
            navigation.navigate('EmployeeHome'); // Redirection après la connexion réussie
        } catch (error) {
            setLoading(false);
            Alert.alert("Erreur de connexion", "Un problème est survenu lors de l'enregistrement de vos préférences.");
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.title}>Bienvenue</Text>
                <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>
                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={20} color="#808080" style={styles.icon} />
                    <TextInput
                        style={[styles.input, emailError ? styles.inputError : null]}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Adresse e-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#808080"
                        onEndEditing={handleEmailValidation}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={23} color="#808080" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Mot de passe"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholderTextColor="#808080"
                    />
                </View>
                <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                    {loading ? <ActivityIndicator size="large" color="#FFF" /> : <Text style={styles.signInButtonText}>Se connecter</Text>}
                </TouchableOpacity>
                <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('PasswordReset')}>Mot de passe oublié ?</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: 'black',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 12,
        backgroundColor: '#f0f0f0',
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
        color: '#333',
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 2,
    },
    signInButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 10,
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    forgotPasswordText: {
        color: 'red',
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
});

export default EmployeeSignInScreen;
