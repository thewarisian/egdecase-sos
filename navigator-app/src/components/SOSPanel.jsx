function SOSPanel({flash}) {
    if (!flash) return null

    return (
        <div className="fixed inset-0 bg-white z-50 animate-quickFlash"></div>
    )
}

export default SOSPanel