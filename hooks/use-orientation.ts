import React from 'react';
import { Dimensions } from 'react-native';

// This hook is used to get the orientation of the device
const useOrientation = () => {
    const [orientation, setOrientation] = React.useState('portrait');

    React.useEffect(() => {
        const subscription = Dimensions.addEventListener('change', (dimensions) => {
            if (dimensions.window.width > dimensions.window.height) {
                setOrientation('landscape');
            } else {
                setOrientation('portrait');
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return orientation;
}

export default useOrientation