import { NextResponse } from "next/server";

import { createAdminSession, validateAdminLogin } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const isValid = await validateAdminLogin(String(body.email ?? ""), String(body.password ?? ""));

  if (!isValid) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
