import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

interface UseImagePickerOptions {
    allowsEditing?: boolean;
    aspect?: [number, number];
    quality?: number;
    mediaTypes?: ImagePicker.MediaType;
}

interface UseImagePickerResult {
    image: string | null;
    pickImage: () => Promise<string | null>;
    isLoading: boolean;
}

export const useImagePicker = (options: UseImagePickerOptions = {}): UseImagePickerResult => {
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const pickImage = useCallback(async (): Promise<string | null> => {
        try {
            setIsLoading(true);

            // Request permissions
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert('Permission required', 'Permission to access the media library is required.');
                setIsLoading(false);
                return null;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: options.mediaTypes || ['images'],
                allowsEditing: options.allowsEditing ?? true,
                aspect: options.aspect || [1, 1],
                quality: options.quality || 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri;
                setImage(uri);
                return uri;
            }

            return null;
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image');
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [options.allowsEditing, options.aspect, options.quality, options.mediaTypes]);

    return {
        image,
        pickImage,
        isLoading,
    };
};
