import { View, Text, FlatList, ActivityIndicator } from 'react-native'
// import orders from '@assets/data/orders'
import OrderListItem from '@/components/OrderListItem'
import { useMyOrderList } from '@/api/orders';
const OrderScreen = () => {
    const { data: orders, isLoading, error } = useMyOrderList();

    if (isLoading) {
        return <ActivityIndicator />;
    }
    if (error) {
        return <Text>Failed to fetch</Text>;
    }
    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ gap: 10, padding: 10 }}
        />
    )
}
export default OrderScreen