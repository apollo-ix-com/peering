import L from "leaflet";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";

const MAPTILER_API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

const DEFAULT_CENTER: [number, number] = [
  19.021055556730882, 72.83027885197798,
];

interface LocationPickerProps {
  onLocationChange: (location: { lat: number; lng: number }) => void;
}

const FlyToLocation: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  const prevCenter = useRef<[number, number]>(center);

  useEffect(() => {
    const isSameLocation =
      prevCenter.current[0] === center[0] &&
      prevCenter.current[1] === center[1];

    if (!isSameLocation) {
      map.flyTo(center, map.getZoom(), {
        animate: true,
        duration: 2,
        easeLinearity: 0.25,
      });
      prevCenter.current = center;
    }
  }, [center, map]);

  return null;
};

const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationChange,
}) => {
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: DEFAULT_CENTER[0],
    lng: DEFAULT_CENTER[1],
  });

  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);

  const mapRef = useRef<L.Map | null>(null);

  const MapEventHandler = () => {
    useMapEvents({
      movestart: () => setInitialLoadComplete(true), // Detects user interaction
      moveend: (event) => {
        const newCenter = event.target.getCenter();
        setMapCenter({ lat: newCenter.lat, lng: newCenter.lng });
        onLocationChange({ lat: newCenter.lat, lng: newCenter.lng });
      },
    });

    return null;
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };

          if (!initialLoadComplete) {
            setMapCenter(newLocation);
            onLocationChange(newLocation);

            if (mapRef.current) {
              mapRef.current.flyTo(newLocation, mapRef.current.getZoom());
            }
          }
        },
        (error) => {
          console.warn("Location access denied or error occurred.", error);
          setMapCenter({ lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] });
          onLocationChange({ lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] });
        },
        { enableHighAccuracy: true, timeout: 10000 },
      );
    } else {
      console.warn("Geolocation not available. Using default location.");
      setMapCenter({ lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] });
      onLocationChange({ lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] });
    }
  }, [onLocationChange, initialLoadComplete]);

  return (
    <div className="position-relative w-100 vh-50 vh-md-60 vh-lg-70">
      <div className="h-100 w-100 rounded shadow-lg">
        <MapContainer
          center={mapCenter}
          maxZoom={18}
          minZoom={5}
          ref={mapRef}
          style={{ height: "50vh", width: "100%" }}
          zoom={16}
        >
          {!initialLoadComplete && (
            <FlyToLocation center={[mapCenter.lat, mapCenter.lng]} />
          )}

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapEventHandler />
        </MapContainer>

        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{ zIndex: 1000 }}
        >
          <Image
            alt="marker"
            height={41}
            src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png"
            width={25}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
