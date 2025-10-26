import { icons } from '@/src/constants/icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import UniversalInput from '../components/UniversalInput';
import { useTodoService } from '../context/todo-context';


/**
 * Add Todo Task Component
 * @summary
 * A screen component that allows users to add a new todo task with details such as title, category, date, time, and notes.
 * 
 * @returns The rendered AddTodoTask component.
 */
const AddTodoTask = () => {

    const router = useRouter();
    const todoService = useTodoService();

    const [taskTitle, setTaskTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [notes, setNotes] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddTodo = async () => {
        try {
            setError(null);
            setLoading(true);

            if (!taskTitle.trim()) {
                setError('Task title is required');
                return;
            }

            const taskDate = selectedDate || new Date();
            const taskTime = selectedTime || new Date();

            const todoData = {
                title: taskTitle.trim(),
                category: 'task' as 'task',
                date: taskDate.toISOString().split('T')[0],
                time: taskTime.toTimeString().split(' ')[0].substring(0, 5),
                notes: notes.trim(),
            }

            await todoService.addTodo(todoData);
            console.log('Todo added successfully:', todoData);
        }
        catch (err) {
            console.error('Error adding todo:', err);
            setError('Failed to add todo');
        }
        finally {
            setLoading(false);
        }
    };

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
                {error && (
                    <View className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
                        <Text className='text-red-600'>{error}</Text>
                    </View>
                )}

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
                            iconSource={icons.iconCalendar}
                            label="Date"
                            value={selectedDate}
                            onValueChange={(value) => setSelectedDate(value as Date)}
                            hasIcon={true}
                        />
                    </View>

                    <View className='w-[49%]'>
                        <UniversalInput
                            inputType="time"
                            iconSource={icons.iconClock}
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
                    label={loading ? "Saving..." : "Save"}
                    onPress={async () => {
                        await handleAddTodo();
                        if (!error) {
                            router.back();
                        }
                    }}
                />
            </View>
        </View>
    );
};

export default AddTodoTask;
