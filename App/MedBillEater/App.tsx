// import React, { useEffect, useState } from 'react';
// import { View, Text, Button } from 'react-native';
// import axios from 'axios';

// interface Task {
//   id: number;
//   title: string;
//   completed: boolean;
// }

// const App: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get<Task[]>('http://192.168.87.218:3000/tasks');
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const createTask = async () => {
//     try {
//       await axios.post('http://192.168.87.218:3000/tasks', {
//         id: tasks.length + 1,
//         title: `Task ${tasks.length + 1}`,
//         completed: false
//       });
//       fetchTasks();
//     } catch (error) {
//       console.error('Error creating task:', error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Tasks:</Text>
//       {tasks.map(task => (
//         <Text key={task.id}>{task.title}</Text>
//       ))}
//       <Button title="Create Task" onPress={createTask} />
//     </View>
//   );
// };

//  export default App; // Correct export statement
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import Signin from './src/Signin';
import Login from './src/login';
import GoogleSigninScreen from './src/googlesignin';
import FilesUpload from './src/components/Fileupload';
import ImagePicker from './src/components/Imagepicker';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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