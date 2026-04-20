import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import { getLocations } from '../lib/queries'

import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconUrl, shadowUrl })

const makeIcon = (color) =>
  L.divIcon({
    className: '',
    html: `<div style="width:16px;height:16px;background:${color};border-radius:50%;border:2.5px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.4)"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })

const greenIcon = makeIcon('#27AE60')
const yellowIcon = makeIcon('#F39C12')
const redIcon = makeIcon('#E74C3C')

function getPinIcon(crowdLevel) {
  if (crowdLevel === 'empty') return greenIcon
  if (crowdLevel === 'spaced') return yellowIcon
  return redIcon
}

function MapController() {
  const map = useMap()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      map.setView([pos.coords.latitude, pos.coords.longitude], 14)
    })
  }, [map])

  return null
}

function PositionControl({ onLocationUpdate }) {
  const map = useMap()

  function handleAutoPosition() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const userLat = pos.coords.latitude
      const userLng = pos.coords.longitude
      const currentZoom = map.getZoom()

      let targetZoom = currentZoom
      if (currentZoom < 13 || currentZoom > 16) {
        targetZoom = 14
      }

      map.flyTo([userLat, userLng], targetZoom, { duration: 1.5 })
      if (onLocationUpdate) onLocationUpdate({ lat: userLat, lng: userLng })
    })
  }

  return (
    <button
      onClick={handleAutoPosition}
      title="Center map on your location and adjust zoom"
      className="absolute z-[400] bg-white text-blue-900 rounded-lg shadow-md p-3 flex items-center justify-center border border-gray-300 hover:bg-blue-50 hover:border-blue-600 transition-colors duration-200 font-bold text-lg min-h-[48px] min-w-[48px]"
      style={{ bottom: '70px', right: '10px' }}
    >
      Locate
    </button>
  )
}

export default function Map({ filters, onPinClick }) {
  const [locations, setLocations] = useState([])
  const [userLocation, setUserLocation] = useState(null)

  useEffect(() => {
    async function load() {
      const data = await getLocations(filters)
      setLocations(data)
    }

    load()
  }, [filters])

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <MapController />
        <PositionControl onLocationUpdate={setUserLocation} />
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.locations.lat, loc.locations.lng]}
            icon={getPinIcon(loc.crowd_level)}
            eventHandlers={{ click: () => onPinClick(loc) }}
          />
        ))}
      </MapContainer>

      {userLocation && (
        <div className="absolute top-20 left-4 z-20 bg-white rounded-lg shadow-md p-3 text-xs text-gray-600 border border-blue-200 max-w-xs pointer-events-none">
          Centered at: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
        </div>
      )}
    </div>
  )
}
