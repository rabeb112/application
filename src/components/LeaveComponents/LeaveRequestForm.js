import React from 'react';
import { View, TextInput, Button } from 'react-native';

export default function LeaveRequestForm() {
  return (
    <View>
      <TextInput placeholder="Start Date" />
      <TextInput placeholder="End Date" />
      {/* Other input fields for leave details */}
      <Button title="Submit" onPress={() => console.log('Leave request submitted')} />
    </View>
  );
}
