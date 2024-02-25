import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

// export default function MenuStack() {
//     return <Stack />
// }
export default function MenuStack() {
    return <Stack screenOptions={{
        headerRight: () => (
            <Link href="/cart" asChild>
                <Pressable>
                    {({ pressed }) => (
                        <FontAwesome
                            name="shopping-cart"
                            size={25}
                            color={Colors.light.tint}
                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                        />
                    )}
                </Pressable>
            </Link>
        ),
        headerLeft: () => (
            <Pressable onPress={() => supabase.auth.signOut()}>
                <FontAwesome
                    name="sign-out"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15 }}
                />
            </Pressable>
        ),
    }}>
        <Stack.Screen name="index" options={{ title: "Menu" }} />
    </Stack>
}