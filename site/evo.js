// Thin wrapper around the Evo SDK (loaded via <script src="https://app.evo.caylent.com/sdk/evo.js">
// in index.html). Evo resolves identity against the org's Active Directory on the backend; from
// here it's just window.evo.identity.userInfo(). Falls back cleanly when the SDK isn't present
// (e.g. opening index.html directly, outside an Evo session) instead of throwing.

let initPromise = null;

export function isEvoAvailable() {
  return typeof window !== "undefined" && !!window.evo;
}

function initSdk() {
  if (initPromise) return initPromise;
  if (!isEvoAvailable()) return Promise.reject(new Error("Evo SDK not loaded"));
  initPromise = window.evo.init().catch((err) => {
    initPromise = null;
    throw err;
  });
  return initPromise;
}

/** Resolves to an Evo user object ({ name, email, department, ... }), or null if unavailable. */
export async function getUser() {
  try {
    await initSdk();
    return (await window.evo.identity.userInfo()) || null;
  } catch (err) {
    console.warn("Evo identity unavailable, falling back to a generic greeting:", err);
    return null;
  }
}
