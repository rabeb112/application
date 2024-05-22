import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function RoleSelectionScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
            <Text style={styles.title}>Sélectionnez votre rôle</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('EmployeeSignIn', { role: 'employee' })}
            >
                <Icon name="user" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Employé</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('RHSignIn', { role: 'RH' })}
            >
                <Icon name="briefcase" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>RH</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 26,
        color: '#333',
        marginBottom: 30,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginVertical: 10,
        width: 250,
        alignItems: 'center',
        flexDirection: 'row', // Align icon and text horizontally
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 10, // Space between icon and text
    },
    icon: {
        marginRight: 10, // Space around the icon
    }
});