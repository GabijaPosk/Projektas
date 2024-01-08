import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableHighlight } from 'react-native';
import { useDispatch } from 'react-redux';
import { cancelOrderAction } from '../redux/OrderSlice';

const CancelScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { order } = route.params;

  const handleCancelOrder = () => {
    Alert.alert(
      'Patvirtinimas',
      'Ar jūs tikrai norite atšaukti šį užsakymą?',
      [
        {
          text: 'Grįžti',
          onPress: () => console.log('Grįžti'),
          style: 'atšaukti',
        },
        {
          text: 'Atšaukti',
          onPress: () => {
            dispatch(cancelOrderAction(order.id));
            navigation.navigate('Pagrindinis'); 
          },
        },
      ],
      { cancelable: false }
    );
  };

return (
    <View style={styles.container}>
      <Text style={styles.title}>Atšaukti užsakymą</Text>
      <View style={styles.infoBlock}>
        <Text style={styles.infoLabel}>Pavadinimas:</Text>
        <Text style={styles.infoText}>{order.pavadinimas}</Text>
        <Text style={styles.infoLabel}>Kiekis:</Text>
        <Text style={styles.infoText}>{order.kiekis}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#FBCFCD"
          onPress={handleCancelOrder}
        >
          <Text style={styles.buttonText}>Atšaukti užsakymą</Text>
        </TouchableHighlight>
        <View style={styles.buttonContainerback}>
        <TouchableHighlight
          style={styles.buttoncancel}
          underlayColor="#FBCFCD"
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Grįžti</Text>
        </TouchableHighlight>
      </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: "#709999",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20, 
    marginRight: 10,
  },
  buttoncancel: {
    backgroundColor: "#997070",
    padding: 20,
    borderRadius: 20,
    height:60,
    width:100,
    alignItems: "center",
    marginTop: 20, 
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    alignSelf: "center",
    color: '#997070',
  },
  infoBlock: {
    backgroundColor: "#FFFAFA",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: "#997070",
    borderWidth: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#997070',
  },
  infoText: {
    color: '#997070',
    marginBottom: 20,
  },
});

export default CancelScreen;