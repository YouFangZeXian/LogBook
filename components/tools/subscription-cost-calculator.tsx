"use client";

import { useMemo, useState } from "react";
import { BrandMark } from "@/components/brand-mark";

export function SubscriptionCostCalculator() {
  const [usdPrice, setUsdPrice] = useState("20");
  const [exchangeRate, setExchangeRate] = useState("7.25");
  const [feeRate, setFeeRate] = useState("3");

  const result = useMemo(() => {
    const usd = Number(usdPrice) || 0;
    const rate = Number(exchangeRate) || 0;
    const fee = (Number(feeRate) || 0) / 100;
    const base = usd * rate;
    const total = base * (1 + fee);

    return {
      base,
      total,
      feeAmount: total - base,
    };
  }, [exchangeRate, feeRate, usdPrice]);

  return (
    <section className="card p-6">
      <div className="space-y-2">
        <BrandMark brand="chatgpt" size="sm" />
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          AI 订阅成本计算器
        </h2>
        <p className="text-sm leading-7 text-muted">
          输入美元月费、汇率和手续费，先估算自己真实每月成本。
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-sm">
          <span className="font-medium text-foreground">月费（美元）</span>
          <input
            type="number"
            value={usdPrice}
            onChange={(event) => setUsdPrice(event.target.value)}
            className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none transition-colors focus:border-accent"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium text-foreground">汇率</span>
          <input
            type="number"
            step="0.01"
            value={exchangeRate}
            onChange={(event) => setExchangeRate(event.target.value)}
            className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none transition-colors focus:border-accent"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium text-foreground">手续费（%）</span>
          <input
            type="number"
            step="0.1"
            value={feeRate}
            onChange={(event) => setFeeRate(event.target.value)}
            className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none transition-colors focus:border-accent"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line bg-soft p-4">
          <p className="text-sm text-muted">基础人民币成本</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            ¥{result.base.toFixed(2)}
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-4">
          <p className="text-sm text-muted">手续费金额</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            ¥{result.feeAmount.toFixed(2)}
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/70 p-4">
          <p className="text-sm text-muted">最终月成本</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            ¥{result.total.toFixed(2)}
          </p>
        </div>
      </div>
    </section>
  );
}
