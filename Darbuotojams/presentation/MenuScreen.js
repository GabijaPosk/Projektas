import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { firebase } from '../authentication/config/Firebase';
import MenuList from '../data/MenuList';
import { setVisibleUsers } from '../redux/MenuSlice';
import useAuth from '../authentication/hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';

const MenuScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [menuItems, setMenuItems] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Visos kategorijos');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firebase.firestore().collection('Menu').get();
        const menuItems = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredMenuItems = selectedCategory !== 'Visos kategorijos'
          ? menuItems.filter(menuItem => menuItem.KATEGORIJA === selectedCategory)
          : menuItems;
        setUsers(filteredMenuItems);
      } catch (error) {
        console.error('Error fetching menuItems:', error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerTop}>
                <TouchableOpacity onPress={() => navigation.navigate('Pridėti')} style={styles.Button}>
                    <Text style={styles.addButtonText}>Pridėti įrašą</Text>
                </TouchableOpacity>
            </View>
        </View>
        <SafeAreaView style={styles.ordersContainer}>
            <View>
                <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              style={styles.categoryPicker}
            >
              <Picker.Item label="Visos kategorijos" value="Visos kategorijos" style={styles.pickerLabel} />
              <Picker.Item label="Gėrimai" value="GĖRIMAI" style={styles.pickerLabel} />
              <Picker.Item label="Patiekalai" value="PATIEKALAI" style={styles.pickerLabel} />
              <Picker.Item label="Desertai" value="DESERTAI" style={styles.pickerLabel} />
              <Picker.Item label="Užkandžiai" value="UŽKANDŽIAI" style={styles.pickerLabel} />
              
              </Picker>
        </View>
        <FlatList
        style={styles.flatList}
        data={users}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        renderItem={({ item }) => (
        <MenuList menuItem={item} navigation={navigation} currentUser={user} />
        )}
        />
        
    </SafeAreaView>
    </View>
);
};

export default MenuScreen;

const styles = StyleSheet.create({
    Button: {
        color: 'white',
    backgroundColor: '#709999',
    borderColor: '#B6B6B4',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginLeft: 240,
    marginTop: 40,
      },
    container: {
        flex: 1,
        backgroundColor: '#997070',
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
      },
      headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    pickerAndSearchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
    ordersContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 0,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 20,
      },
  logoutButton: {
    color: 'white',
    backgroundColor: '#709999',
    borderColor: '#B6B6B4',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginLeft: 260,
    marginTop: 40,
    marginBottom: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  flatList: {
    height: '100%',
  },
  pressableContainer: {
    backgroundColor: '#709999',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  itemHeading: {
    fontWeight: 'bold',
    color: '#fff',
  },
  itemText: {
    fontWeight: '300',
    color: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  categoryPicker: {
  height: 50,
  width: 350, 
  color: '#8C8C8C',
  backgroundColor: 'white',
  borderColor: '#8C8C8C', 
  borderWidth: 1, 
},

  pickerLabel: {
    color: 'black',
    fontSize:15,
  },
  
  textColor: {
    color: 'black',
  },

  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});