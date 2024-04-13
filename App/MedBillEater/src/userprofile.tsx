// UserLogged.tsx (formerly Login.tsx)
import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserProfile: React.FC = () => { // Change component name to UserLogged
  const navigation = useNavigation();

  const handleLogin = () => {
    // Perform login logic here

    // After successful login, navigate to UserProfile screen
   // navigation.navigate('UserProfile');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <text>Hello </text>
    </View>
  );
};

export default UserProfile; // Export UserLogged instead of Login
