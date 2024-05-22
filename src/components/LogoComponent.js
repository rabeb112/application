
import React from 'react';
import { Image } from 'react-native';

const LogoComponent = () => {
  return (
    <Image
      source={require('../../assets/images/sas noir.png')} 
      style={{ width: 300, height: 60 }} 
      resizeMode="contain" 
    />
  );
};

export default LogoComponent;
