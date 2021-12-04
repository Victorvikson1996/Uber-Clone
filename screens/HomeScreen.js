import React from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView } from 'react-native';
import tw from 'tailwind-react-native-classnames'
import Navoptions from '../Components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slice/navSlice';
import NavFavourite from '../Components/NavFavourite';

const Homescreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain'
                    }}
                    source={{ uri: "https://links.papareact.com/gzs" }}
                />
                <GooglePlacesAutocomplete
                    placeholder="Where from?"
                    styles={{
                        container: {
                            flex: 0
                        },
                        textInput: {
                            fontSize: 18
                        }
                    }}
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }))

                        dispatch(setDestination(null))
                    }}
                    fetchDetails={true}
                    returnKeyType={'search'}
                    minLength={2}
                    enablePoweredByContainer={false}

                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en'
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />
                <Navoptions />
                <NavFavourite />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default Homescreen;
