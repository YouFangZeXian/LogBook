"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GithubLogo, GoogleLogo } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

/* ── Auth helpers (mirrors auth-dialog.tsx) ── */

type AuthUser = {
  email: string;
  name: string;
  joinedAt: string;
};

const AUTH_KEY = "logbook.auth.user";

function saveAndBroadcast(user: AuthUser) {
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("logbook-auth-changed"));
}

/* ── Component ── */

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim() || "crew@logbook.today";
    const user: AuthUser = {
      email: normalizedEmail,
      name: normalizedEmail.split("@")[0] || "logbook-crew",
      joinedAt: new Date().toISOString(),
    };
    saveAndBroadcast(user);
    router.push("/");
  };

  const skip = () => router.push("/");

  return (
    <div className={cn("flex w-full max-w-sm flex-col gap-6", className)} {...props}>
      <Card className="border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white">
            {mode === "login" ? "欢迎回来，船员。" : "创建你的船员档案"}
          </CardTitle>
          <CardDescription className="text-white/60">
            {mode === "login"
              ? "登录后继续你的航线，查看投稿记录与收藏。"
              : "注册不是为了阻拦出海，而是让你的航线被记住。"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <FieldGroup>
              {/* ── Mode toggle ── */}
              <Field>
                <div className="grid grid-cols-2 gap-1 rounded-[14px] border border-white/15 bg-white/5 p-1">
                  {(["login", "register"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setMode(item)}
                      className={cn(
                        "rounded-[10px] py-2 text-sm font-medium transition-all",
                        mode === item
                          ? "bg-white text-black shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
                          : "text-white/60 hover:text-white"
                      )}
                    >
                      {item === "login" ? "登录" : "注册"}
                    </button>
                  ))}
                </div>
              </Field>

              {/* ── Social login ── */}
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={submit}
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <GithubLogo size={16} weight="fill" />
                  GitHub 预留
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={submit}
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <GoogleLogo size={16} weight="bold" />
                  Google 预留
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-transparent *:data-[slot=field-separator-content]:text-white/40">
                或
              </FieldSeparator>

              {/* ── Email ── */}
              <Field>
                <FieldLabel htmlFor="email" className="text-white/80">
                  邮箱
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="crew@example.com"
                  className="border-white/15 bg-white/5 text-white placeholder:text-white/30 focus:border-white/40"
                />
              </Field>

              {/* ── Password ── */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-white/80">
                    密码
                  </FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="本地演示，不会发送到服务器"
                  className="border-white/15 bg-white/5 text-white placeholder:text-white/30 focus:border-white/40"
                />
              </Field>

              {/* ── Submit ── */}
              <Field>
                <Button type="submit" className="w-full">
                  {mode === "login" ? "登录并继续" : "创建船员档案"}
                </Button>
                <FieldDescription className="text-center text-white/50">
                  {mode === "login" ? "还没有账号？" : "已有账号？"}
                  <button
                    type="button"
                    onClick={() =>
                      setMode(mode === "login" ? "register" : "login")
                    }
                    className="ml-1 text-white underline-offset-4 hover:underline"
                  >
                    {mode === "login" ? "注册" : "登录"}
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {/* ── Skip ── */}
      <button
        type="button"
        onClick={skip}
        className="w-full rounded-[14px] border border-white/10 bg-white/5 py-3 text-sm font-medium text-white/70 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
      >
        不注册，直接访问
      </button>

      {/* ── Footer ── */}
      <p className="px-6 text-center text-xs leading-6 text-white/30">
        注册不是为了阻拦出海，而是船舱想听见你的故事。
      </p>
    </div>
  );
}
