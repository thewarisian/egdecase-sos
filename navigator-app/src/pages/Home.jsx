import { useState } from 'react'
import FilterBar from '../components/FilterBar'
import Map from '../components/Map'
import PinDrawer from '../components/PinDrawer'

export default function Home() {
  const [filters, setFilters] = useState({ sound: '', light: '', crowd: '' })
  const [selectedLocation, setSelectedLocation] = useState(null)

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-shrink-0 bg-white shadow-sm px-4 py-3 z-10">
        <FilterBar filters={filters} onFilterChange={setFilters} />
      </div>

      <div className="flex-1 relative">
        <Map filters={filters} onPinClick={setSelectedLocation} />

        {selectedLocation && (
          <PinDrawer
            location={selectedLocation}
            onClose={() => setSelectedLocation(null)}
          />
        )}
      </div>
    </div>
  )
}
