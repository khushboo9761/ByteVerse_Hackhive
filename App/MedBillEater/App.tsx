import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import Signin from './src/Signin';
import Login from './src/login';
import GoogleSigninScreen from './src/googlesignin';
import FilesUpload from './src/components/Fileupload';
import ImagePicker from './src/components/Imagepicker';

// const App = () => {
//   // return (
   
//   //   <SafeAreaView style={styles.container}>
     
//   //    <Login/>
//   //    <GoogleSigninScreen/>
//   //   </SafeAreaView>
//   // );
// };
const App: React.FC = () => {
  return (
    

      <ImagePicker />
 
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});