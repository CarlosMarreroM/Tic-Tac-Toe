// services/api.ts
const API_URL = "http://192.168.1.49:5000";

export async function registerDevice(alias?: string) {
  const res = await fetch(`${API_URL}/devices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ alias }),
  });
  return await res.json();
}

export async function createOrJoinMatch(device_id: string, size = 3) {
  const res = await fetch(`${API_URL}/matches`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ device_id, size }),
  });
  return { status: res.status, data: await res.json() };
}

export async function getWaitingStatus(device_id: string) {
  const res = await fetch(`${API_URL}/matches/waiting-status?device_id=${device_id}`);
  return await res.json();
}

export async function getMatchState(match_id: string) {
  const res = await fetch(`${API_URL}/matches/${match_id}`);
  return await res.json();
}

export async function makeMove(match_id: string, device_id: string, x: number, y: number) {
  const res = await fetch(`${API_URL}/matches/${match_id}/moves`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ device_id, x, y }),
  });
  return await res.json();
}
