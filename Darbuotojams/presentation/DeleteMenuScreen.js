import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { firebase } from '../authentication/config/Firebase'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { deleteMenuAction } from '../redux/MenuSlice';

const DeleteMenuScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { menuItem } = route.params;
    const { id: itemId } = menuItem;
  
    useEffect(() => {
    }, [itemId]);
  
    const handleCancel = () => {
        navigation.navigate('Meniu'); 
      };

      const handleDeleteItem = async () => {
        try {
          console.log('Deleting menu item with itemId:', itemId);
          await firebase.firestore().collection('Menu').doc(itemId).delete();
          console.log('Menu item deleted successfully');
          dispatch(deleteMenuAction(itemId));
    
          navigation.navigate('Meniu');
        } catch (error) {
          console.error('Error deleting menu item:', error);
        }
      };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ištrinti meniu elementą</Text>
      <Text style={styles.warningText}>Ar tikrai norite ištrinti šį meniu elementą?</Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteItem}>
        <Text style={styles.buttonText}>Ištrinti</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Atšaukti</Text>
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

export default DeleteMenuScreen;