import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import Signin from './src/Signin';
import Login from './src/login';
import GoogleSigninScreen from './src/googlesignin';
import FilesUpload from './src/components/Fileupload';
import ImagePicker from './src/components/Imagepicker';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MedicalBillSummary from './src/components/BillSummary';
const Stack = createStackNavigator();
const MyDarkTheme = {
 // Extend the DefaultTheme
  colors: {
    
    background: 'black', // Set the background color to black
    text: 'white', // Set the text color to white
  },
};
const App : React.FC = () => {
  return (
   
    // <SafeAreaView style={styles.container}>
/*      
     <Login navigation={Signin}/>
     <GoogleSigninScreen/>
    </SafeAreaView> */
     <NavigationContainer theme={DarkTheme}>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="FilesUpload" component={FilesUpload} />
      
    </Stack.Navigator>
  </NavigationContainer> 

  );
};
// const App: React.FC = () => {
//   return (
    

//       <ImagePicker />
 
//   );
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dark',
  },
});
export default App;
