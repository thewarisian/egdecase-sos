function ToggleGroup({ label, options, selectedValue, onSelect }) {
  return (
    <div className="mb-2">
      <p className="text-sm font-semibold text-gray-600 mb-1">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`py-2 px-4 rounded-full text-sm font-medium border transition-colors
              ${selectedValue === opt
                ? 'bg-blue-900 text-white border-blue-900'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="bg-white p-4 shadow-md z-40 relative">
      <ToggleGroup
        label="Sound"
        options={['quiet', 'low-hum', 'loud']}
        selectedValue={filters.sound}
        onSelect={(val) => onFilterChange({ ...filters, sound: val })}
      />
      <ToggleGroup
        label="Light"
        options={['natural', 'dim', 'bright', 'flickering']}
        selectedValue={filters.light}
        onSelect={(val) => onFilterChange({ ...filters, light: val })}
      />
      <ToggleGroup
        label="Crowd"
        options={['empty', 'spaced', 'crowded']}
        selectedValue={filters.crowd}
        onSelect={(val) => onFilterChange({ ...filters, crowd: val })}
      />
    </div>
  );
}