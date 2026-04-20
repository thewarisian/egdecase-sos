import { supabase } from './supabase'

export async function getLocations(filters = {}) {
  let query = supabase
    .from('reports')
    .select('*, locations(*)')
    .order('created_at', { ascending: false })

  if (filters.sound) query = query.eq('sound_level', filters.sound)
  if (filters.light) query = query.eq('light_type', filters.light)
  if (filters.crowd) query = query.eq('crowd_level', filters.crowd)

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getCalmLocations() {
  const { data, error } = await supabase
    .from('reports')
    .select('*, locations(*)')
    .eq('crowd_level', 'empty')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) throw error
  return data ?? []
}

export async function getAllLocations() {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('getAllLocations error:', error)
    return []
  }
  return data
}

export async function submitReport(data) {
  const { error } = await supabase.from('reports').insert([data])

  if (error) {
    console.error('submitReport error:', error)
    return { success: false }
  }

  return { success: true }
}

export async function confirmReport(reportId) {
  const { data: current, error: fetchErr } = await supabase
    .from('reports')
    .select('confirmations')
    .eq('id', reportId)
    .single()

  if (fetchErr) {
    console.error('confirmReport fetch error:', fetchErr)
    return { success: false }
  }

  const { error: updateErr } = await supabase
    .from('reports')
    .update({ confirmations: (current?.confirmations ?? 0) + 1 })
    .eq('id', reportId)

  if (updateErr) {
    console.error('confirmReport update error:', updateErr)
    return { success: false }
  }

  return { success: true }
}

export function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
