import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css'; // Ensure this is imported
import marker from "../../../assets/pin.svg";

// Define the icon used for markers
const popUpIcon = new Icon({
    iconUrl: marker,
    iconSize: [50, 50],
});

const ProfileMap = (props) => {
    // Check if geoX and geoY exist, otherwise use a default location
    const mapCenter = props.profile.geoX && props.profile.geoY
        ? [props.profile.geoX, props.profile.geoY]
        : [51.5074, 0.1272];

    return (
        <div className="map-container" style={{ height: '10rem', width: '100%' }}>
            <MapContainer
                center={mapCenter}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {props.profile.geoX && props.profile.geoY && (
                    <Marker
                        position={mapCenter}
                        icon={popUpIcon}
                    />
                )}
            </MapContainer>
        </div>
    );
};

export default ProfileMap;
