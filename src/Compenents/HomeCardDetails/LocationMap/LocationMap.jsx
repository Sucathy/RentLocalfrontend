import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

const redHouseIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/69/69524.png",
    iconSize: [35, 35],
    iconAnchor: [17, 34],
    popupAnchor: [0, -30],
});

// Helper component to auto-open popup
const AlwaysOpenPopup = ({ coordinates }) => {
    const map = useMap();

    useEffect(() => {
        const marker = L.marker([coordinates.lat, coordinates.lng], {
            icon: redHouseIcon,
        })
            .addTo(map)
            .bindPopup(
                `<div style="text-align:center;">
          🏠 <b>Location</b><br/>
          📍 ${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}<br/>
          <a href="https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}" 
             target="_blank" rel="noopener noreferrer"
             style="color:#000;text-decoration:underline;">Open in Maps</a>
        </div>`
            )
            .openPopup();

        return () => map.removeLayer(marker);
    }, [map, coordinates]);

    return null;
};

const LocationMap = ({ coordinates, name, location }) => {
    if (!coordinates) {
        return (
            <p style={{ marginTop: "20px", color: "#555" }}>
                📍 Location map not available.
            </p>
        );
    }

    return (
        <div>
            <div>
                <h2>Where you’ll Stay</h2>
            </div>
            <div
                className="map-container"
                style={{
                    padding: "20px",
                    height: "400px",
                    maxWidth: "1100px",
                    borderRadius: "32px",
                    boxShadow: "10px 4px 15px hsla(0, 0%, 0%, 0.10)",
                }}
            >
                <MapContainer
                    center={[coordinates.lat, coordinates.lng]}
                    zoom={17}
                    style={{ height: "100%", width: "100%", borderRadius: "32px" }}
                    scrollWheelZoom={false} // Disable scroll zoom by default
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <AlwaysOpenPopup coordinates={coordinates} />

                    {/* Enable scroll zoom on click */}
                    <EnableScrollOnClick />
                </MapContainer>
            </div>
        </div>
    );
};

// ✅ Component to enable scroll wheel zoom after click
const EnableScrollOnClick = () => {
    const map = useMap();

    useEffect(() => {
        const enableZoom = () => {
            map.scrollWheelZoom.enable();
            map.off("click", enableZoom); // only enable once
        };

        map.on("click", enableZoom);

        return () => map.off("click", enableZoom);
    }, [map]);

    return null;
};

export default LocationMap;
