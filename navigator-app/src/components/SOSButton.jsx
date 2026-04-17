import { useState } from "react"
import SOSPanel from "./SOSPanel"

function SOSButton() {
    //Click Behaviour
    const [calmScreen, setCalm] = useState(false)

    const makeScreenCalm = () => {
        setCalm(true)
    }

    return (
        <>
        {/* Show Panel when clicked */}
        <SOSPanel isCalm={calmScreen} setCalm={setCalm}></SOSPanel>

        {/* SOS Button Structure */}
        <button
        onClick={makeScreenCalm}
        className="fixed bottom-0 left-0 w-full 
                    h-16 bg-red-700 text-xl
                    text-white font-bold text-base rounded-none
                    transition-all duration-100 ease-in-out
                    hover:scale-110 hover:shadow-2xl hover:bg-red-600">
            I NEED CALM NOW
        </button>
        </>
    )
}

export default SOSButton