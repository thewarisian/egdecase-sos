//import { getDistanceKm } from "../lib/queries.js"

function CalmCard({name, tag, userLat, userLng, locLat, locLng}) {
  return (
    <div className="m-3 w-full max-w-sm
            w-full max-w-sm mx-auto
            bg-white/70
            backdrop-blur-md
            border border-zinc-300
            rounded-2xl
            shadow-md
            p-5">

      <p className="text-xl font-bold text-blue-900 m-2">
        {name}
      </p>

      <p className="text-xl text-gray-500 m-2">
        {/* STUB */}
        {/* getDistanceKm(userLat, userLng, locLat, locLng) */ 0} km away
      </p>

      <p className="text-sm text-gray-500 m-2">
        {/* STUB */}
        Last reported {/* getDistanceKm(userLat, userLng, locLat, locLng) */ 0} min ago
      </p>

      <span className="bg-teal-100 px-3 py-1 rounded-full mt-2
                       text-teal-800 text-xs font-medium">
        {tag}
      </span>

      <button className="bg-teal-600 rounded
                         text-white font-semibold w-full 
                         py-3 mt-3
                         transition-all duration-150
                         hover:bg-teal-500 hover:shadow-lg hover:scale-[1.02]">
        Take Me There
      </button>
    </div>
  )
}

export default CalmCard