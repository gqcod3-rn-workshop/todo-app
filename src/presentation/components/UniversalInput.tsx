import { icons } from '@/src/constants/icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

/**
 * Universal Input Component Props Interface
 */
interface UniversalInputProps {
    inputType: 'text' | 'date' | 'time';
    label: string;
    value?: string | Date | null;
    onValueChange?: (value: string | Date | null) => void;
    inputHeight?: string;
    hasIcon?: boolean;
    multiline?: boolean;
    iconSource?: any;
}

/**
 * Universal Input Component
 * @summary
 * A reusable input component that handles text, date, and time inputs with optional icons. It supports multiline text input and displays
 *  a date/time picker when needed.
 * 
 * @param {UniversalInputProps} props - The properties for the UniversalInput component.
 * @returns The rendered UniversalInput component.
 */
const UniversalInput = ({
    label,
    inputType,
    value,
    onValueChange,
    inputHeight = 'h-14',
    hasIcon = false,
    multiline = false,
    iconSource = icons.categoryGoal
}: UniversalInputProps) => {

    const [showPicker, setShowPicker] = useState(false);

    const getDisplayValue = () => {
        if (!value)
            return '';

        if (inputType === 'text')
            return value as string;

        if (inputType === 'date' && value instanceof Date)
            return value.toLocaleDateString(['en-US']);

        if (inputType === 'time' && value instanceof Date)
            return value.toLocaleTimeString(['en-US'], { hour: '2-digit', minute: '2-digit' });

        return '';
    };

    const handleDateTimeChange = (_event: any, selected?: Date) => {
        setShowPicker(false);
        if (selected && onValueChange) {
            onValueChange(selected);
        }
    };

    const handleTextChange = (text: string) => {
        if (onValueChange) {
            onValueChange(text);
        }
    };

    const openPicker = () => {
        setShowPicker(true);
    };

    return (
        <View className='flex flex-col gap-2'>
            <Text className='font-semibold'>{label}</Text>
            <View className='relative flex gap-4'>
                {inputType === 'text' && (
                    <TextInput
                        placeholder={label}
                        value={value as string || ''}
                        onChangeText={handleTextChange}
                        multiline={multiline}
                        textAlignVertical={multiline ? 'top' : 'center'}
                        className={`bg-white ${inputHeight} rounded-lg px-4 ${multiline ? 'pt-3' : ''}`}
                    />
                )}

                {(inputType === 'date' || inputType === 'time') && (
                    <>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={openPicker}
                            className={`bg-white ${inputHeight} rounded-lg px-4 justify-center`}
                        >
                            <Text className={value ? 'text-black' : 'text-gray-400'}>
                                {getDisplayValue() || label}
                            </Text>
                        </TouchableOpacity>

                        {showPicker && (
                            <DateTimePicker
                                value={value instanceof Date ? value : new Date()}
                                mode={inputType === 'date' ? 'date' : 'time'}
                                is24Hour={false}
                                display="default"
                                onChange={handleDateTimeChange}
                            />
                        )}
                    </>
                )}

                {hasIcon && <Image source={iconSource} className='absolute size-5 right-4 top-4' />}
            </View>
        </View>
    );
};

export default UniversalInput;