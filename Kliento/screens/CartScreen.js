import React, { useState, useEffect } from 'react';
import { Alert, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where, serverTimestamp } from 'firebase/firestore';

const CartScreen = ({ route, navigation }) => {
  const { basketItems } = route.params;
  const [groupedItems, setGroupedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  

  useEffect(() => {
    const groupedItemsMap = basketItems.reduce((acc, item) => {
      const existingItem = acc.get(item.id);

      if (existingItem) {
        existingItem.kiekis += 1;
        existingItem.visoKaina += item.KAINA;
      } else {
        acc.set(item.id, {
          id: item.id,
          PAVADINIMAS: item.PAVADINIMAS,
          KAINA: item.KAINA,
          kiekis: 1,
          visoKaina: item.KAINA,
          category: item.category,
        });
      }

      return acc;
    }, new Map());

    const updatedGroupedItems = Array.from(groupedItemsMap.values());
    setGroupedItems(updatedGroupedItems);

    const updatedTotalAmount = updatedGroupedItems.reduce((total, item) => total + item.visoKaina, 0);
    setTotalAmount(updatedTotalAmount);
  }, [basketItems]);

  const handleIncrement = (itemId) => {
    setGroupedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, kiekis: item.kiekis + 1, visoKaina: item.visoKaina + item.KAINA }
          : item
      )
    );
  };
  
  const handleDecrement = (itemId) => {
    setGroupedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.kiekis > 1
          ? { ...item, kiekis: item.kiekis - 1, visoKaina: item.visoKaina - item.KAINA }
          : item
      )
    );
  };
  
  const handleRemove = (itemId) => {
    setGroupedItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      const updatedTotalAmount = updatedItems.reduce((total, item) => total + item.visoKaina, 0);
      setTotalAmount(updatedTotalAmount);
      return updatedItems;
    });
  
    removeFromFirestore(itemId);
  };
  
  const removeFromFirestore = async (itemId) => {
    try {
      const db = getFirestore();
      const cartRef = collection(db, 'Cart');
      const q = query(cartRef, where('id', '==', itemId));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.docs.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      console.error('Klaida trinant prekę iš Firestore:', error);
    }
  };
  

  const handleOrder = async () => {
    if (groupedItems.length === 0) {
      
      Alert.alert('Tuščias krepšelis', 'Jūsų pirkinių krepšelis yra tuščias. Pridėkite prekių, kad tęstumėte.', [
        { text: 'Gerai', onPress: () => console.log('Gerai paspausta') },
      ]);
    } else {
      try {
        const db = getFirestore();
  
        const batch = [];
        groupedItems.forEach((item) => {
          for (let i = 0; i < item.kiekis; i++) {
            const newItemRef = collection(db, 'Cart');
            const newItemDoc = {
              PAVADINIMAS: item.PAVADINIMAS,
              KAINA: item.KAINA,
              kiekis: 1,
              visoKaina: item.visoKaina,
              category: item.category,
              
              // timestamp: serverTimestamp(),
            };
            batch.push(addDoc(newItemRef, newItemDoc));
          }
        });
  
        await Promise.all(batch);
  
        navigation.navigate('PaymentScreen', {  groupedItems, totalAmount });
  
        setGroupedItems([]);
        setTotalAmount(0);
      } catch (error) {
        console.error('Klaida pridedant prekes į Firestore:', error);
      }
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jūsų užsakymas</Text>
      <FlatList
  data={groupedItems}
  renderItem={({ item }) => (
    <View style={styles.cartItem}>
      <Text>{`${item.PAVADINIMAS} x${item.kiekis}`}</Text>
      <Text>{item.visoKaina !== undefined && <Text>{item.visoKaina.toFixed(2)} €</Text>}</Text>
      <View style={styles.quantityButtons}>
        <TouchableOpacity onPress={() => handleDecrement(item.id)}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.kiekis}</Text>
        <TouchableOpacity onPress={() => handleIncrement(item.id)}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handleRemove(item.id)}>
        <Text style={styles.removeButtonText}>Pašalinti</Text>
      </TouchableOpacity>
    </View>
  )}
  keyExtractor={(item) => item.id.toString()}
/>
      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmountText}>Viso suma: {totalAmount.toFixed(2)} €</Text>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>Užsakyti</Text>
        </TouchableOpacity>
      </View>
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
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    color: 'blue',
    marginLeft: 8,
    marginRight: 8,
  },
  quantityText: {
    fontSize: 18,
    marginLeft: 8,
    marginRight: 8,
  },
  removeButtonText: {
    fontSize: 18,
    color: 'red',
    marginLeft: 8,
  },
  totalAmountContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 8,
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartScreen;
