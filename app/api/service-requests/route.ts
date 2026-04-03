import { NextResponse } from "next/server";

import { createServiceRequest, getDashboardSummary } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getDashboardSummary().serviceRequests);
}

export async function POST(request: Request) {
  const body = await request.json();
  const record = createServiceRequest({
    city: body.city,
    district: body.district,
    propertyType: body.propertyType,
    squareMeters: Number(body.squareMeters),
    floorCount: Number(body.floorCount),
    apartmentCount: Number(body.apartmentCount),
    jobType: body.jobType,
    fullName: body.fullName,
    phone: body.phone,
    email: body.email,
    notes: body.notes ?? "",
  });

  return NextResponse.json(record, { status: 201 });
}
