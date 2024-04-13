import React from 'react';
import { View, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import UserProfile from './userprofile';
type AppStackParamList = {
    userprofile: undefined;
  
  };
     
const GoogleSigninScreen: React.FC = () => {

  // Initialize Google Sign-In
  const initializeGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.configure({
        webClientId: '3136277170-34doa5qac4bnr4v77gf1c294um7r9uur.apps.googleusercontent.com', // Replace with your web client ID
        offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      });
    } catch (error) {
      console.error('Google Sign-In configuration error:', error);
    }
  };

// const Stack = createStackNavigator<AppStackParamList>();

  const signInWithGoogle = async () => {
    try {
      // Initialize Google Sign-In if not already initialized
      await initializeGoogleSignIn();

      // Sign in with Google
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in with Firebase using the Google credential
      await auth().signInWithCredential(googleCredential);
      
      console.log('User signed in with Google successfully!');
      // Navigate to the user profile page or any other screen
    //   <Stack.Navigator>
    //       <Stack.Screen name="userprofile" component={UserProfile} />
    //          </Stack.Navigator>
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInWithGoogle}
      />
    </View>
  );
};

export default GoogleSigninScreen;
