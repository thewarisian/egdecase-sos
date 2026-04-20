function ToggleGroup({ label, options, selectedValue, onSelect }) {
  return (
    <div className="mb-6">
      <p className="text-sm font-semibold text-gray-600 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={[
              'py-2 px-4 rounded-full text-sm font-medium border min-h-[44px]',
              selectedValue === opt
                ? 'bg-blue-900 text-white border-blue-900'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600',
            ].join(' ')}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ReportForm({
  locations,
  selectedLocation,
  onLocationChange,
  sound,
  onSoundChange,
  light,
  onLightChange,
  crowd,
  onCrowdChange,
  scent,
  onScentChange,
  onSubmit,
  isSubmitting,
  submitted,
}) {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 overflow-y-auto h-full">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Report a location</h1>

      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-600 mb-2">Which location are you reporting?</p>
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white min-h-[48px]"
        >
          <option value="">Select a location...</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <ToggleGroup
        label="Sound level"
        options={['quiet', 'low-hum', 'loud']}
        selectedValue={sound}
        onSelect={onSoundChange}
      />
      <ToggleGroup
        label="Lighting"
        options={['natural', 'dim', 'bright', 'flickering']}
        selectedValue={light}
        onSelect={onLightChange}
      />
      <ToggleGroup
        label="Crowd level"
        options={['empty', 'spaced', 'crowded']}
        selectedValue={crowd}
        onSelect={onCrowdChange}
      />
      <ToggleGroup
        label="Scent"
        options={['fragrance-free', 'strong']}
        selectedValue={scent}
        onSelect={onScentChange}
      />

      {submitted && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium">
          Report submitted and saved.
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={isSubmitting || !selectedLocation}
        className="w-full py-4 bg-blue-900 text-white font-bold rounded-xl text-base min-h-[56px] disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Report'}
      </button>
    </div>
  )
}
