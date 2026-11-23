import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

export const getToken = async () => {
  const reqHeaders = await headers();
  try {
    const tokenRes = await auth.api.getToken({ headers: reqHeaders });
    if (tokenRes?.token) {
      return tokenRes.token;
    }
  } catch {
  }
  const session = await getSession();
  if (!session || !session.session?.token) {
    redirect("/login");
  }
  return session.session.token;
};

export const authFetch = async (api: string) => {
  const token = await getToken();
  const res = await fetch(api, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  return res;
};

export const protectedMutation = async (
  api: string,
  method: string,
  data?: unknown
) => {
  const token = await getToken();
  const res = await fetch(api, {
    method,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  return res;
};

export const requireAuth = async (redirectTo = "/") => {
  const session = await getSession();
  if (!session?.user) {
    redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }
  return session;
};

export const requireRole = async (role: "customer" | "owner" | "admin") => {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  if (session.user.role !== role) {
    redirect("/unauthorized");
  }
  return session;
};
