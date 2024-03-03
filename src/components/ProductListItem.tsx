import { Link, useSegments } from 'expo-router';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import Colors from '../constants/Colors';
import { Product, Tables } from '../types';
import RemoteImage from './RemoteImage';
// import RemoteImage from './RemoteImage';

export const defaultPizzaImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

// type ProductListItemProps = {
//     product: Product;
// };
type ProductListItemProps = {
    product: Tables<'products'>;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
    const segments = useSegments();
    // console.log(segments, "dshfhjkf")
    // if (product) console.log(product, "dshfhjkf")
    // View doesnt have the onPress event so need to use Pressable
    return (
        <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
            <Pressable style={styles.container} >
                {/* <Pressable style={styles.container} > */}
                {/* <Image
                    source={{ uri: product.image || defaultPizzaImage }}
                    style={styles.image}
                    resizeMode='contain'
                /> */}

                {/* REmote Image is downloading the images from storage in supabase then showing */}
                <RemoteImage
                    path={product.image}
                    fallback={defaultPizzaImage}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
                {/* </Pressable> */}
            </Pressable>
        </Link>
    );
};

export default ProductListItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        flex: 1,
        maxWidth: '50%',
    },

    image: {
        width: '100%',
        aspectRatio: 1,
    },

    title: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
        color: "red",
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
});
