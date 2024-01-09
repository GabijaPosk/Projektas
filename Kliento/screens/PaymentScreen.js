import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, serverTimestamp, map } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const PaymentScreen = ({ route }) => {
  const { groupedItems, totalAmount } = route.params;

  const [Vardas, setVardas] = useState('');
  const [Pavardė, setPavardė] = useState('');
  const [TelefonoNumeris, setTelefonoNumeris] = useState('');
  const [ElPaštas, setElPaštas] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('kreditinėKortelė');

  const handleSubmitOrder = async () => {
    if (!Vardas || !Pavardė || !TelefonoNumeris || !ElPaštas) {
      
      Alert.alert('Neužpildyta Informacija', 'Užpildykite visus privalomus laukus.');
    } else {
      try {
        const paymentSuccess = Math.random() < 0.8; 
  
        if (paymentSuccess) {
          
          const db = getFirestore();
          const orderRef = collection(db, 'Apmokėjimas');
  
          const orderItem = Array.isArray(groupedItems) ? groupedItems.map((item) => ({
            PAVADINIMAS: item.PAVADINIMAS,
            KAINA: item.KAINA,
            kiekis: item.kiekis,
            visoKaina: item.visoKaina,
            category: item.category,
          })) : [];
  
          const orderDoc = {
            vardas: Vardas,
            pavardė: Pavardė,
            telefonoNumeris: TelefonoNumeris,
            elPaštas: ElPaštas,
            Apmokėta: selectedPaymentMethod === 'kreditinėKortelė' ? 'Kreditinė Kortelė' : 'PayPal',
            bendraSuma: totalAmount.toFixed(2) + ' €', 
            prekės: orderItem, 
          };
  
          await addDoc(orderRef, orderDoc);
  
          
          Alert.alert(
            'Užsakymas Pateiktas',
            'Jūsų užsakymas sėkmingai pateiktas! Laukite užsakytų prekių prie savo stalo.',
            [{ text: 'Gerai', onPress: () => console.log('Gerai paspausta') }]
          );
        } else {
      
          Alert.alert('Mokėjimo Klaida', 'Mokėjimas nepavyko. Bandykite dar kartą arba pasirinkite kitą mokėjimo būdą.');
        }
      } catch (error) {
      
        console.error('Klaida pateikiant užsakymą į Firestore:', error);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Peržiūrėkite savo užsakymą</Text>
      <View>
        {Array.isArray(groupedItems) && groupedItems.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            <Text>{`${item.PAVADINIMAS} x${item.kiekis}`}</Text>
            <Text>{item.visoKaina !== undefined && <Text>{item.visoKaina.toFixed(2)} €</Text>}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.totalAmount}>Viso suma: {totalAmount.toFixed(2)} €</Text>

      <TextInput
        style={styles.input}
        placeholder="Vardas"
        value={Vardas}
        onChangeText={(text) => setVardas(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Pavardė"
        value={Pavardė}
        onChangeText={(text) => setPavardė(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefono Numeris"
        value={TelefonoNumeris}
        onChangeText={(text) => setTelefonoNumeris(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="El. Paštas"
        value={ElPaštas}
        onChangeText={(text) => setElPaštas(text)}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Pasirinkite Mokėjimo Būdą:</Text>
      <Picker
        selectedValue={selectedPaymentMethod}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
      >
        <Picker.Item label="Kreditinė Kortelė" value="kreditinėKortelė" />
        <Picker.Item label="PayPal" value="paypal" />
      </Picker>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitOrder}>
        <Text style={styles.submitButtonText}>Pateikti Užsakymą</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  totalAmount: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    height: 150,
    marginTop: -30,
    marginBottom: 50,
    padding: 2,
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaymentScreen;
