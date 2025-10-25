import { icons } from '@/src/constants/icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import UniversalInput from '../components/UniversalInput';


/**
 * Add Todo Task Component
 * @summary
 * A screen component that allows users to add a new todo task with details such as title, category, date, time, and notes.
 * 
 * @returns The rendered AddTodoTask component.
 */
const AddTodoTask = () => {

    const [taskTitle, setTaskTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [notes, setNotes] = useState('');

    const router = useRouter();

    return (
        <View className='min-h-full relative bg-secondary'>
            <View className='max-h-[15%]'>
                <CustomHeader
                    showDate={false}
                    title='Add new Task'
                    marginTop='mt-10'
                    textSize='text-2xl'
                />
            </View>

            <View className='px-4 py-5 flex flex-col gap-10'>
                <UniversalInput
                    inputType="text"
                    label="Task Title"
                    value={taskTitle}
                    onValueChange={(value) => setTaskTitle(value as string)}
                />

                <View className='flex flex-row items-center gap-8'>
                    <Text className='font-semibold'>Category</Text>
                    <View className='flex flex-row items-center gap-3'>
                        <Image source={icons.categoryTask} className='border-2 border-white rounded-full' />
                        <Image source={icons.categoryEvent} className='border-2 border-white rounded-full' />
                        <Image source={icons.categoryGoal} className='border-2 border-white rounded-full' />
                    </View>
                </View>

                <View className='flex-row justify-between'>
                    <View className='w-[49%]'>
                        <UniversalInput
                            inputType="date"
                            label="Date"
                            value={selectedDate}
                            onValueChange={(value) => setSelectedDate(value as Date)}
                            hasIcon={true}
                        />
                    </View>

                    <View className='w-[49%]'>
                        <UniversalInput
                            inputType="time"
                            label="Time"
                            value={selectedTime}
                            onValueChange={(value) => setSelectedTime(value as Date)}
                            hasIcon={true}
                        />
                    </View>
                </View>

                <UniversalInput
                    inputType="text"
                    label="Notes"
                    value={notes}
                    onValueChange={(value) => setNotes(value as string)}
                    inputHeight="h-48"
                    multiline={true}
                />
            </View>

            <View className='absolute bottom-10 w-full px-4'>
                <CustomButton
                    label="Save"
                    onPress={() => router.back()}
                />
            </View>
        </View>
    );
};

export default AddTodoTask;
