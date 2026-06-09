"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { VoyagePlanner } from "@/components/voyage-planner";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HomeExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(sectionRef.current!.querySelectorAll("[data-reveal]"), {
        opacity: 0,
        y: 16,
        stagger: 0.06,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 92%", toggleActions: "play none none none" },
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <main className="overflow-x-hidden w-full max-w-full">
      {/* ═══ SECTION 1 — 主航道 ═══ */}
      <section ref={sectionRef} className="page-shell py-12 md:py-20">
        <div className="mb-8 space-y-3" data-reveal>
          <p className="kicker">主航道</p>
          <h2 className="heading-section">先决定你在哪一段海面，再决定往哪个码头靠。</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "第一次出海", desc: "完全从零开始。先建立账号与支付秩序。", href: "/start", meta: "5 站主航道", hl: true },
            { title: "支付卡住了", desc: "网络已通，但扣费总不稳定。先排查支付路线。", href: "/category/payment", meta: "补给支线" },
            { title: "已经出海", desc: "不再从头学起。直接进工具、发现与日志层。", href: "/discoveries", meta: "自由探索" },
          ].map((r, i) => (
            <Link
              key={r.title}
              href={r.href}
              data-reveal
              className={`surface flex flex-col gap-3 p-5 ${r.hl ? "border-brand/15 bg-brand-mist-soft/60" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-white text-xs font-semibold [font-family:var(--font-mono)]">
                  {i + 1}
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-faint [font-family:var(--font-mono)]">{r.meta}</span>
              </div>
              <h3 className="heading-card">{r.title}</h3>
              <p className="body-sm">{r.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 2 — 登船面板 ═══ */}
      <section className="border-t border-border bg-background-secondary">
        <div className="page-shell py-12 md:py-20">
          <div className="mb-8 text-center space-y-3">
            <p className="kicker">交互登船面板</p>
            <h2 className="heading-section">选设备、定状态，剩下的航线自己长出来。</h2>
          </div>
          <VoyagePlanner mode="full" />
        </div>
      </section>
    </main>
  );
}
