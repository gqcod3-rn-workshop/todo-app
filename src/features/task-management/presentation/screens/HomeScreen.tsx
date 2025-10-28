import { icons } from '@/src/shared/constants/icons';
import TodoEntity from '@/src/features/task-management/domain/entities/todo-entity';
import { Checkbox } from 'expo-checkbox';
import { RelativePathString, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import { useTodoService } from '../context/todo-context';

/**
 * Task Item Props Interface for defining the properties of a task item.
 */
interface TaskItemProps {
    todo: TodoEntity;
    onToggleStatus: (id: string, currentStatus: boolean) => Promise<void>;
}

/**
 * Task Item Component
 * @summary
 * The Task Item component represents an individual task with a category icon, description, and a checkbox to mark it as completed. 
 * Now properly connected to the todo entity and handles status updates through the parent component.
 * 
 * @param {Object} props - Component props
 * @param {TodoEntity} props.todo - The complete todo entity
 * @param {Function} props.onToggleStatus - Function to handle status changes
 * 
 * @returns The rendered Task Item component
 */
const TaskItem = ({ todo, onToggleStatus }: TaskItemProps) => {

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

    const CategoryIcon = getCategoryIcon(todo.getCategoryAsString());

    const handleToggle = async () => {
        await onToggleStatus(todo.getIdAsString(), todo.isCompleted);
    };

    return (
        <View className='min-w-full h-24 bg-white flex-row items-center justify-between p-4'>
            <View className='flex-row items-center gap-3'>
                <View className='flex-row items-center gap-4 max-w-[220px]'>
                    <Image
                        source={CategoryIcon}
                        className={`${todo.isCompleted ? 'opacity-50' : 'opacity-100'}`}
                    />
                    <Text className={`${todo.isCompleted ? 'line-through' : ''} font-semibold text-base`}
                        numberOfLines={2}>{todo.title}
                    </Text>
                </View>
            </View>
            <View>
                <Checkbox
                    value={todo.isCompleted}
                    onValueChange={handleToggle}
                    color={todo.isCompleted ? '#4A3780' : undefined}
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
 * 
 * @returns The rendered Home Screen component.
 */
const HomeScreen = () => {

    const todoService = useTodoService();
    const pathToAddTask = '/todo/add' as unknown as RelativePathString;

    const [todos, setTodos] = useState<TodoEntity[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadTodos = async () => {
        try {
            setLoading(true);
            setError(null);
            const allTodos = await todoService.getAllTodos();
            setTodos(allTodos);
        }
        catch (err) {
            setError('Failed to load todos');
        }
        finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            setError(null);
            await todoService.updateTodoStatus(id, !currentStatus);
            await loadTodos();
        }
        catch (err) {
            setError('Failed to update todo');
        }
    };

    useEffect(() => {
        loadTodos();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadTodos();
        }, [])
    );

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
                    <FlatList
                        data={todos.filter(todo => !todo.isCompleted)}
                        keyExtractor={(item) => item.getIdAsString()}
                        renderItem={({ item }) => (
                            <TaskItem
                                todo={item}
                                onToggleStatus={handleToggleStatus}
                            />
                        )}
                        className='rounded-xl bg-white overflow-hidden'
                        ListEmptyComponent={
                            <View className='p-4'>
                                <Text className='text-gray-500 text-center'>No active tasks</Text>
                            </View>
                        }
                    />

                    <Text className='text-lg font-bold'>
                        Completed
                    </Text>

                    <FlatList
                        className='rounded-xl bg-white overflow-hidden'
                        data={todos.filter(todo => todo.isCompleted)}
                        keyExtractor={(item) => item.getIdAsString()}
                        renderItem={({ item }) => (
                            <TaskItem
                                todo={item}
                                onToggleStatus={handleToggleStatus}
                            />
                        )}
                        ListEmptyComponent={
                            <View className='p-4'>
                                <Text className='text-gray-500 text-center'>No completed tasks</Text>
                            </View>
                        }
                    />
                </View>

                <View className='absolute bottom-10 w-full px-4'>
                    <CustomButton
                        label="Add New Task"
                        pathToNavigate={pathToAddTask}
                        onPress={() => { }}
                    />
                </View>
            </View>
        </View>
    );
};

export default HomeScreen;
