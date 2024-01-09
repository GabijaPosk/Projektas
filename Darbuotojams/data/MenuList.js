import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MenuDetails from '../data/MenuDetails';

const MenuList = ({ menuItem, navigation, currentUser }) => {
    const currentUserId = currentUser?.uid;

  console.log('MenuList item:', menuItem);

  if (!currentUserId) {
    console.error('Invalid current user or missing uid:', currentUser);
    return null; 
  }

  console.log('Current User:', currentUser);
  return (
    <View style={styles.itemContainer}>
      <MenuDetails
        menuItem={menuItem}
        onEdit={() => navigation.navigate('Redaguoti', { menuItem })}
        onDelete={() => navigation.navigate('Ištrinti', { menuItem })}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: 20,
      },
    });
    

export default MenuList;