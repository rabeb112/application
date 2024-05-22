import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const EmployeeHomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.mainMenu}>
                <Text style={styles.menuText}>Menu principal</Text>
                <View style={styles.row}>
                    <MenuButton title="Demander un congé" iconName="user-plus" color="#8a2be2" onPress={() => navigation.navigate('LeaveRequest')} />
                    <MenuButton title="consulter les documents" iconName="file-text" color="#20b2aa" onPress={() => navigation.navigate('Document')} />
                </View>
                <View style={styles.row}>
                    <MenuButton title="historique de paiement" iconName="dollar" color="#f0e68c" onPress={() => navigation.navigate('PaymentHistory')} />
                    <MenuButton title="calendrier" iconName="calendar" color="#FFA500" onPress={() => navigation.navigate('Calendar')} />
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('EmployeeHome')}>
                    <Icon name="home" size={24} color="#000" />
                    <Text style={styles.iconText}></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Messaging')}>
                    <Icon name="envelope" size={24} color="#000" />
                    <Text style={styles.iconText}></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Profile')}>
                    <Icon name="user" size={24} color="#000" />
                    <Text style={styles.iconText}></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

function MenuButton({ title, iconName, color, onPress }) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress} >
            <Icon name={iconName} type="font-awesome" size={24} color="#ffffff" />
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mainMenu: {
        padding: 20,
    },
    menuText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#ffffff',
        marginTop: 20,
        fontSize: 18,
    },
    addButton: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 20,
        backgroundColor: '#007BFF',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff', 
        paddingVertical: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconText: {
        marginLeft: 5,
        fontSize: 16,
    },
});

export default EmployeeHomeScreen;
