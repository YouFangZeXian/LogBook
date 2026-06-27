import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
const wechatId = process.env.NEXT_PUBLIC_WECHAT_ID;

let browserClient: SupabaseClient | null = null;

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

function maskValue(value?: string) {
  if (!value) return "";
  if (value.startsWith("http")) return value.replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (value.length <= 12) return "已配置";
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

export function getSupabaseConfigStatus() {
  const envVars = [
    {
      key: "NEXT_PUBLIC_SUPABASE_URL",
      label: "Supabase 项目地址",
      configured: Boolean(supabaseUrl),
      value: maskValue(supabaseUrl),
      required: true,
    },
    {
      key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      label: "Supabase 匿名公钥",
      configured: Boolean(supabaseAnonKey),
      value: maskValue(supabaseAnonKey),
      required: true,
    },
    {
      key: "NEXT_PUBLIC_SITE_URL",
      label: "站点 canonical 地址",
      configured: Boolean(siteUrl),
      value: maskValue(siteUrl),
      required: false,
    },
    {
      key: "NEXT_PUBLIC_CONTACT_EMAIL",
      label: "联系邮箱",
      configured: Boolean(contactEmail),
      value: contactEmail ?? "",
      required: false,
    },
    {
      key: "NEXT_PUBLIC_WECHAT_ID",
      label: "微信承接 ID",
      configured: Boolean(wechatId),
      value: wechatId ?? "",
      required: false,
    },
  ];

  return {
    configured: isSupabaseConfigured(),
    missingRequired: envVars.filter((item) => item.required && !item.configured).map((item) => item.key),
    envVars,
  };
}

export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) return null;

  if (!browserClient) {
    browserClient = createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return browserClient;
}
