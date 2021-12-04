import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavigateCard from '../Components/NavigateCard';
import Map from '../Components/Map';
import RideOptionCard from '../Components/RideOptionCard';

import MapView from 'react-native-maps';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Mapscreen = () => {
    const Stack = createNativeStackNavigator();

    const screenOptions = {
        headerShown: false,
    };


    return (
        <View>
            <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator screenOptions={screenOptions}>
                    <Stack.Screen
                        name='NavigateCard'
                        component={NavigateCard}

                    />
                    <Stack.Screen
                        name='RideOptionCard'
                        component={RideOptionCard}

                    />
                </Stack.Navigator>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({})

export default Mapscreen;
