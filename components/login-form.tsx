"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GithubLogo, GoogleLogo } from "@phosphor-icons/react/dist/ssr";

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
import { cn } from "@/lib/utils";
import { signInOrRegister, signInWithProvider } from "@/lib/cloud-data";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      await signInOrRegister({ mode, email, password });
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败，请稍后再试。");
    } finally {
      setPending(false);
    }
  };

  const providerLogin = async (provider: "github" | "google") => {
    setPending(true);
    setError("");
    try {
      await signInWithProvider(provider);
    } catch (err) {
      setError(err instanceof Error ? err.message : "第三方登录暂时不可用。");
      setPending(false);
    }
  };

  return (
    <div className={cn("flex w-full max-w-sm flex-col gap-6", className)} {...props}>
      <Card className="border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white">
            {mode === "login" ? "欢迎回来，船员。" : "创建你的船员档案"}
          </CardTitle>
          <CardDescription className="text-white/60">
            登录后继续你的航线，查看投稿记录与收藏。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <FieldGroup>
              <Field>
                <div className="grid grid-cols-2 gap-1 rounded-[10px] border border-white/15 bg-white/5 p-1">
                  {(["login", "register"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setMode(item)}
                      className={cn(
                        "rounded-[8px] py-2 text-sm font-medium transition-all",
                        mode === item
                          ? "bg-white text-black"
                          : "text-white/60 hover:text-white",
                      )}
                    >
                      {item === "login" ? "登录" : "注册"}
                    </button>
                  ))}
                </div>
              </Field>

              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => providerLogin("github")}
                  disabled={pending}
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <GithubLogo size={16} weight="fill" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => providerLogin("google")}
                  disabled={pending}
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <GoogleLogo size={16} weight="bold" />
                  Google
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-transparent *:data-[slot=field-separator-content]:text-white/40">
                或
              </FieldSeparator>

              <Field>
                <FieldLabel htmlFor="email" className="text-white/80">
                  邮箱
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="crew@example.com"
                  className="border-white/15 bg-white/5 text-white placeholder:text-white/30 focus:border-white/40"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password" className="text-white/80">
                  密码
                </FieldLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="至少 6 位密码"
                  className="border-white/15 bg-white/5 text-white placeholder:text-white/30 focus:border-white/40"
                />
              </Field>

              {error ? <p className="text-sm leading-6 text-red-200">{error}</p> : null}

              <Field>
                <Button type="submit" disabled={pending} className="w-full">
                  {pending ? "处理中..." : mode === "login" ? "登录并继续" : "创建船员档案"}
                </Button>
                <FieldDescription className="text-center text-white/50">
                  {mode === "login" ? "还没有账号？" : "已有账号？"}
                  <button
                    type="button"
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
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

      <button
        type="button"
        onClick={() => router.push("/")}
        className="w-full rounded-[10px] border border-white/10 bg-white/5 py-3 text-sm font-medium text-white/70 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
      >
        不注册，直接访问
      </button>
    </div>
  );
}
