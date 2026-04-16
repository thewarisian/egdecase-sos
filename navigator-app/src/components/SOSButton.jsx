import { useState } from "react"
import SOSPanel from "./SOSPanel"

function SOSButton() {
    const [flash, setFlash] = useState(false)

    const flashPanel = () => {
        setFlash(true)

        setTimeout(
            () => {
                setFlash(false)
            }, 500
        )
    }

    return (
        <>
        {/* Show Panel when clicked */}
        <SOSPanel flash={flash}></SOSPanel>
        
        {/* SOS Button Structure */}
        <button
        onClick={flashPanel}
        className="fixed bottom-0 left-0 w-full 
                    h-16 bg-red-700 text-xl
                    text-white font-bold text-base rounded-none">
            I NEED CALM NOW
        </button>
        </>
    )
}

export default SOSButton