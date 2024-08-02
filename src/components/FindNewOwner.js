import * as React from "react";
import { useEffect, useState } from "react";
import AuthHeader from "./AuthHeader";
import { fetchUserRole } from "../services/roleSerivces";
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import marker from '../assets/pin.svg';
import { Icon } from 'leaflet'
const popUpIcon = new Icon({
    iconUrl: marker,
    iconSize: [50,50]
})


const FindNewOwner = (props) => {
    const { logout } = props;
    const [userRole, setUserRole] = useState(null);
    const position = [51.505, -0.09];

    useEffect(() => {
        const initializePage = async () => {
            const role = await fetchUserRole();
            if (role !== null) {
                setUserRole(role);
            }
        };

        initializePage();
    }, []);

    return (
        <div className="AuthHome">
            <AuthHeader logout={logout} />
            <div className="row">
                <div className="col-2"></div>
                <div className="col-5 m-lg-5">
                    {userRole === 0 && (
                        <h1 style={{fontWeight: 'bold'}}>
                            Find a new Owner
                        </h1>
                    )}
                    {userRole === 1 && (
                        <h1 style={{fontWeight: 'bold'}}>
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
                <div className="col-2"></div>
                <div className="col-8">
                    <div style={{ height: '500px' }}>
                        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position} icon={popUpIcon} >
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
            <div className="row mt-5"></div>
        </div>
    );
};

export default FindNewOwner;
