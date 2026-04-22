import CalmCard from "./CalmCard.jsx"
import { Circle } from "lucide-react"

function Dashboard() {
    return (
        <div className= "w-full min-h-screen pt-25 pb-25 bg-gradient-to-b from-teal-50 via-white to-cyan-50">
            <p className="text-4xl md:text-5xl font-extrabold text-teal-700 text-center 
                tracking-tight drop-shadow-lg
                flex items-center justify-center gap-5">
             <div className="flex justify-center mb-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200">
                    <Circle size={30} fill="currentColor" className="text-red-500 animate-pulse" />
                </div>
            </div>
            Live Top 5 Calmest Spots to Go To
            </p>
            <p className="text-zinc-500 text-center pb-3 text-lg">
                Real-time safe spaces based on recent community reports
            </p>

            {/*. STUB Top 3 location Calm Cards */}
            <CalmCard 
                name={"Ayaan's House"}
                tag={"Dangerous"}
                userLat={0}
                userLng={0}
                locLat={6}
                locLng={7}
            />

            <CalmCard 
                name={"Sarthak's House"}
                tag={"Safe"}
                userLat={0}
                userLng={0}
                locLat={4}
                locLng={20}
            />

            <CalmCard 
                name={"Ankit and Syed's Nest"}
                tag={"Atmospheric"}
                userLat={0}
                userLng={0}
                locLat={100}
                locLng={67}
            />

            <CalmCard 
                name={"SPIT"}
                tag={"Torturous"}
                userLat={0}
                userLng={0}
                locLat={1300}
                locLng={135}
            />

            <CalmCard 
                name={"My Girlfriend's house"}
                tag={"Imaginary"}
                userLat={0}
                userLng={0}
                locLat={6}
                locLng={9}
            />
        
        </div>
    )
}

export default Dashboard