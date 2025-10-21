import { useState } from 'react';

/**
 * Use Date Hook
 * @summary
 * This hook provides functionalities to get the current date and time, as well as a method to refresh the date.
 * @returns An object containing the current date, formatted date string, formatted time string, and a refresh function.
 */
const useDate = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getCurrentDate = () => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return currentDate.toLocaleDateString('en-US', options);
    }

    const getCurrentTime = () => {
        const options: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return currentDate.toLocaleTimeString('en-US', options);
    }

    const refreshDate = () => {
        setCurrentDate(new Date());
    }

    return {
        currentDate,
        getCurrentDate,
        getCurrentTime,
        refreshDate,
    }
};

export default useDate;