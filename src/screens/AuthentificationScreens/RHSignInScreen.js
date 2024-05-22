import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

const RHSignInScreen = () => {
    const navigation = useNavigation();
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
            const savedEmail = await AsyncStorage.getItem('email');
            if (remembered === 'true' && savedEmail) {
                setRememberMe(true);
                setEmail(savedEmail);
            }
        } catch (error) {
            Alert.alert("Erreur de chargement", "L'état de Se souvenir de moi n'a pas pu être chargé.");
        }
    };

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleEmailValidation = () => {
        if (!validateEmail(email)) {
            setEmailError(true);
            Alert.alert('Erreur', 'Veuillez entrer une adresse email valide.');
        } else {
            setEmailError(false);
        }
    };

    const handleSignIn = async () => {
        handleEmailValidation();
        if (emailError || !validateEmail(email)) {
            Alert.alert('Erreur', 'Veuillez corriger votre adresse email avant de continuer.');
            return;
        }
        if (password.length < 8) {
            Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }

        setLoading(true);

        // Check network connection before making the request
        const state = await NetInfo.fetch();
        if (!state.isConnected) {
            setLoading(false);
            Alert.alert('Erreur', 'Pas de connexion Internet. Veuillez vérifier votre connexion.');
            return;
        }

        try {
            const response = await fetch('http://192.168.100.173:3333/rh/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                if (rememberMe) {
                    await AsyncStorage.setItem('rememberMe', 'true');
                    await AsyncStorage.setItem('email', email);
                } else {
                    await AsyncStorage.removeItem('rememberMe');
                    await AsyncStorage.removeItem('email');
                }
                Alert.alert('Succès', 'Vous êtes connecté.');
                navigation.navigate('RHHome'); // Navigate to RHHomeScreen
            } else {
                Alert.alert('Erreur de connexion', data.message || 'Une erreur est survenue.');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Erreur de connexion', 'Un problème est survenu lors de la connexion.');
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
            <View style={styles.footer}>
                <Text style={styles.signupPrompt}>
                    Vous n'avez pas un compte? <Text style={styles.signupLink} onPress={() => navigation.navigate('RHSignUp')}>S'inscrire</Text>
                </Text>
            </View>
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
    signupPrompt: {
        fontSize: 16,
        color: 'black',
    },
    signupLink: {
        color: '#007BFF',
    },
    footer: {
        padding: 20,
        alignItems: 'center',
        width: '100%',
    },
});

export default RHSignInScreen;
