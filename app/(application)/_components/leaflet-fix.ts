"use client";

import L from "leaflet";

// Fix Leaflet default icon issue
const iconPrototype = L.Icon.Default.prototype as unknown as {
  _getIconUrl?: () => void;
};

// Delete the _getIconUrl method if it exists
if (iconPrototype._getIconUrl) {
  delete iconPrototype._getIconUrl;
}

// Merge custom options for the Leaflet default icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
