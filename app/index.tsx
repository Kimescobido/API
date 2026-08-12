import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loaderText}>Loading products...</Text>
      </View>
    );
  }

  const renderProductCard = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <View style={styles.rowTop}>
          <Text style={styles.category}>{item.category.toUpperCase()}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <View style={styles.rowBottom}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: '/details',
                params: { product: JSON.stringify(item) },
              })
            }
          >
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductCard}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    color: '#666',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnail: {
    width: 110,
    height: '100%',
    backgroundColor: '#EEE',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  category: {
    fontSize: 10,
    fontWeight: '600',
    color: '#888',
  },
  rating: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  rowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2A9D8F',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});