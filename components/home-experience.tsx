"use client";

import { VoyagePlanner } from "@/components/voyage-planner";

export function HomeExperience() {
  return (
    <main className="overflow-x-hidden w-full max-w-full">
      {/* 登船面板 */}
      <section className="bg-background-secondary">
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
