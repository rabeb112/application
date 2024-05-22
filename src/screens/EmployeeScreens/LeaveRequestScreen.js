import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as DocumentPicker from 'expo-document-picker';

const LeaveRequestScreen = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [cause, setCause] = useState('');
    const [fileUri, setFileUri] = useState(null);

    const showStartDatePickerModal = () => setShowStartDatePicker(true);
    const showEndDatePickerModal = () => setShowEndDatePicker(true);

    const handleStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartDatePicker(false);
        setStartDate(currentDate);
    };

    const handleEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndDatePicker(false);
        setEndDate(currentDate);
    };

    const handleChooseFile = async () => {
        try {
            const document = await DocumentPicker.getDocumentAsync({
                type: '*/*', // Permet de choisir tous les types de fichiers
                copyToCacheDirectory: false,
            });
            if (document.type === 'success') {
                setFileUri(document.uri);
            }
        } catch (error) {
            console.error('Error picking file', error);
        }
    };

    const handleSubmitRequest = async () => {
    const requestBody = {
        startDate: startDate.toISOString(), // Convertir la date en format ISO
        endDate: endDate.toISOString(),
        reason: cause,
        // Vous pouvez ajouter d'autres champs ici si nécessaire
    };

    try {
        const response = await fetch('http://your-backend-api-url/employees/:id/leave-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Vous pouvez également ajouter des en-têtes d'autorisation si nécessaire
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error('Failed to submit leave request');
        }

        // Afficher une alerte de succès
        Alert.alert(
            'Succès',
            'Demande soumise avec succès ! Nous allons la traiter bientôt.',
            [{ text: 'OK' }]
        );

        // Réinitialiser les champs du formulaire après une soumission réussie si nécessaire
        setStartDate(null);
        setEndDate(null);
        setCause('');
        setFileUri(null);

    } catch (error) {
        console.error('Error submitting leave request', error);
        // Afficher une alerte d'erreur en cas d'échec de la soumission
        Alert.alert(
            'Erreur',
            'Échec de la soumission de la demande de congés. Veuillez réessayer.',
            [{ text: 'OK' }]
        );
    }
};

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Formulaire de demande de congés {"\n"}
                Veuillez remplir ce formulaire avec soin
            </Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Date de début :</Text>
                <TouchableOpacity onPress={showStartDatePickerModal} style={styles.dateInput}>
                    <Text>{startDate ? startDate.toDateString() : 'Sélectionner une date'}</Text>
                    <Icon name="calendar" size={20} color="#808080" style={styles.icon} />
                </TouchableOpacity>
            </View>
            {showStartDatePicker && (
                <DateTimePicker
                    value={startDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleStartDateChange}
                />
            )}

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Date de fin :</Text>
                <TouchableOpacity onPress={showEndDatePickerModal} style={styles.dateInput}>
                    <Text>{endDate ? endDate.toDateString() : 'Sélectionner une date'}</Text>
                    <Icon name="calendar" size={20} color="#808080" style={styles.icon} />
                </TouchableOpacity>
            </View>
            {showEndDatePicker && (
                <DateTimePicker
                    value={endDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleEndDateChange}
                />
            )}

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Cause :</Text>
                <TextInput
                    style={[styles.input, { borderRadius: 10, height: 100 }]}
                    onChangeText={setCause}
                    value={cause}
                    placeholder="Raison de la demande de congés"
                    placeholderTextColor="#808080"
                    multiline={true}
                    numberOfLines={4}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Text style={styles.remarkText}>Merci de présenter une justification pour votre absence (par exemple : un certificat médical)</Text>
                <TouchableOpacity style={[styles.uploadButton, { marginTop: 10 }]} onPress={handleChooseFile}>
                    <Text style={styles.buttonText}>Ajouter un fichier</Text>
                </TouchableOpacity>
    
                {fileUri && (
                    <Text style={styles.selectedFileText}>Fichier sélectionné : {fileUri}</Text>
                )}
            </View>
            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                    {loading ? <ActivityIndicator size="large" color="#FFF" /> : <Text style={styles.signInButtonText}>Soumettre la demande</Text>}
                </TouchableOpacity>

           
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
  },
  inputContainer: {
      marginBottom: 20,
  },
  label: {
      fontSize: 16,
      marginBottom: 5,
  },
  dateInput: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 10,
      justifyContent: 'space-between',
  },
  input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 10,
      height: 100,
  },
  icon: {
      marginLeft: 10,
  },
  buttonContainer: {
      marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10, // Ajout de la marge en bas du bouton
  },
  buttonText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
  },
  selectedFileText: {
      fontSize: 16,
      marginTop: 10,
  },
  remarkText: {
      fontSize: 14,
      color: '#808080',
      marginTop: 5,
  },
});

export default LeaveRequestScreen;
