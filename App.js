import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, View, button } from 'react-native';
import signInScreen from './src/screens/signInScreen/signInScreen';
const App = () => {
  return(
    <SafeAreaView style={ styles.root}>
      <signInScreen/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    
  },
});
