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
// PERSON D ADDITIONS 
// ─────────────────────────────────────────────────────────────────────────────

// submitReport(data) — inserts a new sensory report into the database
// Called by: Person A's Report.jsx — fires when the user clicks Submit
export async function submitReport(data) {
  const { error } = await supabase
    .from('reports')
    .insert([data]); // Supabase insert always takes an array — [data] not data

  if (error) {
    console.error('submitReport error:', error);
    return { success: false };
  }
  return { success: true };
}

// confirmReport(reportId) — increments the confirmations counter on one report by 1
// Called by: Person B's PinDrawer.jsx — 'Confirm Still True' button
export async function confirmReport(reportId) {

  // Step 1 — get the current confirmations value
  const { data, error: fetchError } = await supabase
    .from('reports')
    .select('confirmations')
    .eq('id', reportId)
    .single();

  if (fetchError) {
    console.error('confirmReport fetch error:', fetchError);
    return;
  }

  // Step 2 — write back with the value incremented by 1
  const { error: updateError } = await supabase
    .from('reports')
    .update({ confirmations: (data?.confirmations || 0) + 1 })
    .eq('id', reportId);

  if (updateError) {
    console.error('confirmReport update error:', updateError);
  }
}