import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NotificationIcon = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
      <Icon name="bell" size={24} color="#007BFF" />
    </TouchableOpacity>
  );
};

export default NotificationIcon;