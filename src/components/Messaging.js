import React from 'react';
import { View, TextInput, Button } from 'react-native';

export default function Messaging() {
  return (
    <View>
      <TextInput placeholder="Type your message..." />
      <Button title="Send" onPress={() => console.log('Message sent')} />
      {/* Chat UI */}
    </View>
  );
}
