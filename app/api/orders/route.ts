import { NextResponse } from "next/server";

import { createOrder, getDashboardSummary } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getDashboardSummary().orders);
}

export async function POST(request: Request) {
  const body = await request.json();
  const order = createOrder({
    customer: {
      fullName: body.customer.fullName,
      phone: body.customer.phone,
      email: body.customer.email,
      address: body.customer.address,
      company: body.customer.company,
    },
    items: body.items ?? [],
  });

  return NextResponse.json(order, { status: 201 });
}
