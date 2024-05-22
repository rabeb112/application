import React from 'react';
import { View, TextInput, Button } from 'react-native';

export default function PasswordReset() {
  return (
    <View>
      <TextInput placeholder="Enter your email" />
      <Button title="Reset Password" onPress={() => console.log('Password reset requested')} />
      {/* Password reset UI */}
    </View>
  );
}
