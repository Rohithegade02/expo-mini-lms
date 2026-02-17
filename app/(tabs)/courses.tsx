import { Text } from '@/components/atoms';
import { View } from 'react-native';

export default function CoursesScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text variant="h2">Course Catalog</Text>
            <Text variant="body" className="text-gray-500 mt-2">Coming Soon in Phase 3</Text>
        </View>
    );
}
