import { NextResponse } from "next/server";

// PRD Section 20:1530-1539 Validation Rules
function validate(body: any) {
  if (!body.name?.trim() || body.name.length < 2) return "Name required (min 2 chars)";
  const cleaned = (body.phone || "").replace(/[\s\-\+]/g, "").replace(/^91/, "");
  if (!/^[6-9]\d{9}$/.test(cleaned)) return "Invalid Indian phone (10 digits, 6-9 start)";
  if (!body.brand?.trim()) return "Vehicle brand required";
  if (!body.service) return "Service required";
  if (!body.date) return "Preferred date required";
  const sel = new Date(body.date);
  const today = new Date(); today.setHours(0,0,0,0);
  if (sel < today) return "Date cannot be past";
  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const err = validate(body);
    if (err) return NextResponse.json({ error: err }, { status: 400 });

    // Backend-ready: choose one via env (PRD Section 33:2232)
    // Option A: Formspree - FORMSPREE_FORM_ID
    // Option B: SendGrid - SENDGRID_API_KEY + BOOKING_NOTIFY_EMAIL
    // Option C: Supabase - SUPABASE_URL + SUPABASE_ANON_KEY
    // Never expose private keys in frontend (Section 37)

    const formspreeId = process.env.FORMSPREE_FORM_ID;
    const sendgridKey = process.env.SENDGRID_API_KEY;

    // Demo: log and return success (no external call if not configured)
    console.log("Booking received:", {
      name: body.name,
      phone: body.phone,
      brand: body.brand,
      model: body.model,
      service: body.service,
      date: body.date,
      time: body.time,
      message: body.message?.slice(0,120),
    });

    if (formspreeId) {
      // Example Formspree forward (uncomment when configured)
      // await fetch(`https://formspree.io/f/${formspreeId}`, { method: "POST", headers:{ "Content-Type":"application/json"}, body: JSON.stringify(body)});
    }
    if (sendgridKey) {
      // Example SendGrid (uncomment when configured)
    }

    return NextResponse.json({ ok: true, message: "Request received - we will call you to confirm." });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "Booking API ready - POST JSON with name, phone, brand, service, date per PRD Section 20" });
}
