"use client";

import { useMemo, useState } from "react";
import { BrandMark } from "@/components/brand-mark";

export function GiftCardCalculator() {
  const [faceValue, setFaceValue] = useState("100");
  const [purchasePrice, setPurchasePrice] = useState("92");

  const result = useMemo(() => {
    const value = Number(faceValue) || 0;
    const paid = Number(purchasePrice) || 0;
    const discount = value > 0 ? (paid / value) * 10 : 0;
    const saved = value - paid;
    return { discount, saved };
  }, [faceValue, purchasePrice]);

  return (
    <section className="surface p-6">
      <div className="space-y-2">
        <BrandMark brand="apple-gift-card" size="sm" />
        <h2 className="heading-card text-xl">Apple Gift Card 折扣计算器</h2>
        <p className="body-sm">先算清楚是几折、便宜了多少钱，再决定值不值得买。</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="font-medium text-foreground">面值</span>
          <input type="number" value={faceValue} onChange={(e) => setFaceValue(e.target.value)} className="input-field" />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium text-foreground">购买价格</span>
          <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} className="input-field" />
        </label>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="surface-muted p-4"><p className="text-sm text-muted">折扣</p><p className="mt-2 text-2xl font-semibold text-foreground">{result.discount.toFixed(2)} 折</p></div>
        <div className="surface p-4"><p className="text-sm text-muted">节省金额</p><p className="mt-2 text-2xl font-semibold text-foreground">¥{result.saved.toFixed(2)}</p></div>
      </div>
    </section>
  );
}
