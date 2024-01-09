import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGenerator = ({ url }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.scanText}>Skanuokite QR ir pamatykite meniu</Text>
      <QRCode
        value={url}
        size={200}
        color="black"
        backgroundColor="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20, 
  },
  scanText: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default QRCodeGenerator;
