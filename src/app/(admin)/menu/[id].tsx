import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router"
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
// import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { PizzaSize } from "@/types";
import { useState } from "react";
import Button from "@components/Button"
import { useCart } from "@/providers/CartProvider";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useProduct } from "@/api/products";
import { ActivityIndicator } from "react-native";
import RemoteImage from "@/components/RemoteImage";

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];


const ProductDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams();

    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const { data: product, error, isLoading } = useProduct(id);

    // const { addItem } = useCart();
    const router = useRouter();
    // const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

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

    // const addToCart = () => {
    //     if (!product) {
    //         return;
    //     }
    //     addItem(product, selectedSize);
    //     router.push('/cart');
    // };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Menu",
                    headerRight: () => (
                        <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }} />
            <Stack.Screen options={{ title: product?.name }} />
            {/* <Image style={styles.image} source={{ uri: product?.image || defaultPizzaImage }} /> */}
            <RemoteImage
                path={product?.image}
                fallback={defaultPizzaImage}
                style={styles.image}
            />
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