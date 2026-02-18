import { LegendList } from '@legendapp/list';
import React, { memo, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CourseFooter } from './components/CourseFooter';
import { CourseHeader } from './components/CourseHeader';
import { FeatureItem } from './components/FeatureItem';
import { HeaderBar } from './components/HeaderBar';
import { CourseDetailsPresentationProps } from './types';

export const CourseDetailsPresentation: React.FC<CourseDetailsPresentationProps> = memo(({
    course,
    isEnrolled,
    isBookmarked,
    isLoading,
    onEnroll,
    onToggleBookmark,
    onBack,
    onShare,
    onViewContent,
    testID = "course-details-screen",
    accessibilityLabel = "course-details-screen",
}) => {


    const features = useMemo(() => ([
        { id: '1', icon: 'play-circle-outline', label: '12 Lessons' },
        { id: '2', icon: 'time-outline', label: '4.5 Hours' },
        { id: '3', icon: 'bar-chart-outline', label: 'All Levels' },
        { id: '4', icon: 'shield-checkmark-outline', label: 'Certificate' },
    ]), []);

    return (
        <SafeAreaView className="flex-1 bg-white" testID={testID} accessibilityLabel={accessibilityLabel}>

            {/* Top Navigation */}
            <HeaderBar
                isBookmarked={isBookmarked}
                onBack={onBack}
                onShare={onShare}
                onToggleBookmark={onToggleBookmark}
                testID={`${testID}-header-bar`}
                accessibilityLabel={`${testID}-header-bar`}
            />

            <LegendList
                data={features}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <FeatureItem
                        icon={item.icon}
                        label={item.label}
                        testID={`${testID}-feature-${item.id}`}
                        accessibilityLabel={`${testID}-feature-${item.id}`}
                    />
                )}
                recycleItems
                ListHeaderComponent={
                    <CourseHeader
                        course={course}
                        testID={`${testID}-course-header`}
                        accessibilityLabel={`${testID}-course-header`}
                    />
                }
                contentContainerClassName="flex-1"
                testID={`${testID}-features-list`}
                accessibilityLabel={`${testID}-features-list`}
            />
            <CourseFooter
                price={course.price}
                isEnrolled={isEnrolled}
                isLoading={isLoading}
                onEnroll={onEnroll}
                onViewContent={onViewContent}
                testID={`${testID}-footer`}
                accessibilityLabel={`${testID}-footer`}
            />
        </SafeAreaView>
    );
});

CourseDetailsPresentation.displayName = 'CourseDetailsPresentation';


