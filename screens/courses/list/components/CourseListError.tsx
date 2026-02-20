import { Icon, Text } from '@/components/atoms'
import { theme } from '@/constants/theme'
import React from 'react'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CourseListErrorProps } from '../types'

// This component is responsible for rendering the error state of the course list.
const CourseListError = ({ error, onRefresh, testID }: CourseListErrorProps) => {
    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center px-10" testID={testID ? `${testID}-error` : undefined}>
            <Icon name="alert-circle-outline" size={64} color={theme.light.colors.error[500]} className="mb-4" />
            <Text variant="h2" className="text-gray-900 mb-2 text-center">Something went wrong</Text>
            <Text variant="body" className="text-gray-500 text-center mb-8">{error}</Text>
            <Pressable
                onPress={onRefresh}
                className="bg-primary-600 px-8 py-3 rounded-xl"
            >
                <Text className="text-white font-bold">Try Again</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default CourseListError