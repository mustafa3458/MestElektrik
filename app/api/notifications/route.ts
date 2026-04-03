import { NextResponse } from "next/server";

import { getDashboardSummary } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getDashboardSummary().notifications);
}
