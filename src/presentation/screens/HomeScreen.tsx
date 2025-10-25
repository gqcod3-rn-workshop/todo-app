import { icons } from '@/src/constants/icons';
import { Checkbox } from 'expo-checkbox';
import { RelativePathString } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';

/**
 * Task Item Props Interface for defining the properties of a task item.
 */
interface TaskItemProps {
    category: 'goal' | 'task' | 'event';
    description: string;
}

/**
 * Task Item Component
 * @summary
 * The Task Item component represents an individual task with a category icon, description, and a checkbox to mark it as completed. If the task is marked as completed, 
 * the description text is displayed with a strikethrough effect and the category icon's opacity is reduced.
 * 
 * @param {Object} props - Component props
 * @param {('goal'|'task'|'event')} props.category - Task category that determines the icon
 * @param {string} props.description - Task description (truncated to 2 lines)
 * @returns The rendered Task Item component
 */
const TaskItem = ({ category, description }: TaskItemProps) => {

    const [isCompleted, setIsCompleted] = useState(false);

    const getCategoryIcon = (category: string) => {
        switch (category.toLowerCase()) {
            case 'goal':
                return icons.categoryGoal;
            case 'task':
                return icons.categoryTask;
            case 'event':
                return icons.categoryEvent;
            default:
                return icons.categoryTask;
        }
    };

    const CategoryIcon = getCategoryIcon(category);

    return (
        <View className='min-w-full h-24 bg-white flex-row items-center justify-between p-4'>
            <View className='flex-row items-center gap-3'>
                <View className='flex-row items-center gap-4 max-w-[220px]'>
                    <Image
                        source={CategoryIcon}
                        className={`${isCompleted ? 'opacity-50' : 'opacity-100'}`}
                    />
                    <Text className={`${isCompleted ? 'line-through' : ''} font-semibold text-base`}
                        numberOfLines={2}>{description}
                    </Text>
                </View>
            </View>
            <View>
                <Checkbox value={isCompleted}
                    onValueChange={setIsCompleted}
                    color={isCompleted ? '#4A3780' : undefined}
                    style={{ width: 24, height: 24 }}
                />
            </View>
        </View>
    );
};


/**
 * Home Screen 
 * @summary
 * The main screen of the Todo List application displaying the current date and the list of tasks pending and completed.
 * @returns The rendered Home Screen component.
 */
const HomeScreen = () => {

    const pathToAddTask = '/todo/add' as unknown as RelativePathString;

    return (
        <View className='bg-secondary min-h-full relative'>

            <View className='min-h-full'>
                <View className='max-h-[30%]'>
                    <CustomHeader
                        showDate={true}
                        title={'Today\'s Tasks'}
                    />
                </View>

                <View className='p-4 absolute top-[22%] flex-col gap-6 w-full'>
                    <View className='rounded-xl bg-white overflow-hidden'>
                        <TaskItem
                            category='goal'
                            description='Finish the React Native project'
                        />
                    </View>

                    <Text className='text-lg font-bold'>
                        Completed
                    </Text>

                    <View className='rounded-xl bg-white overflow-hidden'>
                        <TaskItem
                            category='task'
                            description='Finish the React Native project'
                        />
                    </View>
                </View>

                <View className='absolute bottom-10 w-full px-4'>
                    <CustomButton
                        label="Add New Task"
                        pathToNavigate={pathToAddTask}
                        onPress={() => console.log('Task added')}
                    />
                </View>
            </View>
        </View>
    );
};

export default HomeScreen;
