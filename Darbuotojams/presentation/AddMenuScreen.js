import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { firebase } from '../authentication/config/Firebase';
import { useNavigation } from '@react-navigation/native';

const AddMenuScreen = () => {
  const navigation = useNavigation();

  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCateg, setNewCateg] = useState('');
  const [newName, setNewName] = useState('');
  const [newCompos, setNewCompos] = useState('');

  const handleAddItem = async () => {
    try {
      await firebase.firestore().collection('Menu').add({
        APRAŠYMAS: newDesc,
        KAINA: parseInt(newPrice), // Convert to number
        KATEGORIJA: newCateg,
        PAVADINIMAS: newName,
        SUDĖTIS: newCompos,
      });

      navigation.navigate('Meniu');
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pridėti naują meniu elementą</Text>
      <TextInput
        style={styles.input}
        placeholder="Pavadinimas"
        value={newName}
        onChangeText={(text) => setNewName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Aprašymas"
        value={newDesc}
        onChangeText={(text) => setNewDesc(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sudėtis"
        value={newCompos}
        onChangeText={(text) => setNewCompos(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Kaina"
        value={newPrice.toString()}
        onChangeText={(text) => {
          const numericValue = text.replace(/[^0-9]/g, '');
          setNewPrice(numericValue);
        }}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Kategorija"
        value={newCateg}
        onChangeText={(text) => setNewCateg(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Pridėti</Text>
      </TouchableOpacity>
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
});

export default AddMenuScreen;