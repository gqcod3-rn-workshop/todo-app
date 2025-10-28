import { Tabs } from 'expo-router';
import React from 'react';

const _Layout = () => {
    return (
        <>
            <Tabs>
                <Tabs.Screen
                    name="index"
                    options={{ 
                        tabBarLabel: "Home",
                        headerShown: false,
                        tabBarStyle: { display: 'none' }
                    }}
                />
            </Tabs>
        </>
    );
};

export default _Layout;
