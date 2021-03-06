import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin, selectTravelTimeInformation, setTravelTimeInformation } from '../slice/navSlice';
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env'
import { MATRIX_MAPS_APIKEY } from '@env'
import PolylineDirection from '@react-native-maps/polyline-direction';



const Map = () => {
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null)


    useEffect(() => {
        if (!origin || !destination) return;
        mapRef.current.fitToSuppliedMarkers([ 'origin', 'destination' ], { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 } })

    }, [ origin, destination ])


    useEffect(() => {

        if (!origin || !destination) return;

        const getTravelTime = async () => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
            units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`)
                .then((res) => res.json())
                .then(data => {
                    dispatch(setTravelTimeInformation(data.rows[ 0 ].elements[ 0 ]))
                })
        };
        getTravelTime();
    }, [ origin, destination, GOOGLE_MAPS_APIKEY ]);


    // useEffect(() => {

    //     if (!origin || !destination) return;

    //     const getTravelTime = async () => {
    //         fetch(`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=51.4822656,-0.1933769&destinations=51.4994794,-0.1269979&departure_time=now&key=${MATRIX_MAPS_APIKEY}`)
    //             .then((res) => res.json())
    //             .then(data => {
    //                 dispatch(setTravelTimeInformation(data.rows[ 0 ].elements[ 0 ]))
    //                 console.log(data)
    //             })
    //     };
    //     getTravelTime();
    // }, [ origin, destination, MATRIX_MAPS_APIKEY ]);

    return (
        <MapView
            ref={mapRef}
            mapType="mutedStandard"
            style={tw`flex-1`}
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"

                />
            )}
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier='origin'
                />

            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier='destination'
                />


            )}




        </MapView>
    );
}

const styles = StyleSheet.create({})

export default Map;
