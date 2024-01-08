import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OrderDetails from '../data/OrderDetails';

const OrderList = ({ order, navigation, currentUser }) => {
    const currentUserId = currentUser?.uid;

  console.log('OrderList item:', order);

  if (!currentUserId) {
    console.error('Invalid current user or missing uid:', currentUser);
    return null; 
  }

  console.log('Current User:', currentUser);
  return (
    <View style={styles.itemContainer}>
      <OrderDetails
        order={order}
        onConfirm={() => navigation.navigate('Patvirtinti', { order })}
        onCancel={() => navigation.navigate('Atšaukti', { order })}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: 20,
      },
    });
    

export default OrderList;