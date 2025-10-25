import React from 'react';
import { Text, View } from 'react-native';
import useDate from '../hooks/useDate';

/**
 * Custom Props Interface for defining the properties of a custom header
 */
interface CustomHeaderProps {
    showDate: boolean;
    title: string;
    marginTop?: string;
    textSize?: string;
}

/**
 * Custom Header Component
 * @summary
 * A reusable header component that can display a title and optionally the current date with customizable styles.
 * 
 * @param {Object} props - Component properties
 * @returns The rendered Custom Header component
 */
const CustomHeader = ({ showDate, title, marginTop = 'mt-0', textSize = 'text-4xl' }: CustomHeaderProps) => {

    const { getCurrentDate } = useDate();

    return (
        <View className={`bg-primary h-[100%] flex-col ${showDate ? 'py-20' : 'py-15'} justify-center items-center gap-8 relative overflow-hidden`}>

            <View className='absolute rounded-full -left-20 -bottom-28 bg-secondary opacity-15 size-56 justify-center items-center'>
                <View className='size-36 rounded-full bg-primary'/>
            </View>

            <View className='absolute rounded-full -right-28 -top-6 bg-secondary opacity-15 size-48 justify-center items-center'>
                <View className='size-28 rounded-full bg-primary'/>
            </View>

            {showDate && (
                <Text className='text-white font-bold text-lg'>
                    {getCurrentDate()}
                </Text>
            )}

            <Text className={`text-white font-bold ${textSize} ${marginTop}`}>
                {title}
            </Text>
        </View>
    );
};

export default CustomHeader;
