import * as React from "react";
import { useEffect, useState } from "react";
import AuthHeader from "./AuthHeader";
import { fetchUserRole } from "../services/roleSerivces";
import { findNewOwner } from "../services/findNewOwner";
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import marker from '../assets/pin.svg';
import { Icon } from 'leaflet';

const popUpIcon = new Icon({
    iconUrl: marker,
    iconSize: [50, 50],
});

const FindNewOwner = (props) => {
    const { logout } = props;
    const [userRole, setUserRole] = useState(null);
    const [owners, setOwners] = useState([]);
    const [mapCenter, setMapCenter] = useState(null);

    useEffect(() => {
        const initializePage = async () => {
            try {
                // Fetch user role
                const role = await fetchUserRole();
                if (role !== null) {
                    setUserRole(role);
                }

                // Fetch owners or sitters based on the user role
                const users = await findNewOwner(role);
                setOwners(users);

            } catch (error) {
                console.error("Error during page initialization:", error);
            }
        };

        const setUserLocation = () => {
            if (navigator.geolocation) {
                console.log("Geolocation is supported. Trying to get current position...");
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        console.log("Current position retrieved:", latitude, longitude);
                        setMapCenter([latitude, longitude]); // Set the map center with user's location
                    },
                    (error) => {
                        console.error("Error getting geolocation:", error);
                        // If permission is denied or there's an error, fall back to central London
                        setMapCenter([51.505, -0.09]);
                    }
                );
            } else {
                console.warn("Geolocation is not supported by this browser.");
                // If geolocation is not supported, fall back to central London
                setMapCenter([51.505, -0.09]);
            }
        };

        setUserLocation();
        initializePage();
    }, []);

    return (
        <div className="AuthHome">
            <AuthHeader logout={logout} />
            <div className="row m-sm-3 m-md-0">
                <div className="col-2 d-none d-md-block"></div>
                <div className="col-12 col-lg-5">
                    {userRole === 0 && (
                        <h1 style={{ fontWeight: 'bold' }}>
                            Find a new Owner
                        </h1>
                    )}
                    {userRole === 1 && (
                        <h1 style={{ fontWeight: 'bold' }}>
                            Find a new Sitter
                        </h1>
                    )}
                    <div className="mt-2">
                        {userRole === 0 && (
                            <p style={{ fontSize: '1rem', color: '#686565' }}>
                                In this section, you can find a new owner
                            </p>
                        )}
                        {userRole === 1 && (
                            <p style={{ fontSize: '1rem', color: '#686565' }}>
                                In this section, you can find a new sitter
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="row p-3 mb-5">
                <div className="col-2 d-none d-lg-block"></div>
                <div className="col-12 col-lg-8">
                    <div style={{ height: '500px' }}>
                        {mapCenter && (
                            <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {owners.map(owner => (
                                    <Marker
                                        key={owner.id}
                                        position={[owner.geoX, owner.geoY]}
                                        icon={popUpIcon}
                                    >
                                        <Popup>
                                            <>
                                                <strong>{owner.name} {owner.surname}</strong><br />
                                                {owner.address}<br />
                                                {owner.city}, {owner.postalCode} <br />
                                                {owner.email}
                                            </>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        )}
                    </div>
                </div>
            </div>
            <div className="row mt-5"></div>
        </div>
    );
};

export default FindNewOwner;
