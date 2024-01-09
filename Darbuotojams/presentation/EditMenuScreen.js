import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { editMenuItemAction } from '../redux/MenuSlice';
import { firebase, firestore } from '../authentication/config/Firebase'; 


const EditMenuScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { menuItem } = route.params;
    const { id: itemId } = menuItem;
  
    const [editedDesc, setEditedDesc] = useState('');
    const [editedPrice, setEditedPrice] = useState('');
    const [editedCateg, setEditedCateg] = useState('');
    const [editedName, setEditedName] = useState('');
    const [editedCompos, setEditedCompos] = useState('');
  
    const handleCancel = () => {
        navigation.navigate('Meniu'); 
      };

    const handleSaveChanges = async () => {
      try {
        await firebase.firestore().collection('Menu').doc(itemId).update({
          APRAŠYMAS: editedDesc,
          KAINA: parseInt(editedPrice),
          KATEGORIJA: editedCateg,
          PAVADINIMAS: editedName,
          SUDĖTIS: editedCompos,
        });
  
        const editedMenuItem = {
          id: itemId,
          APRAŠYMAS: editedDesc,
          KAINA: parseInt(editedPrice),
          KATEGORIJA: editedCateg,
          PAVADINIMAS: editedName,
          SUDĖTIS: editedCompos,
        };
  
        dispatch(editMenuItemAction(editedMenuItem));
        navigation.navigate('Meniu');
      } catch (error) {
        console.error('Error updating menu item:', error);
      }
    };
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log('Fetching menu item with itemId:', itemId);
      
            const documentSnapshot = await firebase.firestore().collection('Menu').doc(itemId).get();
            
            console.log('Document data:', documentSnapshot.data());
      
            if (documentSnapshot.exists) {
              const data = documentSnapshot.data();
              setEditedDesc(data.APRAŠYMAS || '');
              setEditedPrice(data.KAINA ? data.KAINA.toString() : '');
              setEditedCateg(data.KATEGORIJA || '');
              setEditedName(data.PAVADINIMAS || '');
              setEditedCompos(data.SUDĖTIS || '');
            } else {
              console.error('Document not found for ID:', itemId);
            }
          } catch (error) {
            console.error('Error fetching menu item:', error);
          }
        };
      
        fetchData();
      }, [itemId]);
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Pavadinimas"
          value={editedName}
          onChangeText={(text) => setEditedName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Aprašymas"
          value={editedDesc}
          onChangeText={(text) => setEditedDesc(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sudėtis"
          value={editedCompos}
          onChangeText={(text) => setEditedCompos(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Kaina"
          value={editedPrice.toString()}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setEditedPrice(numericValue);
          }}
          keyboardType="numeric"
        />
        <Picker
          selectedValue={editedCateg}
          onValueChange={(itemValue) => setEditedCateg(itemValue)}
          style={styles.categoryPicker}
        >
          <Picker.Item label="Visos kategorijos" value="Visos kategorijos" style={styles.pickerLabel} />
          <Picker.Item label="Gėrimas" value="GĖRIMAI" style={styles.pickerLabel} />
          <Picker.Item label="Patiekalas" value="PATIEKALAI" style={styles.pickerLabel} />
          <Picker.Item label="Desertas" value="DESERTAI" style={styles.pickerLabel} />
          <Picker.Item label="Užkandžiai" value="UŽKANDŽIAI" style={styles.pickerLabel} />
        </Picker>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Išsaugoti</Text>
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
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#709999',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  categoryPicker: {
    height: 50,
    width: 350, 
    color: '#8C8C8C',
    backgroundColor: 'white',
    borderColor: '#8C8C8C', 
    borderWidth: 1, 
  },
  pickerLabel: {
    color: 'black',
    fontSize:15,
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

export default EditMenuScreen;