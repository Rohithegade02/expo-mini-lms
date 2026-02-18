import { Button, Text } from "@/components/atoms";
import { memo } from "react";
import { Pressable, View } from "react-native";
import { RegisterPresentationProps } from "../types";

export const RegisterFooter = memo((
    {
        onSubmit,
        isLoading,
        onLoginPress,
    }: RegisterPresentationProps
) => (
    <View className="mt-6 pb-10">
        <Button
            label="Register"
            onPress={onSubmit}
            isLoading={isLoading}
        />
        <View className="flex-row justify-center mt-2">
            <Text className="text-gray-500 dark:text-gray-400">Already have an account? </Text>
            <Pressable onPress={onLoginPress}>
                <Text className="text-primary-600 dark:text-primary-400 font-semibold">Log In</Text>
            </Pressable>
        </View>
    </View>
));