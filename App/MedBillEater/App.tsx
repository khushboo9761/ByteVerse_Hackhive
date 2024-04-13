import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import Signin from './src/Signin';
import Login from './src/login';
import GoogleSigninScreen from './src/googlesignin';
import FilesUpload from './src/components/Fileupload';
import ImagePicker from './src/components/Imagepicker';

const App : React.FC = () => {
  return (
   
    <SafeAreaView style={styles.container}>
     
     <Signin/>
     <GoogleSigninScreen/>
    </SafeAreaView>
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
  },
});
export default App;