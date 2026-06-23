const MAX_FIELD_LENGTH = 1200;

function clean(value) {
  if (typeof value === "string") {
    return value.trim().slice(0, MAX_FIELD_LENGTH);
  }

  if (Array.isArray(value)) {
    return value.slice(0, 20).map(clean);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .slice(0, 40)
        .map(([key, item]) => [key, clean(item)]),
    );
  }

  return value;
}

export default function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method !== "POST") {
    response.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const payload = clean(request.body || {});
  const type = payload.type || "message";
  const email = payload.email || payload.contactEmail;

  if (["newsletter", "concierge"].includes(type) && !email) {
    response.status(400).json({ ok: false, error: "Email is required" });
    return;
  }

  const message = {
    ...payload,
    type,
    id: `bl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    receivedAt: new Date().toISOString(),
  };

  console.log("BLAQUE_LOTUS_MESSAGE", JSON.stringify(message));
  response.status(200).json({ ok: true, message });
}
