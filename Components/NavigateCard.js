import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import tw from 'tailwind-react-native-classnames';
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux';
import { setDestination } from '../slice/navSlice';
import { useNavigation } from '@react-navigation/core';
import NavFavourite from './NavFavourite';
import { Icon } from 'react-native-elements'


const Dismisskeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        {children}
    </TouchableWithoutFeedback>
)


const NavigateCard = () => {


    const dispatch = useDispatch()
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Morning, Victor</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View >
                    <GooglePlacesAutocomplete
                        placeholder="Where to?"
                        styles={toInputBoxStyles}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        enablePoweredByContainer={false}
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                location: details.geometry.location,
                                description: data.description
                            }))
                            navigation.navigate('RideOptionCard')

                        }}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'en '
                        }}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}


                    />
                </View>
                <NavFavourite />
            </View>
            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100 `}>
                <TouchableOpacity onPress={() => navigation.navigate("RideOptionCard")} style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                    <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: '#D0D0D0',
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})

export default NavigateCard;
