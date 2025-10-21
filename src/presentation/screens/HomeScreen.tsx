import { icons } from '@/src/constants/icons';
import { Checkbox } from 'expo-checkbox';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import useDate from '../hooks/useDate';

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
 * @returns The rendered Task Item component.
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
                    <Text className={`${isCompleted ? 'line-through' : '' } font-semibold text-base`}
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

    const { getCurrentDate } = useDate();

    return (
        <View className='bg-secondary min-h-full relative'>
            <View className='min-h-full'>
                <View className='bg-primary h-[30%] flex-col py-20 items-center gap-8 relative overflow-hidden'>

                    <View className='absolute rounded-full -left-20 -bottom-28 bg-secondary opacity-15 size-56 justify-center items-center'>
                        <View className='size-36 rounded-full bg-primary' />
                    </View>

                    <View className='absolute rounded-full -right-28 -top-6 bg-secondary opacity-15 size-48 justify-center items-center'>
                        <View className='size-28 rounded-full bg-primary' />
                    </View>

                    <Text className='text-white font-bold text-lg'>
                        {getCurrentDate()}
                    </Text>

                    <Text className='text-white font-bold text-4xl'>
                        Today's Tasks
                    </Text>
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
            </View>
        </View>
    );
};

export default HomeScreen;
