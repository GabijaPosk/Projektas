import React from 'react';
import { View, Button } from 'react-native';
import QRCodeGenerator from '../QRCodeGenerator'; 


const HomeScreen = ({ navigation }) => {
  const webUrl = 'http://localhost:19006';

  return (
    <View>
      <QRCodeGenerator url={webUrl} />
      <Button
        title="Open Camera"
        onPress={() => navigation.navigate('WebView', { url: webUrl })}
      />
    </View>
  );
};

export default HomeScreen;


