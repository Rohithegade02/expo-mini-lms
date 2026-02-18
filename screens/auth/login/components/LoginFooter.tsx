import { Button, Text } from "@/components/atoms";
import { memo } from "react";
import { Pressable, View } from "react-native";
import { LoginPresentationProps } from "../types";

export const LoginFooter = memo((
    {
        onSubmit,
        isLoading,
        onRegisterPress,
    }: LoginPresentationProps
) => (
    <View className="mt-6 pb-10">
        <Button
            label="Log In"
            onPress={onSubmit}
            isLoading={isLoading}
        />
        <View className="flex-row justify-center mt-2">
            <Text className="text-gray-500 dark:text-gray-400">Don't have an account? </Text>
            <Pressable onPress={onRegisterPress}>
                <Text className="text-primary-600 dark:text-primary-400 font-semibold">Register</Text>
            </Pressable>
        </View>
    </View>
));