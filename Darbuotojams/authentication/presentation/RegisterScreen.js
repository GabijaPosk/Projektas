import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signUp } from '../config/Firebase';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [position, setPosition] = useState('');

  const handleSignUp = async () => {
    try {
      if (!email || !password || !firstName || !lastName || !phoneNumber || !position) {
        console.error("All fields are required");
        return;
      }
      const user = await signUp(email, password, firstName, lastName, phoneNumber, position);

      console.log("User created:", user);
      navigation.navigate('Pagrindinis');
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <ScrollView>
    <ImageBackground source={require('../../assets/images/Maistas.png')} style={styles.image}>
    <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="keyboard-arrow-left" size={35} color="black" />
      </TouchableOpacity>
    <SafeAreaView>
      
          <Text style={styles.label}>Vardas</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholder='Enter First Name'
          />
          <Text style={styles.label}>Pavardė</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            placeholder='Enter Last Name'
          />
          <Text style={styles.label}>Pozicija</Text>
          <TextInput
            style={styles.input}
            value={position}
            onChangeText={(text) => setPosition(text)}
            placeholder='Enter Position'
          />
          <Text style={styles.label}>Telefono numeris</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            placeholder='Enter Phone Number'
          />
          <Text style={styles.label}>El. pašto adresas</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder='Enter Email'
          />
          <Text style={styles.label}>Slaptažodis</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            placeholder='Enter Password'
          />
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.signupButton}
        >
          <Text style={styles.buttonText}>Registuotis</Text>
          </TouchableOpacity>
    <Text style={styles.orText}>Arba</Text>
    <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Jau turite paskyrą?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}> Prisijungti</Text>
          </TouchableOpacity>
          </View>
      </SafeAreaView>
      </ImageBackground>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C48793',
  },
  backButton: {
    padding: 5,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 620,
    marginTop: 30,
  },
  
  image: {
    width: 700,
    height: 880,
    
  },
  orText: {
    fontSize: 20,
    color: '#34282C',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 5,
    marginRight: 300,
  },
  label: {
    color: '#34282C',
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 330,
  },
  input: {
    padding: 15,
    backgroundColor: 'white',
    opacity:0.8,
    color: 'black',
    borderRadius: 25,
    marginLeft: 20,
    marginRight: 330,
  },
  signupButton: {
    backgroundColor: '#487171',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 330,
    marginTop: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 7,
      marginRight: 300,
    },
  loginText: {
    color: '#34282C',
    fontWeight: '600',
    fontSize: 15,
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#3E6767',
    fontSize: 17,
  },
});
