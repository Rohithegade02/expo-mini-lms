import { Text } from "@/components/atoms";
import { memo } from "react";
import { View } from "react-native";

export const RegisterHeader = memo(() => (
    <View className="flex gap-3 mb-3">
        <Text variant="h1" className="text-gray-900 dark:text-gray-100 mb-2">Create Account</Text>
        <Text variant="body" className="text-gray-500 dark:text-gray-400">Join our community and start learning today</Text>
    </View>
));