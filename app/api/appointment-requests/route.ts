import { NextResponse } from "next/server";

import { createAppointmentRequest, getDashboardSummary } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getDashboardSummary().appointmentRequests);
}

export async function POST(request: Request) {
  const body = await request.json();
  const record = createAppointmentRequest({
    fullName: body.fullName,
    phone: body.phone,
    email: body.email,
    city: body.city,
    district: body.district,
    requestedWindow: body.requestedWindow,
    serviceNeed: body.serviceNeed,
    notes: body.notes ?? "",
  });

  return NextResponse.json(record, { status: 201 });
}
