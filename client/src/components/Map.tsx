
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState, useEffect } from 'react';
import { CircleF, GoogleMap, MarkerF, LoadScript } from '@react-google-maps/api';
import logo from '../assets/motorbike.png'
import { faker } from '@faker-js/faker';

const Map = () => {
    // const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    const google = window.google;
    const randomData = [];

    const [currentLocation, setCurrentLocation] = useState(null);
    const [randomUserData, setRandomUserData] = useState([]);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position)
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error getting location:', error.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser');
        }

        currentLocation && generateRandomUserData();
    }, [])

    const generateRandomUserData = () => {
        for (let i = 0; i < 10; i++) {
            const radius = 1 / 1000; // 1 degree of latitude is approximately 111 km
            const randomLat = currentLocation.lat + (Math.random() - 0.5) * 4 * radius;
            const randomLng = currentLocation.lng + (Math.random() - 0.5) * 4 * radius;

            const fakeUserData = {
                name: faker.internet.userName(),
                bikeName: faker.vehicle.manufacturer(),
                bikeModel: faker.vehicle.model(),
                bikeMileage: faker.number.int({ min: 5000, max: 30000 }),

            };


            const distance = calculateDistance(currentLocation, { lat: randomLat, lng: randomLng });
            fakeUserData.distance = distance

            randomData.push({ coordinates: { lat: randomLat, lng: randomLng }, userData: fakeUserData, });
            setRandomUserData(randomData);

        }
    };

    const calculateDistance = (coord1, coord2) => {
        const R = 6371; // Earth radius in kilometers

        const dLat = deg2rad(coord2.lat - coord1.lat);
        const dLng = deg2rad(coord2.lng - coord1.lng);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(coord1.lat)) * Math.cos(deg2rad(coord2.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // Distance in kilometers

        return distance;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const handleMarkerClick = (userData) => {
        setSelectedUserData(userData);
    };

    const mapStyles = {
        height: '300px',
        width: '90%',
    };

    return (

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1vh' }}>
            {currentLocation &&
                <LoadScript googleMapsApiKey="">
                    <GoogleMap mapContainerStyle={mapStyles} center={currentLocation} zoom={15}>
                        <MarkerF key={'abc'} position={currentLocation} />
                        <CircleF
                            center={currentLocation}
                            radius={500} // 1 km in meters
                            options={{
                                fillColor: 'red',
                                fillOpacity: 0.3,
                                strokeColor: 'black',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                clickable: false,
                                draggable: false,
                                editable: false,
                                visible: true,
                            }}
                        />
                        {randomUserData && randomUserData.map((data, index) => (
                            <MarkerF icon={{
                                url: logo, scaledSize: new google.maps.Size(30, 30)
                            }} key={index} position={data.coordinates} title={`Name: ${data.userData.name}\nBike: ${data.userData.bikeName}\nModel: ${data.userData.bikeModel}\nMileage: ${data.userData.bikeMileage} km`}
                                onClick={() => handleMarkerClick(data.userData)}
                            />
                        ))}

                    </GoogleMap>
                </LoadScript>
            }
        </div>
    );

}

export default Map;
