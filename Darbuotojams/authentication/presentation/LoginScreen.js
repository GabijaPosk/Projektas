import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); 
      console.log('Prisijungimo sėkmingas!', userCredential);
    } catch (error) {
      console.error('Prisijungimo klaida:', error.message);
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/Maistas.png')} style={styles.image}>
    <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="keyboard-arrow-left" size={35} color="black" />
      </TouchableOpacity>
    <SafeAreaView>
      
      <Text style={styles.label}>El. Paštas</Text>
      <TextInput
      style={styles.input}
      placeholder="Enter Email Address"
      value={email}
      onChangeText={(text) => setEmail(text)}
    />
    <Text style={styles.label}>Slaptažodis</Text>
      <TextInput
      style={styles.input}
      secureTextEntry
      placeholder="Enter Password"
      value={password}
      onChangeText={(text) => setPassword(text)}
    />
    <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
      <Text style={styles.buttonText}>Prisijungti</Text>
    </TouchableOpacity>
    <Text style={styles.orText}>Arba</Text>
    <View style={styles.signupContainer}>
      <Text style={styles.signupText}>Neturite paskyros?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signupLink}> Registruotis</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 5,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 620,
    marginTop: 30,
    marginBottom: 200,
  },
  imageContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 700,
    height: 880,
    
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
  loginButton: {
    backgroundColor: '#487171',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 330,
    marginTop: 50,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  orText: {
    fontSize: 20,
    color: '#34282C',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 5,
    marginRight: 300,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 7,
    marginRight: 300,
  },
  signupText: {
    color: '#34282C',
    fontWeight: '600',
    fontSize: 15,
  },
  signupLink: {
    fontWeight: 'bold',
    color: '#3E6767',
    fontSize: 17,
  },
  label: {
    color: '#34282C',
    marginBottom: 5,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 330,
  },
});