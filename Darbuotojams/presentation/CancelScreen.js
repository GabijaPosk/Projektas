import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableHighlight, Modal, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrderAction } from '../redux/OrderSlice';
import { cancelOrder } from '../redux/OrderService'; 
import { firebase } from '../authentication/config/Firebase'; 
import { useNavigation, useRoute } from '@react-navigation/native';

const CancelScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { order } = route.params;
    const { id: itemId } = order;
  
    useEffect(() => {
    }, [itemId]);
  
    const handleCancel = () => {
        navigation.navigate('Pagrindinis'); 
      };

      const handleDeleteItem = async () => {
        try {
          console.log('Deleting  item with itemId:', itemId);
          await firebase.firestore().collection('Apmokėjimas').doc(itemId).delete();
          console.log(' item deleted successfully');
          dispatch(cancelOrderAction(itemId));
    
          navigation.navigate('Pagrindinis');
        } catch (error) {
          console.error('Error deleting  item:', error);
        }
      };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atšaukti užsakymą</Text>
      <Text style={styles.warningText}>Ar tikrai norite atšaukti šį užsakymą?</Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteItem}>
        <Text style={styles.buttonText}>Atšaukti</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Grįžti</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  warningText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
});

export default CancelScreen;
