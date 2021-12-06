import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavigateCard from '../Components/NavigateCard';
import Map from '../Components/Map';
import RideOptionCard from '../Components/RideOptionCard';

import MapView from 'react-native-maps';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';



const Mapscreen = () => {
    const Stack = createNativeStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    const navigation = useNavigation();
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full`}>
                <Icon name='menu' />
            </TouchableOpacity>
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
