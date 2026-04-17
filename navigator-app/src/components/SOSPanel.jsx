import { X } from "lucide-react"
import CalmCard from "./CalmCard.jsx"

function SOSPanel({isCalm, setCalm}) {
    if (!isCalm) return null

    return (
        <>
            {/* White Screen */}
            <div className="fixed inset-0 bg-white z-60
                            flex-column p-6">

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

                {/* Top 3 location Calm Cards */}
                <CalmCard />
                <CalmCard />
                <CalmCard />
            </div>
        </>
    )
}

export default SOSPanel