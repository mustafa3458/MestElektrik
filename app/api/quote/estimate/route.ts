import { NextResponse } from "next/server";

import { estimateQuote } from "@/lib/quote";

export async function POST(request: Request) {
  const body = await request.json();
  const estimate = estimateQuote({
    city: body.city,
    district: body.district,
    propertyType: body.propertyType,
    squareMeters: Number(body.squareMeters),
    floorCount: Number(body.floorCount),
    apartmentCount: Number(body.apartmentCount),
    jobType: body.jobType,
  });

  return NextResponse.json(estimate);
}
