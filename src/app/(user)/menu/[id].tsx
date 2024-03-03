import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
// import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { PizzaSize } from "@/types";
import { useState } from "react";
import Button from "@components/Button"
import { useCart } from "@/providers/CartProvider";
import { useProduct } from "@/api/products";
import { ActivityIndicator } from "react-native";
import RemoteImage from "@/components/RemoteImage";

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];


const ProductDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams();

    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const { data: product, error, isLoading } = useProduct(id);

    const { addItem } = useCart();

    const router = useRouter();

    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

    // const product = products.find(p => p.id.toString() === id);

    if (!product) {
        return <Text>Product not found</Text>
    }

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Failed to fetch products</Text>;
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
            {/* <Image style={styles.image} source={{ uri: product?.image || defaultPizzaImage }} /> */}
            <RemoteImage
                path={product?.image}
                fallback={defaultPizzaImage}
                style={styles.image}
            />
            <Text style={styles.price}>${product.price}</Text>

            <Text>Select size</Text>
            <View style={styles.sizes}>
                {sizes.map((size) => (
                    <Pressable
                        onPress={() => {
                            setSelectedSize(size);
                        }}
                        style={[
                            styles.size,
                            {
                                backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
                            },
                        ]}
                        key={size}
                    >
                        <Text
                            style={[
                                styles.sizeText,
                                {
                                    color: selectedSize === size ? 'black' : 'gray',
                                },
                            ]}
                        >
                            {size}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {/* <Text style={styles.price}>${product.price}</Text> */}
            <Button onPress={addToCart} text="Add to cart" />
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
        marginTop: 'auto',
    },

    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    size: {
        backgroundColor: 'gainsboro',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        fontSize: 20,
        fontWeight: '500',
    },
});


export default ProductDetailsScreen;