const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_KEY || "";
const PROGRESS_TABLE = import.meta.env.VITE_SUPABASE_PROGRESS_TABLE || "eb_progress";

function isConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function headers() {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

async function request(path, options = {}) {
  if (!isConfigured()) return null;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      ...headers(),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(errorText || `Supabase request failed with ${response.status}`);
  }

  if (response.status === 204) return [];
  return response.json();
}

export async function loadProgressRows(userId) {
  if (!isConfigured() || !userId) return null;

  const params = new URLSearchParams({
    select: "*",
    user_id: `eq.${userId}`,
    order: "updated_at.asc",
  });

  return request(`${PROGRESS_TABLE}?${params.toString()}`);
}

export async function upsertProgressRows(rows) {
  if (!isConfigured() || !Array.isArray(rows) || !rows.length) return null;

  const params = new URLSearchParams({
    on_conflict: "user_id,lesson_id",
  });

  return request(`${PROGRESS_TABLE}?${params.toString()}`, {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(rows),
  });
}

export function isSupabaseConfigured() {
  return isConfigured();
}
