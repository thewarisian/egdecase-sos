import { useEffect, useState } from 'react'
import ReportForm from '../components/ReportForm'
import { getAllLocations, submitReport } from '../lib/queries'

export default function Report() {
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [sound, setSound] = useState('')
  const [light, setLight] = useState('')
  const [crowd, setCrowd] = useState('')
  const [scent, setScent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    getAllLocations().then((data) => setLocations(data))
  }, [])

  async function handleSubmit() {
    if (!selectedLocation) return

    setSubmitting(true)
    const { success } = await submitReport({
      location_id: selectedLocation,
      sound_level: sound,
      light_type: light,
      crowd_level: crowd,
      scent,
    })
    setSubmitting(false)

    if (success) {
      setSubmitted(true)
      setSelectedLocation('')
      setSound('')
      setLight('')
      setCrowd('')
      setScent('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <ReportForm
      locations={locations}
      selectedLocation={selectedLocation}
      onLocationChange={setSelectedLocation}
      sound={sound}
      onSoundChange={setSound}
      light={light}
      onLightChange={setLight}
      crowd={crowd}
      onCrowdChange={setCrowd}
      scent={scent}
      onScentChange={setScent}
      onSubmit={handleSubmit}
      isSubmitting={submitting}
      submitted={submitted}
    />
  )
}
