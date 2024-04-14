import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker'; // Import DocumentPicker
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob'; // Import RNFetchBlob

interface IFile {
  url: string;
  name: string;
}

const ImagePicker: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<IFile[]>([]);
  const [fileInfos, setFileInfos] = useState<IFile[]>([]);
  const [result, setResult] = useState<string | null>(null);

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
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      const file: IFile = {
        url: result[0].uri, // Access the URI of the first selected file
        name: result[0].name || 'Unnamed File' // Use a default name if name is null
      };
  
      setSelectedFiles([file]);
    } catch (error) {
      console.log('Error selecting file:', error);
    }
  };
  
  

  const uploadFiles = async () => {
    try {
      const formData = new FormData();
      selectedFiles.forEach(async (file, index) => {
        const fileBlob = await RNFetchBlob.fs.readFile(file.url, 'base64');
       // formData.append(`file${index + 1}`, fileBlob, file.name);
      });

      const response = await axios.post('https://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Server response:', response.data);
      setResult(response.data); // Update state with server response if needed
    } catch (error) {
      console.error('Error uploading files:', error);
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

export default ImagePicker;