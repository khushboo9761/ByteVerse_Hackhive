import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';

const Login :React.FC<{ navigation: any }> = ({ navigation }) =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User logged in successfully!');
        navigation.navigate('FilesUpload');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Error', 'User not found!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'Invalid email address!');
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Error', 'Invalid password!');
        } else {
          Alert.alert('Error', error.message);
        }
        console.error(error);
      });
  };
  const initializeGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.configure({
        webClientId: '3136277170-34doa5qac4bnr4v77gf1c294um7r9uur.apps.googleusercontent.com', // Replace with your web client ID
        offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      });
      navigation.navigate('FilesUpload');
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
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10,color:'white' }}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10,color:'white' }}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    
      <GoogleSigninButton
        style={{ width: 192, height: 48 , marginTop: 80,}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInWithGoogle}
      />
    </View>
  );
};

export default Login;
