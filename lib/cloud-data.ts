"use client";

import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase";

export const AUTH_KEY = "logbook.auth.user";
export const ROUTE_PROGRESS_KEY = "logbook.routes.progress";
export const VOYAGE_PROGRESS_KEY = "logbook.voyage.progress";
export const SELECTION_KEY = "logbook.voyage.selection";
export const SUBMISSIONS_KEY = "logbook.submissions";

export type LogbookUser = {
  id?: string;
  email: string;
  name: string;
  joinedAt: string;
  role?: "member" | "editor" | "admin";
};

export type ContributionRecord = {
  id: string;
  type: string;
  content: string;
  contact?: string;
  articleTitle?: string;
  articleSlug?: string;
  status?: string;
  reviewerNote?: string;
  createdAt: string;
};

export type VoyageSelection = {
  devices: string[];
  androidBrand?: string;
  status: string;
  updatedAt?: string;
};

type AuthMode = "login" | "register";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function broadcastAuthChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("logbook-auth-changed"));
}

export function getLocalLogbookUser() {
  return readJson<LogbookUser | null>(AUTH_KEY, null);
}

export async function syncCurrentUserFromCloud() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return getLocalLogbookUser();

  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user?.email) {
    return getLocalLogbookUser();
  }

  const profile = await ensureProfile({
    id: user.id,
    email: user.email,
    name:
      (user.user_metadata?.name as string | undefined) ??
      (user.user_metadata?.full_name as string | undefined) ??
      user.email.split("@")[0],
  });

  const current: LogbookUser = {
    id: user.id,
    email: user.email,
    name: profile?.name ?? user.email.split("@")[0],
    role: profile?.role ?? "member",
    joinedAt: user.created_at ?? new Date().toISOString(),
  };

  writeJson(AUTH_KEY, current);
  broadcastAuthChanged();
  return current;
}

export async function signInOrRegister(input: {
  mode: AuthMode;
  email: string;
  password: string;
  name?: string;
}) {
  const normalizedEmail = input.email.trim();
  const password = input.password.trim();

  if (!normalizedEmail) {
    throw new Error("请输入邮箱。");
  }

  if (!password || password.length < 6) {
    throw new Error("密码至少 6 位。");
  }

  const fallbackUser: LogbookUser = {
    email: normalizedEmail,
    name: input.name?.trim() || normalizedEmail.split("@")[0] || "logbook-crew",
    joinedAt: new Date().toISOString(),
    role: "member",
  };

  if (!isSupabaseConfigured()) {
    writeJson(AUTH_KEY, fallbackUser);
    broadcastAuthChanged();
    return fallbackUser;
  }

  const supabase = getSupabaseBrowserClient();
  if (!supabase) return fallbackUser;

  const result =
    input.mode === "register"
      ? await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: { name: fallbackUser.name },
          },
        })
      : await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

  if (result.error) {
    throw new Error(result.error.message);
  }

  const user = result.data.user;
  if (!user?.email) {
    writeJson(AUTH_KEY, fallbackUser);
    broadcastAuthChanged();
    return fallbackUser;
  }

  await ensureProfile({
    id: user.id,
    email: user.email,
    name: fallbackUser.name,
  });

  return (await syncCurrentUserFromCloud()) ?? fallbackUser;
}

export async function signInWithProvider(provider: "github" | "google") {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    throw new Error("请先配置 Supabase 环境变量，再启用第三方登录。");
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
    },
  });

  if (error) throw new Error(error.message);
}

export async function signOutLogbookUser() {
  const supabase = getSupabaseBrowserClient();
  if (supabase) {
    await supabase.auth.signOut();
  }

  window.localStorage.removeItem(AUTH_KEY);
  broadcastAuthChanged();
}

