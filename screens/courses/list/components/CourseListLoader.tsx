import { Skeleton } from '@/components/atoms'
import clsx from 'clsx'
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CourseListLoaderProps } from '../types'
import { CourseListHeader } from './CourseListHeader'

// This component is responsible for rendering the loading state of the course list.
const CourseListLoader = ({ orientation, searchQuery, onSearch, isSmartSearchLoading, onSmartSearch, testID, accessibilityLabel }: CourseListLoaderProps) => {
    return (
        <SafeAreaView className={clsx("flex-1 bg-white dark:bg-gray-900", orientation === 'landscape' ? 'px-16' : 'px-4')}>
            <CourseListHeader
                searchQuery={searchQuery}
                onSearch={onSearch}
                isSmartSearchLoading={isSmartSearchLoading}
                onSmartSearch={onSmartSearch}
                testID={`${testID}-header`}
                accessibilityLabel={`${testID}-header`}
            />
            <View className="px-2">
                {[1, 2, 3].map((i) => (
                    <View key={i} className="mb-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
                        <Skeleton height={192} />
                        <View className="p-4">
                            <View className="flex-row items-center mb-2">
                                <Skeleton width={24} height={24} borderRadius={12} />
                                <Skeleton width={120} height={16} className="ml-2" />
                            </View>
                            <Skeleton width="90%" height={24} className="mb-2" />
                            <Skeleton width="60%" height={16} />
                        </View>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    )
}

export default CourseListLoader