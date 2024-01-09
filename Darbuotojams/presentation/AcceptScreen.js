import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableHighlight, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { confirmOrderAction } from '../redux/OrderSlice';

const AcceptScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { order, prekės } = route.params;
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  console.log('AcceptScreen order:', order);
  console.log('AcceptScreen prekės:', prekės);

  const handleConfirmOrder = () => {
    dispatch(confirmOrderAction(order.id));
    setSuccessModalVisible(true);
  };

  const handleModalClose = () => {
    setSuccessModalVisible(false);
    navigation.navigate('Pagrindinis');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Patvirtinti užsakymą</Text>
        <View style={styles.infoBlock}>
          {order.prekės && order.prekės.map((prekė, index) => (
            <View key={index} style={styles.prekėContainer}>
              <View style={styles.prekėInfoContainer}>
                <Text>{`Pavadinimas: ${prekė.PAVADINIMAS}`}</Text>
                <Text>{`Kiekis: ${prekė.kiekis}`}</Text>
                <Text>{`Kaina: ${prekė.KAINA}`}</Text>
                <Text>{`Viso Kaina: ${prekė.visoKaina}`}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#FBCFCD"
            onPress={handleConfirmOrder}
          >
            <Text style={styles.buttonText}>Patvirtinti užsakymą</Text>
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
      <Modal
        transparent={true}
        animationType="slide"
        visible={successModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Užsakymas sėkmingai patvirtintas!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalClose}
            >
              <Text style={styles.modalButtonText}>Uždaryti</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#709999',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AcceptScreen;
