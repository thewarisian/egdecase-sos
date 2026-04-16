import { useState } from 'react';
import Map from '../components/Map';
import FilterBar from '../components/FilterBar';
import PinDrawer from '../components/PinDrawer';

export default function Home() {
  // The filter state — starts with everything empty (show all)
  const [filters, setFilters] = useState({
    sound: '',
    light: '',
    crowd: ''
  });

  // Which pin is currently selected (null = no drawer shown)
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div>
      {/* Filter bar at the top */}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
      />

      {/* Map fills the rest of the screen */}
      <Map
        filters={filters}
        onPinClick={setSelectedLocation}
      />

      {/* Pin drawer appears when a pin is clicked */}
      <PinDrawer
        location={selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />
    </div>
  );
}