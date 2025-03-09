import axios from "axios";
import L from "leaflet";
import debounce from "lodash.debounce";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Form } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { getDistance } from "@/packages/lib/hooks/getDistance";
import { PopLocation } from "../lib/pop-locations-data";
import "leaflet/dist/leaflet.css";
import "../../../_components/leaflet-fix";

// Configure constants
const MAPTILER_API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
const DEFAULT_CENTER: [number, number] = [
  19.021055556730882, 72.83027885197798,
];
const DEFAULT_RADIUS = 5; // in kilometers
const MAX_SEARCHES = 5; // Maximum allowed searches
const SEARCH_RESET_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

interface PopLocationWithDistance extends PopLocation {
  distance: number;
}

const FlyToLocation: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, 13, { duration: 1.5 });
  }, [center, map]);

  return null;
};

interface MapComponentProps {
  popLocations: PopLocation[];
  onLocationSelect: (nodeId: string | null) => void; // Callback function
}

const MapComponent: React.FC<MapComponentProps> = ({
  popLocations,
  onLocationSelect,
}) => {
  const [filteredLocations, setFilteredLocations] = useState<
    PopLocationWithDistance[]
  >([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use `useRef` for in-memory rate limiting
  const searchLimits = useRef<{ count: number; firstSearchTimestamp: number }>({
    count: 0,
    firstSearchTimestamp: 0,
  });

  const handleLocationClick = (nodeId: string) => {
    onLocationSelect(nodeId); // Pass selected Node_Id to form
  };

  const checkSearchLimit = () => {
    const { count, firstSearchTimestamp } = searchLimits.current;

    if (count >= MAX_SEARCHES) {
      const timeSinceFirstSearch = Date.now() - firstSearchTimestamp;

      if (timeSinceFirstSearch < SEARCH_RESET_TIME) {
        const remainingTime = Math.ceil(
          (SEARCH_RESET_TIME - timeSinceFirstSearch) / (1000 * 60),
        );

        setError(
          `Search limit reached. Please try again in ${remainingTime} minutes.`,
        );

        return false;
      } else {
        // Reset the search count if the time window has passed
        searchLimits.current = { count: 0, firstSearchTimestamp: 0 };
      }
    }

    return true;
  };

  const updateSearchLimits = () => {
    const { count } = searchLimits.current;

    searchLimits.current = {
      count: count + 1,
      firstSearchTimestamp:
        count === 0 ? Date.now() : searchLimits.current.firstSearchTimestamp,
    };
  };

  const filterByRadius = useCallback(
    (center: [number, number], radiusKm: number) => {
      const locationsWithDistance = popLocations.map((location) => ({
        ...location,
        distance: getDistance(
          center[0],
          center[1],
          location.LAT,
          location.LONG,
        ),
      }));

      const nearby = locationsWithDistance
        .filter((location) => location.distance <= radiusKm)
        .sort((a, b) => a.distance - b.distance);

      setFilteredLocations(nearby);
    },
    [popLocations],
  );

  const handleGeolocationSuccess = useCallback(
    (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const userCoords: [number, number] = [latitude, longitude];

      setUserLocation(userCoords);
      setMapCenter(userCoords);
      filterByRadius(userCoords, DEFAULT_RADIUS);
    },
    [filterByRadius],
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        () => {
          setError("Location access denied. Using default center.");
          setFilteredLocations(
            popLocations.map((loc) => ({ ...loc, distance: 0 })),
          );
        },
        { enableHighAccuracy: true, timeout: 10000 },
      );
    }
  }, [handleGeolocationSuccess, popLocations]);

  const fetchSearchResults = debounce(async (searchTerm: string) => {
    if (!searchTerm) {
      setMapCenter(userLocation || DEFAULT_CENTER);
      filterByRadius(userLocation || DEFAULT_CENTER, DEFAULT_RADIUS);
      setLoading(false);

      return;
    }

    if (!checkSearchLimit()) {
      setLoading(false);

      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: searchTerm,
            format: "json",
            addressdetails: 1,
            countrycodes: "IN",
          },
        },
      );

      if (data.length > 0) {
        updateSearchLimits();
        const searchCoords: [number, number] = [
          parseFloat(data[0].lat),
          parseFloat(data[0].lon),
        ];

        setMapCenter(searchCoords);
        filterByRadius(searchCoords, DEFAULT_RADIUS);

        return;
      }

      const filtered = popLocations.filter((location) => {
        const searchLower = searchTerm.toLowerCase();

        return (
          location.City?.toLowerCase().includes(searchLower) ||
          location.PoP_Address?.toLowerCase().includes(searchLower) ||
          location.Node_Id?.toLowerCase().includes(searchLower)
        );
      });

      if (filtered.length > 0) {
        // const firstLocation = filtered[0];
        const [firstLocation] = filtered;
        setMapCenter([firstLocation.LAT, firstLocation.LONG]);
        filterByRadius([firstLocation.LAT, firstLocation.LONG], DEFAULT_RADIUS);
      }
    } catch (error) {
      setError("Search failed. Please check your input or try again later.");
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }, 500);

  return (
    <div className="relative h-full w-full bg-gray-100">
      {error ? (
        <div
          className="alert alert-danger alert-icon alert-dismissible mb-4"
          role="alert"
        >
          <em className="icon ni ni-cross-circle" />
          <strong>Error:</strong> {error}
        </div>
      ) : (
        <div className="form-group">
          <div className="form-control-wrap">
            <div className="form-icon form-icon-right">
              {loading && (
                <div
                  className="spinner-border spinner-border-sm text-primary"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </div>

            <Form.Control
              aria-label="Search location"
              className="form-control bg-white focus"
              onChange={(e) => fetchSearchResults(e.target.value)}
              placeholder="Search location..."
              type="text"
            />
          </div>
        </div>
      )}

      <MapContainer
        center={mapCenter}
        className="h-full w-full shadow-lg border border-primary"
        style={{ height: "50vh", width: "100%" }}
        zoom={13}
      >
        <FlyToLocation center={mapCenter} />

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {userLocation && (
          <Marker
            aria-label="Your current location"
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61168.png",
              iconSize: [32, 32],
            })}
            position={userLocation}
          >
            <Popup className="font-semibold">Your Current Location</Popup>
          </Marker>
        )}

        {filteredLocations.map((location) => (
          <Marker
            aria-label={`Location in ${location.City}`}
            key={location.Id}
            position={[location.LAT, location.LONG]}
          >
            <Popup className="min-w-[200px]">
              <h4 className="font-bold text-lg mb-1">{location.City}</h4>

              <p className="text-gray-600 mb-1">{location.PoP_Address}</p>

              <div className="text-xs text-gray-500 fw-bold">
                {location.distance.toFixed(2)} km away
              </div>

              <button
                aria-label={`Select ${location.City}`}
                className="btn btn-primary mt-2"
                onClick={() => handleLocationClick(location.Node_Id)}
              >
                Select
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default React.memo(MapComponent);
