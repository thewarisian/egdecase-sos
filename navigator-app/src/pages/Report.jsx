import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { submitReport } from '../lib/queries';
import ReportForm from '../components/ReportForm';

export default function Report() {
  // Form state — all start empty
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sound, setSound] = useState('');
  const [light, setLight] = useState('');
  const [crowd, setCrowd] = useState('');
  const [scent, setScent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch all locations for the dropdown
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    async function loadLocations() {
      const { data } = await supabase.from('locations').select('*');
      setLocations(data || []);
    }
    loadLocations();
  }, []);

  // Handle submit
  async function handleSubmit() {
    if (!selectedLocation || !sound || !light || !crowd || !scent) {
      setMessage('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitReport({
      location_id: selectedLocation,
      sound_level: sound,
      light_type: light,
      crowd_level: crowd,
      scent: scent
    });
    setIsSubmitting(false);

    if (result.success) {
      setMessage('Report submitted! Thank you.');
      // Reset all fields
      setSelectedLocation('');
      setSound('');
      setLight('');
      setCrowd('');
      setScent('');
    } else {
      setMessage('Something went wrong. Try again.');
    }
  }

  return (
    <div>
      {message && (
        <div className="bg-teal-100 text-teal-800 text-sm p-3 text-center">
          {message}
        </div>
      )}
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
        isSubmitting={isSubmitting}
      />
    </div>
  );
}