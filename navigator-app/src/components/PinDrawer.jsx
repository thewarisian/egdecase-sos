import { confirmReport } from '../lib/queries'

function TagChip({ value, colorClass }) {
  if (!value) return null

  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full ${colorClass}`}>
      {value}
    </span>
  )
}

export default function PinDrawer({ location, onClose }) {
  if (!location) return null

  const reportedAt = location.created_at
    ? new Date(location.created_at).toLocaleString()
    : 'Unknown time'

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-30" onClick={onClose}>
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 shadow-2xl max-h-[70vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-3 text-gray-400 hover:text-gray-700 min-h-[44px] min-w-[44px]"
        >
          x
        </button>

        <h2 className="text-xl font-bold text-blue-900 pr-10">{location.locations?.name}</h2>
        <p className="text-sm text-gray-400 mt-1 mb-4">
          {location.locations?.category} {reportedAt}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          <TagChip value={location.sound_level} colorClass="bg-teal-100 text-teal-800" />
          <TagChip value={location.light_type} colorClass="bg-blue-100 text-blue-800" />
          <TagChip value={location.crowd_level} colorClass="bg-green-100 text-green-800" />
          <TagChip value={location.scent} colorClass="bg-purple-100 text-purple-800" />
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {location.confirmations ?? 0} people confirmed this is still accurate
        </p>

        <button
          onClick={() => confirmReport(location.id)}
          className="w-full py-3 border-2 border-blue-900 text-blue-900 font-semibold rounded-xl hover:bg-blue-50 min-h-[48px] text-sm"
        >
          Confirm still true
        </button>
      </div>
    </div>
  )
}
