import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker'; // Import DocumentPicker
import { callGoogleVisionAsync } from '../ocr/Googlevision';
import RNFS from 'react-native-fs';
interface IFile {
  url: string;
  name: string;
}

const FilesUpload:React.FC<{ navigation: any }> = ({ navigation })  => {
  const [selectedFiles, setSelectedFiles] = useState<IFile[]>([]);
  const [fileInfos, setFileInfos] = useState<IFile[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [responses, setResponses] = useState<any[]>([]); 
  useEffect(() => {
    // Load initial files when component mounts
    loadFiles();
  }, []);

  const loadFiles = async () => {
    // Load files from your storage or API
    // For demonstration, here we are setting some initial files
    const initialFiles: IFile[] = [
      { url: 'file1.png', name: 'File 1' },
      { url: 'file2.pdf', name: 'File 2' }
    ];
    setFileInfos(initialFiles);
  };

  const selectFiles = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Allow all file types
         // Enable selecting multiple files
      });
  
      const files: IFile[] = results
        .filter((result) => result.name !== null) // Filter out files with null names
        .map((result) => ({
          url: result.uri,
          name: result.name || 'Unnamed File' // Use a default name if name is null
        }));
        
      setSelectedFiles(files);
    } catch (error) {
      console.log('Error selecting files:', error);
    }
  };
  const uploadFiles = async () => {
    try {
      const promises = selectedFiles.map(async (file) => {
        const content = await RNFS.readFile(file.url, 'base64'); // Read file content and convert to Base64
        return callGoogleVisionAsync(content); // Call callGoogleVisionAsync with Base64 content
      });
      const responses = await Promise.all(promises); // Wait for all calls to complete
      console.log('Google Vision API responses:', responses);
       console.log(JSON.stringify(responses));
       navigation.navigate('MedicalBillSummary');
    } catch (error) {
      console.error('Error calling Google Vision API:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Choose File" onPress={selectFiles} />
      <Button title="Upload" onPress={uploadFiles} disabled={!selectedFiles.length} />
      
      <View style={styles.fileList}>
        {selectedFiles.map((file, index) => (
          <Text key={index}>{file.name}</Text>
        ))}
      </View>

      <View style={styles.fileList}>
        {fileInfos.map((file, index) => (
          <Text key={index}>{file.name}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fileList: {
    marginTop: 20
  }
});

export default FilesUpload;
