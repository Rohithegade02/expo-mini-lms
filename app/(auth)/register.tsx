import { Icon } from "@/components/atoms";
import { useTheme } from "@/hooks/use-theme";
import { RegisterScreen } from "@/screens/auth/register";
import { Pressable, View } from "react-native";

export default function RegisterPage() {
    const { toggleTheme, isDark } = useTheme();
    return <View className="flex-1 relative">
        <View className="absolute top-16 right-6 z-50">
            <Pressable onPress={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                <Icon
                    name={isDark ? "sunny" : "moon"}
                    size={24}
                    color={isDark ? "#fbbf24" : "#1f2937"}
                />
            </Pressable>
        </View>
        <RegisterScreen />
    </View>;
}
