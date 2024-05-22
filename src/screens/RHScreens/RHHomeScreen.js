import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RHHomeScreen({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [pendingRequests, setPendingRequests] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch token from AsyncStorage
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }

                // Fetch user profile data using the token
                const response = await fetch("http://192.168.100.173:3333/rh", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }

                const userData = await response.json();
                setFirstName(userData.firstName); // Assuming 'firstName' is a field in user data
                setTotalEmployees(parseInt(userData.totalEmployees, 10)); // Example: Total employees
                setPendingRequests(userData.pendingRequests); // Example: Pending requests
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                // Handle error state or retry fetching token
            }
        };

        fetchUserData();
    }, []);


    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Bonjour,</Text>
                <Text style={styles.username}>{firstName}</Text>
                <View style={styles.infoSection}>
                    <Text style={styles.infoText}>Total des employés</Text>
                    <Text style={styles.infoAmount}>{totalEmployees}</Text>
                    <TouchableOpacity style={styles.moreButton}>
                        <Text style={styles.moreButtonText}>Voir plus</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoSection}>
                    <Text style={styles.infoText}>Demandes en attente</Text>
                    <Text style={styles.infoAmount}>{pendingRequests}</Text>
                    <TouchableOpacity style={styles.moreButton}onPress={() => navigation.navigate('LeaveRequests')}>
                        <Text style={styles.moreButtonText}>Voir plus</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('AddEmployee')}>
                    <Ionicons name="person-add" size={24} color="white" />
                    <Text style={styles.menuText}>Ajouter un employé</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('SalaryVariables')}>
                    <Ionicons name="options" size={24} color="white" />
                    <Text style={styles.menuText}>Variables de paie</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('ContractEnd')}>
                    <Ionicons name="document-text" size={24} color="white" />
                    <Text style={styles.menuText}>Rupture conventionnelle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('AccidentForm')}>
                    <Ionicons name="medkit" size={24} color="white" />
                    <Text style={styles.menuText}>Accident maladie</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f7',
    },
    header: {
        backgroundColor: '#6200ee',
        padding: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    greeting: {
        color: 'white',
        fontSize: 16,
    },
    username: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoSection: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    infoText: {
        color: 'white',
        fontSize: 16,
    },
    infoAmount: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    moreButton: {
        marginTop: 5,
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    moreButtonText: {
        color: '#6200ee',
        fontSize: 14,
    },
    menu: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 20,
    },
    menuButton: {
        backgroundColor: '#6200ee',
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        width: '40%',
        marginBottom: 20,
    },
    menuText: {
        color: 'white',
        marginTop: 10,
    },
});
