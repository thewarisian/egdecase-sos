function CalmCard() {
  return (
    <div className="m-6 w-full max-w-sm
            w-full max-w-sm mx-auto
            bg-white/70
            backdrop-blur-md
            border border-zinc-300
            rounded-2xl
            shadow-md
            p-5">

      <p className="text-xl font-bold text-blue-900 m-2">
        Name
      </p>

      <p className="text-xl text-gray-500 m-2">
        x km away
      </p>

      <span className="bg-teal-100 px-3 py-1 rounded-full m-1
                       text-teal-800 text-xs font-medium">
        Safe
      </span>

      <button className="bg-teal-600 rounded
                         text-white font-semibold w-full 
                         py-3 mt-3">
        Take Me There
      </button>
    </div>
  )
}

export default CalmCard