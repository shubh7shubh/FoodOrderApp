import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { PizzaSize } from "@/types";
import { useState } from "react";
import Button from "@components/Button"
import { useCart } from "@/providers/CartProvider";

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];


const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const { addItem } = useCart();
    const router = useRouter();
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

    const product = products.find(p => p.id.toString() === id);

    if (!product) {
        return <Text>Product not found</Text>
    }

    const addToCart = () => {
        if (!product) {
            return;
        }
        addItem(product, selectedSize);
        router.push('/cart');
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product?.name + id }} />
            <Image style={styles.image} source={{ uri: product?.image || defaultPizzaImage }} />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>


        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});


export default ProductDetailsScreen;