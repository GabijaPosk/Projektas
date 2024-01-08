import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    
    return (
      <ImageBackground source={require('../../assets/images/Welcome1.png')} style={styles.image}>
        <SafeAreaView style={styles.image}>
          <View style={styles.container}>
            <Text style={styles.appTitle}>Restoranas</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.button}>
                <Text style={styles.buttonText}>Registruotis</Text>
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Jau turite paskyrą?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={[styles.text, styles.linkText]}> Prisijungti</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  appTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginTop: 200,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 880,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#487171',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#487171',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WelcomeScreen;
