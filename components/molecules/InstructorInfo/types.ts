import { ViewProps } from 'react-native';

export interface InstructorName {
    first: string;
    last: string;
}

export interface InstructorInfoProps extends ViewProps {
    name: InstructorName;
    avatar?: string;
    email?: string;
}
