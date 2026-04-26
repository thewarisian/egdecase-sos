function FilterBtn({ isActive, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={[
        'py-2 px-4 rounded-full text-sm font-medium border min-h-[44px]',
        isActive
          ? 'bg-blue-900 text-white border-blue-900'
          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

export default function FilterBar({ filters, onFilterChange }) {
  function toggle(dimension, value) {
    onFilterChange((prev) => ({
      ...prev,
      [dimension]: prev[dimension] === value ? '' : value,
    }))
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-gray-500 w-10">Sound</span>
        <FilterBtn
          isActive={filters.sound === 'quiet'}
          onClick={() => toggle('sound', 'quiet')}
          label="Quiet"
        />
        <FilterBtn
          isActive={filters.sound === 'low-hum'}
          onClick={() => toggle('sound', 'low-hum')}
          label="Low Hum"
        />
        <FilterBtn
          isActive={filters.sound === 'loud'}
          onClick={() => toggle('sound', 'loud')}
          label="Loud"
        />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-gray-500 w-10">Light</span>
        <FilterBtn
          isActive={filters.light === 'natural'}
          onClick={() => toggle('light', 'natural')}
          label="Natural"
        />
        <FilterBtn
          isActive={filters.light === 'dim'}
          onClick={() => toggle('light', 'dim')}
          label="Dim"
        />
        <FilterBtn
          isActive={filters.light === 'bright'}
          onClick={() => toggle('light', 'bright')}
          label="Bright"
        />
        <FilterBtn
          isActive={filters.light === 'flickering'}
          onClick={() => toggle('light', 'flickering')}
          label="Flickering"
        />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-gray-500 w-10">Crowd</span>
        <FilterBtn
          isActive={filters.crowd === 'empty'}
          onClick={() => toggle('crowd', 'empty')}
          label="Empty"
        />
        <FilterBtn
          isActive={filters.crowd === 'spaced'}
          onClick={() => toggle('crowd', 'spaced')}
          label="Spaced"
        />
        <FilterBtn
          isActive={filters.crowd === 'crowded'}
          onClick={() => toggle('crowd', 'crowded')}
          label="Crowded"
        />
      </div>
    </div>
  )
}