async function ensureProfile(input: { id: string; email: string; name: string }) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  await supabase.from("profiles").upsert(
    {
      id: input.id,
      email: input.email,
      name: input.name,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  const { data } = await supabase
    .from("profiles")
    .select("name, role")
    .eq("id", input.id)
    .single();

  return data as { name: string; role: LogbookUser["role"] } | null;
}

export async function updateCloudProfile(input: { name?: string; language?: string }) {
  const user = await syncCurrentUserFromCloud();
  const supabase = getSupabaseBrowserClient();
  if (!user?.id || !supabase) return false;

  const patch: Record<string, string> = { updated_at: new Date().toISOString() };
  if (input.name) patch.name = input.name;
  if (input.language) patch.language = input.language;

  const { error } = await supabase.from("profiles").update(patch).eq("id", user.id);
  if (error) throw new Error(error.message);

  await syncCurrentUserFromCloud();
  return true;
}

export async function saveVoyageSelection(selection: VoyageSelection) {
  writeJson(SELECTION_KEY, selection);

  const user = await syncCurrentUserFromCloud();
  const supabase = getSupabaseBrowserClient();
  if (!user?.id || !supabase) return;

  await supabase.from("route_selections").upsert(
    {
      user_id: user.id,
      selection,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
}

export async function loadVoyageSelection() {
  const local = readJson<VoyageSelection>(SELECTION_KEY, {
    devices: ["windows", "iphone"],
    status: "new",
  });

  const user = await syncCurrentUserFromCloud();
  const supabase = getSupabaseBrowserClient();
  if (!user?.id || !supabase) return local;

  const { data } = await supabase
    .from("route_selections")
    .select("selection")
    .eq("user_id", user.id)
    .maybeSingle();

  return (data?.selection as VoyageSelection | undefined) ?? local;
}

export async function loadProgress(source: "voyage" | "routes") {
  const key = source === "voyage" ? VOYAGE_PROGRESS_KEY : ROUTE_PROGRESS_KEY;
  const local = readJson<string[]>(key, []);

  const user = await syncCurrentUserFromCloud();
  const supabase = getSupabaseBrowserClient();
  if (!user?.id || !supabase) return local;

  const { data } = await supabase
    .from("voyage_progress")
    .select("progress_key")
    .eq("user_id", user.id)
    .eq("source", source);

  const cloud = data?.map((item) => item.progress_key) ?? [];
  if (cloud.length) writeJson(key, cloud);
  return cloud.length ? cloud : local;
}

export async function saveProgress(source: "voyage" | "routes", progress: string[]) {
  const key = source === "voyage" ? VOYAGE_PROGRESS_KEY : ROUTE_PROGRESS_KEY;
  writeJson(key, progress);

  const user = await syncCurrentUserFromCloud();
  const supabase = getSupabaseBrowserClient();
  if (!user?.id || !supabase) return;

  await supabase.from("voyage_progress").delete().eq("user_id", user.id).eq("source", source);

  if (!progress.length) return;

  await supabase.from("voyage_progress").insert(
    progress.map((progressKey) => ({
      user_id: user.id,
      source,
      progress_key: progressKey,
    })),
  );
}

export async function createSubmission(input: Omit<ContributionRecord, "id" | "status" | "createdAt">) {
  const local = readJson<ContributionRecord[]>(SUBMISSIONS_KEY, []);
  const record: ContributionRecord = {
    ...input,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  writeJson(SUBMISSIONS_KEY, [record, ...local]);

  const user = await syncCurrentUserFromCloud();
  const supabase = getSupabaseBrowserClient();
  if (!user?.id || !supabase) return record;

  const { data, error } = await supabase
    .from("submissions")
    .insert({
      user_id: user.id,
      type: input.type,
      content: input.content,
      contact: input.contact,
      article_title: input.articleTitle,
      article_slug: input.articleSlug,
      status: "pending",
    })
    .select("id, status, created_at")
    .single();

  if (error) throw new Error(error.message);

  return {
    ...record,
    id: data.id,
    status: data.status,
    createdAt: data.created_at,
  };
}

export async function listMySubmissions() {
  const local = readJson<ContributionRecord[]>(SUBMISSIONS_KEY, []);
  const user = await syncCurrentUserFromCloud();
  const supabase = getSupabaseBrowserClient();
  if (!user?.id || !supabase) return local;

  const { data } = await supabase
    .from("submissions")
    .select("id, type, content, contact, article_title, article_slug, status, reviewer_note, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const records =
    data?.map((item) => ({
      id: item.id,
      type: item.type,
      content: item.content,
      contact: item.contact ?? "",
      articleTitle: item.article_title ?? "",
      articleSlug: item.article_slug ?? "",
      status: item.status,
      reviewerNote: item.reviewer_note ?? "",
      createdAt: item.created_at,
    })) ?? local;

  writeJson(SUBMISSIONS_KEY, records);
  return records;
}

export async function listReviewSubmissions() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("submissions")
    .select("id, type, content, contact, article_title, article_slug, status, reviewer_note, created_at, profiles(email, name)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function updateSubmissionReview(input: {
  id: string;
  status: "pending" | "accepted" | "rejected" | "published";
  reviewerNote?: string;
}) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase 未配置。");

  const { error } = await supabase
    .from("submissions")
    .update({
      status: input.status,
      reviewer_note: input.reviewerNote ?? "",
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.id);

  if (error) throw new Error(error.message);
}

export async function listAdminSubmissionsSummary() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("submissions")
    .select("id, status, type, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function listNewsletterSignups(limit = 40) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return readJson<Array<{ email: string; channel: string; source: string; createdAt: string }>>(
      "logbook.newsletter.signups",
      [],
    ).slice(0, limit);
  }

  const { data, error } = await supabase
    .from("newsletter_signups")
    .select("id, email, channel, source, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function listConversionEvents(limit = 80) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return readJson<
      Array<{
        eventType: string;
        target: string;
        metadata?: Record<string, unknown>;
        createdAt: string;
      }>
    >("logbook.conversion.events", []).slice(0, limit);
  }

  const { data, error } = await supabase
    .from("conversion_events")
    .select("id, event_type, target, metadata, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function trackConversionEvent(input: {
  eventType: string;
  target: string;
  metadata?: Record<string, unknown>;
}) {
  const user = await syncCurrentUserFromCloud();
  const supabase = getSupabaseBrowserClient();

  const event = {
    eventType: input.eventType,
    target: input.target,
    metadata: input.metadata ?? {},
    createdAt: new Date().toISOString(),
  };

  const local = readJson<typeof event[]>("logbook.conversion.events", []);
  writeJson("logbook.conversion.events", [event, ...local].slice(0, 200));

  if (!supabase) return;

  await supabase.from("conversion_events").insert({
    user_id: user?.id ?? null,
    event_type: input.eventType,
    target: input.target,
    metadata: input.metadata ?? {},
  });
}

export async function saveNewsletterSignup(input: { email: string; channel: string; source: string }) {
  const email = input.email.trim();
  if (!email) throw new Error("请输入邮箱。");

  const local = readJson<Array<typeof input & { createdAt: string }>>("logbook.newsletter.signups", []);
  writeJson("logbook.newsletter.signups", [
    { ...input, email, createdAt: new Date().toISOString() },
    ...local,
  ]);

  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;

  const { error } = await supabase.from("newsletter_signups").insert({
    email,
    channel: input.channel,
    source: input.source,
  });

  if (error) throw new Error(error.message);
}
