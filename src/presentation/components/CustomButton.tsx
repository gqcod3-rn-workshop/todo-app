import { Link, RelativePathString } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
    label: string;
    pathToNavigate?: RelativePathString;
    onPress: () => void;
}

const CustomButton = ({ label, pathToNavigate, onPress }: CustomButtonProps) => {
    const ButtonContent = (
        <TouchableOpacity
            className="bg-primary rounded-full px-2 py-4"
            onPress={onPress}
        >
            <Text className="font-bold text-white text-center text-lg">
                {label}
            </Text>
        </TouchableOpacity>
    );

    if (pathToNavigate) {
        return (
            <Link href={pathToNavigate} asChild>
                {ButtonContent}
            </Link>
        );
    }
    else return ButtonContent;
};

export default CustomButton;
