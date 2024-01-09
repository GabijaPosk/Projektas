import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, image } from 'react-native';
import MenuItem from '../MenuItem';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


const WebViewScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [basketItems, setBasketItems] = useState([]);


  const db = getFirestore();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const menuSnapshot = await getDocs(collection(db, 'Menu'));
        const items = menuSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMenuItems(items);
        setFilteredMenuItems(items);
      } catch (error) {
        console.error('Klaida gaunant meniu dalis:', error);
      }
    };

    fetchMenuItems();
  }, [db]);

  const filterItems = (category) => {
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredMenuItems(menuItems);
    } else {
      const translatedCategory = getCategoryTranslation(category);
      const filteredItems = menuItems.filter(item => item.KATEGORIJA === translatedCategory);
      setFilteredMenuItems(filteredItems);
    }
  };

  const getCategoryTranslation = (appCategory) => {
    switch (appCategory) {
      case 'Food':
        return 'PATIEKALAI';
      case 'Drinks':
        return 'GĖRIMAI';
      case 'Snacks':
        return 'UŽKANDŽIAI';
      default:
        return appCategory;
    }
  };

  const renderItem = ({ item }) => (
    <MenuItem
      item={item}
      onSelect={() => handleSelectItem(item)}
      onAddToCart={() => handleAddToCart(item)}
    />
  );

  const handleSelectItem = (item) => {
  };

  const handleAddToCart = (item) => {
    setBasketItems([...basketItems, { ...item, category: selectedCategory }]);
  };

  const handleContinueToPurchase = () => {
    navigation.navigate('CartScreen', { basketItems });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meniu</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, selectedCategory === 'All' && styles.selectedFilter]} onPress={() => filterItems('All')}>
          <Text style={styles.filterButtonText}>Visi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, selectedCategory === 'Food' && styles.selectedFilter]} onPress={() => filterItems('Food')}>
          <Text style={styles.filterButtonText}>Patiekalai</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, selectedCategory === 'Drinks' && styles.selectedFilter]} onPress={() => filterItems('Drinks')}>
          <Text style={styles.filterButtonText}>Gėrimai</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, selectedCategory === 'Snacks' && styles.selectedFilter]} onPress={() => filterItems('Snacks')}>
          <Text style={styles.filterButtonText}>Užkandžiai</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredMenuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.continueToPurchaseButton} onPress={handleContinueToPurchase}>
        <Text style={styles.continueToPurchaseButtonText}>Tęsti apsipirkimą</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  selectedFilter: {
    backgroundColor: 'purple',
  },
  filterButtonText: {
    color: 'black',
  },
  continueToPurchaseButton: {
    backgroundColor: 'purple',
    padding: 16,
    marginVertical: 16,
    borderRadius: 8,
  },
  continueToPurchaseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WebViewScreen;
