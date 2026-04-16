function ToggleGroup({ label, options, selectedValue, onSelect }) {
  return (
    <div className="mb-6">
      <p className="text-sm font-semibold text-gray-600 mb-2">{label}</p>
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
  isSubmitting
}) {
  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Submit a Report</h1>

      {/* Location dropdown */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-600 mb-2 block">
          Which location are you reporting on?
        </label>
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm"
          style={{ minHeight: '48px' }}
        >
          <option value="">Select a location...</option>
          {locations.map(loc => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Four toggle groups */}
      <ToggleGroup
        label="Sound Level"
        options={['quiet', 'low-hum', 'loud']}
        selectedValue={sound}
        onSelect={onSoundChange}
      />
      <ToggleGroup
        label="Light Type"
        options={['natural', 'dim', 'bright', 'flickering']}
        selectedValue={light}
        onSelect={onLightChange}
      />
      <ToggleGroup
        label="Crowd Level"
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

      {/* Submit button */}
      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg mt-4"
        style={{ minHeight: '48px' }}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Report'}
      </button>
    </div>
  );
}