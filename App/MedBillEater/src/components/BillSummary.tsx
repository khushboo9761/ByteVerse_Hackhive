import React, { useState } from 'react';
import { View, Text,TextInput, Button, Alert ,StyleSheet} from 'react-native';

interface MedicalBill {
    patientName: string;
    doctorName: string;
    totalAmount: number;
    items: {
      itemName: string;
      itemCost: number;
    }[];
  }
  
const MedicalBillSummary: React.FC<{ bill: MedicalBill }> = ({ bill }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Medical Bill Summary</Text>
        <Text>Patient Name: {bill.patientName}</Text>
        <Text>Doctor Name: {bill.doctorName}</Text>
        <Text>Items:</Text>
        <View style={styles.itemContainer}>
          {bill.items.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text>{item.itemName}</Text>
              <Text>${item.itemCost.toFixed(2)}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.total}>Total Amount: ${bill.totalAmount.toFixed(2)}</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    itemContainer: {
      width: '80%',
      marginBottom: 10,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    total: {
      marginTop: 20,
      fontWeight: 'bold',
    },
  });
  
  export default MedicalBillSummary;