import { createClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-06-20';

// Check if we have a valid project ID configured (a-z, 0-9, and dashes, usually 8-10 alphanumeric characters)
const isConfigured = 
  projectId && 
  typeof projectId === 'string' &&
  projectId.trim() !== '' && 
  projectId !== 'YOUR_SANITY_PROJECT_ID' &&
  /^[a-zA-Z0-9-]+$/.test(projectId.trim());

export const sanityClient = createClient({
  // Use a fallback registry-compliant dummy ID (letters/numbers/dashes, no underscores) to prevent client boot errors
  projectId: isConfigured ? projectId.trim() : 'unconfigured-id',
  dataset,
  apiVersion,
  useCdn: true,
});

export const checkIfConfigured = () => isConfigured;

/**
 * Builds a simple Sanity image URL if an asset reference exists.
 * Otherwise returns a fallback placeholder or the provided fallback URL.
 */
export const urlForImage = (source) => {
  if (!source) return null;
  
  // If source is already a string url, return it directly
  if (typeof source === 'string') return source;

  // Simple parser for Sanity image reference strings/objects
  const assetRef = source.asset?._ref || source._ref;
  if (!assetRef) return null;

  // Format: image-3f628...-1000x500-png
  const parts = assetRef.split('-');
  if (parts.length < 4) return null;

  const id = parts[1];
  const dimensions = parts[2];
  const format = parts[3];

  return `https://cdn.sanity.io/images/${projectId || 'unconfigured'}/${dataset}/${id}-${dimensions}.${format}`;
};
