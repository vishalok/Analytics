import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchGeographicalDistribution } from '../services/api'; // Ensure this path is correct for your project

// Create a function to convert city names to lat/lng using a geocoding service
const getLatLng = async (city) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`);
        const data = await response.json();
        if (data.length > 0) {
            return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
    } catch (error) {
   //console.error('Error fetching lat/lng:', error);
    }
    return null;
};

const GeographicalDistributionMap = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchGeographicalDistribution();
            const locationPromises = data.map(async (cityData) => {
                const latLng = await getLatLng(cityData._id);
                if (latLng) {
                    return { ...latLng, city: cityData._id, customerCount: cityData.customerCount };
                }
                return null;
            });
            const resolvedLocations = await Promise.all(locationPromises);
            setLocations(resolvedLocations.filter(location => location !== null));
        };

        fetchData();
    }, []);

    return (
        <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location, index) => (
                <Marker key={index} position={[location.lat, location.lng]}>
                    <Popup>
                        {location.city}: {location.customerCount} customers
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default GeographicalDistributionMap;
