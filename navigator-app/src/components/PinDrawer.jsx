import { confirmReport } from '../lib/queries';

export default function PinDrawer({ location, onClose }) {
  if (!location) return null; // Don't show anything if no location selected

  async function handleConfirm() {
    await confirmReport(location.id);
    alert('Confirmed! Thank you.');
  }

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-white rounded-t-2xl shadow-lg p-6 z-40">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 text-xl font-bold"
        style={{ minWidth: '44px', minHeight: '44px' }}
      >
        ×
      </button>

      {/* Location name */}
      <h2 className="text-lg font-bold text-blue-900 mb-1">
        {location.locations.name}
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        {location.locations.category}
      </p>

      {/* Sensory tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {location.sound_level && (
          <span className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full font-medium">
            🔊 {location.sound_level}
          </span>
        )}
        {location.light_type && (
          <span className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full font-medium">
            💡 {location.light_type}
          </span>
        )}
        {location.crowd_level && (
          <span className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full font-medium">
            👥 {location.crowd_level}
          </span>
        )}
        {location.scent && (
          <span className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full font-medium">
            👃 {location.scent}
          </span>
        )}
      </div>

      {/* Confirmation count */}
      <p className="text-sm text-gray-500 mb-4">
        Confirmed by {location.confirmations} people
      </p>

      {/* Confirm button */}
      <button
        onClick={handleConfirm}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg"
        style={{ minHeight: '48px' }}
      >
        Confirm Still True
      </button>
    </div>
  );
}