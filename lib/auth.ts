import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { cookies } from "next/headers";

const adminEmail = (process.env.ADMIN_EMAIL ?? "").toLowerCase().trim();
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH ?? "";
const secret = process.env.NEXTAUTH_SECRET ?? "mest-local-secret";
const sessionCookieName = "mest_admin_session";

export const oauthProviders = {
  google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  apple: Boolean(process.env.APPLE_ID && process.env.APPLE_SECRET),
};

function getExpectedSessionToken() {
  return crypto.createHmac("sha256", secret).update(adminEmail).digest("hex");
}

export async function validateAdminLogin(email: string, password: string) {
  const normalizedEmail = email.toLowerCase().trim();
  if (!normalizedEmail || !password || !adminEmail || !adminPasswordHash) {
    return false;
  }

  const validPassword = await bcrypt.compare(password, adminPasswordHash);
  return normalizedEmail === adminEmail && validPassword;
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, getExpectedSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    expires: new Date(0),
  });
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(sessionCookieName)?.value === getExpectedSessionToken();
}

export function getAdminEmail() {
  return adminEmail;
}
