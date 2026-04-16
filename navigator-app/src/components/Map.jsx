import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getLocations } from '../lib/queries'; // ← This is how you get data

// FIX: Vite breaks default Leaflet markers. This fixes it.
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, shadowUrl });

// Custom colored circle pins
const greenIcon = L.divIcon({
  className: '',
  html: '<div style="width:16px;height:16px;background:#27AE60;border-radius:50%;border:2px solid white"></div>'
});
const yellowIcon = L.divIcon({
  className: '',
  html: '<div style="width:16px;height:16px;background:#F39C12;border-radius:50%;border:2px solid white"></div>'
});
const redIcon = L.divIcon({
  className: '',
  html: '<div style="width:16px;height:16px;background:#E74C3C;border-radius:50%;border:2px solid white"></div>'
});

// Pick color based on how crowded the place is
function getIcon(crowdLevel) {
  if (crowdLevel === 'empty') return greenIcon;
  if (crowdLevel === 'spaced') return yellowIcon;
  return redIcon;
}

export default function Map({ filters, onPinClick }) {
  const [locations, setLocations] = useState([]);

  // This runs every time filters change
  useEffect(() => {
    async function loadLocations() {
      const data = await getLocations(filters);
      setLocations(data);
    }
    loadLocations();
  }, [filters]);

  return (
    <MapContainer
      center={[28.6139, 77.2090]}  // Default center (Delhi — change to your city)
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.locations.lat, loc.locations.lng]}
          icon={getIcon(loc.crowd_level)}
          eventHandlers={{ click: () => onPinClick(loc) }}
        />
      ))}
    </MapContainer>
  );
}