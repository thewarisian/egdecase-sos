// src/lib/queries.js
// Created by Person C. Person D adds submitReport, confirmReport, getAllLocations below.
import { supabase } from './supabase';

// ── PERSON C — F1: Map pins with optional filter chaining ────────────
// This is the trickiest query: a joined select with conditional .eq() chaining.
// A null filter must be skipped — passing .eq('field', null) returns nothing.
export async function getLocations(filters = {}) {
  let query = supabase
    .from('reports')
    .select('*, locations(*)')   // joined select: reports + their location row
    .order('created_at', { ascending: false });

  // Only add .eq() if the filter has an actual value — null means 'show all'
  if (filters.sound)  query = query.eq('sound_level', filters.sound);
  if (filters.light)  query = query.eq('light_type',  filters.light);
  if (filters.crowd)  query = query.eq('crowd_level', filters.crowd);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

// ── PERSON C — F3 + F4: Calm locations for SOS + Dashboard ──────────
// Returns max 20 most recent reports where crowd=empty, joined with location.
// Used by Person D's Haversine sorter (F3) and realtime subscription (F4).
export async function getCalmLocations() {
  const { data, error } = await supabase
    .from('reports')
    .select('*, locations(*)')
    .eq('crowd_level', 'empty')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) throw error;
  return data ?? [];
}



// ─────────────────────────────────────────────────────────────────────────────
// PERSON C ADDITIONS — paste below getCalmLocations(). Do not edit anything above.
// ─────────────────────────────────────────────────────────────────────────────

// getAllLocations() — returns all locations for the Report Form dropdown
export async function getAllLocations() {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('getAllLocations error:', error);
    return [];
  }
  return data;
}

// getDistanceKm() — Haversine formula: straight-line GPS distance in kilometres
export function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}