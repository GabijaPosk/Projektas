import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';

const OrderDetails = ({ order, onConfirm, onCancel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { kategorija } = order;

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: isExpanded ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim, isExpanded]);

  return (
    <TouchableOpacity style={styles.detailsContainer} onPress={toggleDetails}>
      <Text style={styles.heading}>{` ${order.ID}`}</Text>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>{` ${order.pavadinimas}`}</Text>
        <Text style={styles.description}>{`Kiekis: ${order.kiekis}`}</Text>
        <Text style={styles.category}>{`Kategorija: ${order.kategorija}`}</Text>
        {isExpanded && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => onConfirm(order)}>
              <Text style={styles.actionText}>Patvirtinti</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonDelete} onPress={() => onCancel(order.id)}>
              <Text style={styles.actionTextDelete}>Atšaukti</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#997070',
    opacity: 0.9,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf:'center',
    justifyContent:'center',
    paddingTop:30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: "center",
  },
  description: {
    color: '#FFE6E8',
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    width: '35%',
    alignItems: 'center',
    marginBottom:10,
  },
  actionButtonDelete: {
    backgroundColor: '#800517',
    padding: 15,
    borderRadius: 20,
    marginBottom:10,
    width: '35%',
    alignItems: 'center',
  },
  actionText: {
    color: '#997070',
    fontWeight: 'bold',
  },
  actionTextDelete: {
    color: '#fff',
    fontWeight: 'bold',
  },
  category: {
    marginTop: 5,
    marginBottom: 30,
    color: '#FFE6E8',
  },
});

export default OrderDetails;