import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';

const MenuDetails = ({ menuItem, onEdit, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const { KATEGORIJA, prekės } = menuItem;
  
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
      <Text style={styles.heading}>{` ${menuItem.PAVADINIMAS}`}</Text>
      <Animated.View style={{ opacity: fadeAnim }}>
        {isExpanded && (
          <View>
            <View style={styles.actionsContainerT}>
              <Text style={styles.description}>{`Aprašymas: ${menuItem.APRAŠYMAS}`}</Text>
              <Text style={styles.description}>{`Sudėtis: ${menuItem.SUDĖTIS}`}</Text>
              <Text style={styles.description}>{`Kaina: ${menuItem.KAINA}`}</Text>
              <Text style={styles.category}>{`Kategorija: ${menuItem.KATEGORIJA}`}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(menuItem)}>
                <Text style={styles.actionText}>Redaguoti</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButtonDelete} onPress={() => onDelete(menuItem.id)}>
                <Text style={styles.actionTextDelete}>Ištrinti</Text>
              </TouchableOpacity>
            </View>
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
    paddingTop:10,
    height:50,
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
  actionsContainerT: {
    flexDirection: 'column',
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

export default MenuDetails;