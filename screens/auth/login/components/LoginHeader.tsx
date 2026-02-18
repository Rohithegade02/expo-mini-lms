import { Text } from "@/components/atoms";
import { memo } from "react";
import { View } from "react-native";

export const LoginHeader = memo(() => (
    <View className="flex gap-2.5">
        <Text variant="h1" className="text-gray-900 dark:text-gray-100">Welcome Back</Text>
        <Text variant="body" className="text-gray-500 dark:text-gray-400">Log in to continue your learning journey</Text>
    </View>
));
