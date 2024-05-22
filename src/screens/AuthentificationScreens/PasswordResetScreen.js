import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PasswordResetScreen = () => {
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);  // Contrôle la visibilité du modal

    const validateEmail = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const handleResetEmail = () => {
        if (!validateEmail(email)) {
            Alert.alert("Erreur", "Veuillez entrer une adresse e-mail valide.");
            return;
        }

        // Simuler l'envoi d'email pour le test
        setEmail('');
        setModalVisible(true); // Afficher le modal sur succès
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mot de passe oublié ?</Text>
            <Text style={styles.description}>
                Nous enverrons un e-mail à l'adresse e-mail que vous avez enregistrée pour récupérer votre mot de passe.
            </Text>
            <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} color="#808080" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Adresse Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleResetEmail}>
                <Text style={styles.buttonText}>Envoyer</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTextTitle}>Email de réinitialisation du mot de passe envoyé</Text>
                        <Text style={styles.modalTextDescription}>
                            Un email a été envoyé à vous, suivez la direction dans l'email afin de réinitialiser le mot de passe.
                        </Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
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
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTextTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: '#007BFF',  // Couleur de fond bleue pour le titre du modal
        color: 'white',  // Texte en blanc pour le contraste
        padding: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    modalTextDescription: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 16
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        padding: 10,
        elevation: 2,
        borderRadius: 20,
    },
});

export default PasswordResetScreen;
