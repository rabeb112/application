import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaymentHistoryScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historique des paiements</Text>
            {/* Ajoutez votre contenu ici */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default PaymentHistoryScreen;
