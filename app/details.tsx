import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams();
  const productParam = params.product as string;
  const product = productParam ? JSON.parse(productParam) : null;
  
  if (!product) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No product data found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.detailsContainer}>
        <Image source={{ uri: product.thumbnail }} style={styles.detailImage} />
        <View style={styles.detailsBody}>
          <Text style={styles.category}>{product.category.toUpperCase()}</Text>
          <Text style={styles.detailTitle}>{product.title}</Text>
          <Text style={styles.detailPrice}>${product.price.toFixed(2)}</Text>
          <Text style={styles.detailRating}>Rating: ⭐ {product.rating} / 5</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionHeader}>Description</Text>
          <Text style={styles.detailDescription}>{product.description}</Text>
          
          {product.brand && (
            <>
              <Text style={styles.sectionHeader}>Brand</Text>
              <Text style={styles.detailDescription}>{product.brand}</Text>
            </>
          )}

          {product.stock !== undefined && (
            <>
              <Text style={styles.sectionHeader}>Stock Status</Text>
              <Text style={styles.detailDescription}>
                {product.stock > 0 ? `${product.stock} units available` : 'Out of Stock'}
              </Text>
            </>
          )}
        </View>
      </ScrollView>
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
  detailsContainer: {
    paddingBottom: 24,
  },
  detailImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    backgroundColor: '#EEE',
  },
  detailsBody: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  category: {
    fontSize: 10,
    fontWeight: '600',
    color: '#888',
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginVertical: 4,
  },
  detailPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A9D8F',
    marginBottom: 8,
  },
  detailRating: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#444',
    marginBottom: 4,
    marginTop: 8,
  },
  detailDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});