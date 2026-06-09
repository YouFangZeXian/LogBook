"use client";

import { useEffect, useMemo, useState } from "react";
import { Desktop, DeviceMobile, Laptop, PencilSimple, Plus, Trash } from "@phosphor-icons/react/dist/ssr";
import { androidBrandOptions, deviceOptions, statusOptions, type AndroidBrandId, type DeviceId, type StatusId } from "@/lib/voyage-system";

const DEVICES_KEY = "logbook.devices";

type StoredDevice = { id: string; type: DeviceId; brand?: AndroidBrandId; name: string; status: StatusId; progress: number; updatedAt: string };

function readDevices(): StoredDevice[] {
  try { return JSON.parse(window.localStorage.getItem(DEVICES_KEY) ?? "[]"); } catch { return []; }
}

function deviceIcon(type: DeviceId) {
  if (type === "windows") return <Desktop size={18} weight="duotone" />;
  if (type === "mac") return <Laptop size={18} weight="duotone" />;
  return <DeviceMobile size={18} weight="duotone" />;
}

export function DeviceDock() {
  const [devices, setDevices] = useState<StoredDevice[]>(() => readDevices());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [type, setType] = useState<DeviceId>("windows");
  const [brand, setBrand] = useState<AndroidBrandId>("xiaomi");
  const [name, setName] = useState("我的 Windows 主力机");
  const [status, setStatus] = useState<StatusId>("new");

  useEffect(() => { window.localStorage.setItem(DEVICES_KEY, JSON.stringify(devices)); }, [devices]);

  const selectedDevice = useMemo(() => deviceOptions.find((d) => d.id === type) ?? deviceOptions[0], [type]);

  const resetForm = () => { setEditingId(null); setType("windows"); setBrand("xiaomi"); setName("我的 Windows 主力机"); setStatus("new"); };

  const saveDevice = () => {
    const next: StoredDevice = { id: editingId ?? crypto.randomUUID(), type, brand: type === "android" ? brand : undefined, name: name.trim() || selectedDevice.label, status, progress: editingId ? devices.find((d) => d.id === editingId)?.progress ?? 0 : 0, updatedAt: new Date().toISOString() };
    setDevices((c) => editingId ? c.map((d) => (d.id === editingId ? next : d)) : [next, ...c]);
    resetForm();
  };

  const editDevice = (d: StoredDevice) => { setEditingId(d.id); setType(d.type); setBrand(d.brand ?? "xiaomi"); setName(d.name); setStatus(d.status); };
  const removeDevice = (id: string) => { setDevices((c) => c.filter((d) => d.id !== id)); if (editingId === id) resetForm(); };

  return (
    <section className="surface p-6 md:p-8">
      <p className="kicker">设备舱</p>
      <h2 className="heading-section mt-3">把你的设备登记成一张卡。</h2>
      <p className="body-text mt-2">保存在本地浏览器，登录体系接上后可迁移到云端。</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="设备名称" className="input-field" />
          <div className="grid gap-2 sm:grid-cols-2">
            {deviceOptions.map((item) => (
              <button key={item.id} type="button" onClick={() => setType(item.id)}
                className={`flex items-center gap-2 rounded-[14px] border px-3 py-3 text-sm text-left transition-all ${
                  item.id === type ? "border-brand/30 bg-brand-mist-soft text-brand font-medium" : "border-border bg-white text-muted hover:border-border-medium"
                }`}>
                {deviceIcon(item.id)} {item.label}
              </button>
            ))}
          </div>
          {type === "android" ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {androidBrandOptions.map((item) => (
                <button key={item.id} type="button" onClick={() => setBrand(item.id)}
                  className={`rounded-[14px] border p-3 text-left text-sm transition-all ${
                    item.id === brand ? "border-brand/30 bg-brand-mist-soft text-brand font-medium" : "border-border bg-white text-muted hover:border-border-medium"
                  }`}>
                  <span className="font-medium">{item.label}</span>
                  <span className="mt-0.5 block text-xs font-normal text-muted">{item.helper}</span>
                </button>
              ))}
            </div>
          ) : null}
          <select value={status} onChange={(e) => setStatus(e.target.value as StatusId)} className="input-field">
            {statusOptions.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
          <button type="button" onClick={saveDevice} className="btn-primary w-full"><Plus size={15} /> {editingId ? "保存修改" : "添加设备卡片"}</button>
        </div>
        <div className="grid gap-3">
          {devices.length ? devices.map((d) => {
            const option = deviceOptions.find((o) => o.id === d.type) ?? deviceOptions[0];
            const brandLabel = androidBrandOptions.find((o) => o.id === d.brand)?.label;
            const statusLabel = statusOptions.find((o) => o.id === d.status)?.label;
            return (
              <article key={d.id} className="surface-muted flex items-start justify-between gap-4 p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-border bg-white text-muted">{deviceIcon(d.type)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{d.name}</h3>
                    <p className="mt-1 text-sm text-muted">{option.label}{brandLabel ? ` / ${brandLabel}` : ""} / {statusLabel}</p>
                    <div className="mt-3 h-1.5 w-32 rounded-full bg-white"><span className="block h-full rounded-full bg-brand-sea" style={{ width: `${Math.max(6, d.progress)}%` }} /></div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button type="button" onClick={() => editDevice(d)} className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-faint hover:bg-black/5"><PencilSimple size={14} /></button>
                  <button type="button" onClick={() => removeDevice(d.id)} className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-faint hover:bg-black/5"><Trash size={14} /></button>
                </div>
              </article>
            );
          }) : (
            <div className="surface-muted p-6 text-center text-sm text-muted">还没有设备卡片，先添加一台主力设备。</div>
          )}
        </div>
      </div>
    </section>
  );
}
