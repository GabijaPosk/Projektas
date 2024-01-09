import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const MenuItem = ({ item, onSelect, onAddToCart}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const itemImage = require('./assets/food.png');

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddToCart = () => {
    Alert.alert(
      'Ar tikrai pridėti į krepšelį',
      `${item.PAVADINIMAS} keliauja į krepšelį.`,
      [
        {
          text: 'Pridėti',
          onPress: () => {
            onAddToCart(item);
          },
        },
        {
          text: 'Atšaukti',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <View>
        <Image source={itemImage} style={styles.image} />
        <Text style={styles.title}>{item.PAVADINIMAS}</Text>
        {isExpanded && (
          <View>
            <Text style={styles.description}>{item.APRAŠYMAS}</Text>
            <Text style={styles.price}>${item.KAINA}</Text>
            <Text style={styles.sudedamosiosDalys}>Sudėtis: {item.SUDĖTIS}</Text>
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Text style={styles.addToCartButtonText}>Pridėti į krepšelį</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.expandButton} onPress={handlePress}>
        <Text style={styles.expandButtonText}>{isExpanded ? 'Slėpti' : 'Rodyti'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: 'bold',
  },
  sudedamosiosDalys: {
    fontSize: 16,
    marginTop: 4,
  },
  addToCartButton: {
    backgroundColor: 'blue',
    padding: 8,
    marginTop: 8,
    borderRadius: 8,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  expandButton: {
    backgroundColor: 'lightgray',
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  expandButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MenuItem;
