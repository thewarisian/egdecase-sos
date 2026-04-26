// import { useEffect, useState } from "react"
import { X } from "lucide-react"

import CalmCard from "./CalmCard.jsx"

/* user location STUB */
const userLat = 0
const userLng = 0

function SOSPanel({isCalm, setCalm}) {
    // Store the top 3 calm locations
    // const [calmLocs, setCalmLocs] = useState([])

    if (!isCalm) return null

    // useEffect(() => {
    //         async function loadTopThreePlaces() {
    //             const places = await getCalmLocations()
    //             setCalmLocs(places.slice(0, 3))
    //         }

    //         loadTopThreePlaces()
    //     }, [isCalm]
    // )

    return (
        <>
            {/* White Screen */}
            <div className="fixed inset-0 bg-white z-60
                            flex flex-col p-6">

                {/* X button */}
                <button
                onClick={() => setCalm(false)}
                className="absolute top-4 right-4
                           flex items-center justify-center
                           w-[44px] h-[44px] rounded-full hover:bg-gray-200
                           hover:scale-110 
                           transition-all duration-150">
                    <X size={20}
                     strokeWidth={3}
                     className="text-zinc-700"></X>
                </button>
                
                {/*. STUB Top 3 location Calm Cards */}
                <CalmCard 
                    name={"Ayaan's House"}
                    tag={"Dangerous"}
                    userLat={userLat}
                    userLng={userLng}
                    locLat={"6"}
                    locLng={"7"}
                />

                <CalmCard 
                    name={"Sarthak's House"}
                    tag={"Safe"}
                    userLat={userLat}
                    userLng={userLng}
                    locLat={"4"}
                    locLng={"20"}
                />

                <CalmCard 
                    name={"Ankit and Syed's Nest"}
                    tag={"Atmospheric"}
                    userLat={userLat}
                    userLng={userLng}
                    locLat={"100"}
                    locLng={"67"}
                />
            </div>
        </>
    )
}

export default SOSPanel