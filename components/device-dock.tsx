"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Desktop,
  DeviceMobile,
  Laptop,
  PencilSimple,
  Plus,
  Trash,
} from "@phosphor-icons/react/dist/ssr";

import {
  androidBrandOptions,
  deviceOptions,
  statusOptions,
  type AndroidBrandId,
  type DeviceId,
  type StatusId,
} from "@/lib/voyage-system";
import { toneClassMap } from "@/lib/brand-library";

const DEVICES_KEY = "logbook.devices";

type StoredDevice = {
  id: string;
  type: DeviceId;
  brand?: AndroidBrandId;
  name: string;
  status: StatusId;
  progress: number;
  updatedAt: string;
};

function readDevices(): StoredDevice[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(DEVICES_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as StoredDevice[];
  } catch {
    return [];
  }
}

function deviceIcon(type: DeviceId) {
  if (type === "windows") {
    return <Desktop size={18} weight="duotone" />;
  }

  if (type === "mac") {
    return <Laptop size={18} weight="duotone" />;
  }

  return <DeviceMobile size={18} weight="duotone" />;
}

export function DeviceDock() {
  const [devices, setDevices] = useState<StoredDevice[]>(() => readDevices());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [type, setType] = useState<DeviceId>("windows");
  const [brand, setBrand] = useState<AndroidBrandId>("xiaomi");
  const [name, setName] = useState("我的 Windows 主力机");
  const [status, setStatus] = useState<StatusId>("new");

  useEffect(() => {
    window.localStorage.setItem(DEVICES_KEY, JSON.stringify(devices));
  }, [devices]);

  const selectedDevice = useMemo(
    () => deviceOptions.find((item) => item.id === type) ?? deviceOptions[0],
    [type],
  );

  const resetForm = () => {
    setEditingId(null);
    setType("windows");
    setBrand("xiaomi");
    setName("我的 Windows 主力机");
    setStatus("new");
  };

  const saveDevice = () => {
    const next: StoredDevice = {
      id: editingId ?? crypto.randomUUID(),
      type,
      brand: type === "android" ? brand : undefined,
      name: name.trim() || selectedDevice.label,
      status,
      progress: editingId ? devices.find((item) => item.id === editingId)?.progress ?? 0 : 0,
      updatedAt: new Date().toISOString(),
    };

    setDevices((current) =>
      editingId ? current.map((item) => (item.id === editingId ? next : item)) : [next, ...current],
    );
    resetForm();
  };

  const editDevice = (device: StoredDevice) => {
    setEditingId(device.id);
    setType(device.type);
    setBrand(device.brand ?? "xiaomi");
    setName(device.name);
    setStatus(device.status);
  };

  const removeDevice = (id: string) => {
    setDevices((current) => current.filter((item) => item.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <section className="rounded-[1.05rem] border border-line bg-white/62 p-6 md:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="section-kicker">设备舱</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            把你的设备先登记成一张卡。
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            目前先保存在本地浏览器。登录体系接上后，这些字段可以迁移到用户账户。
          </p>

          <div className="mt-6 space-y-3">
            <label className="block space-y-2 text-sm">
              <span className="font-medium text-foreground">设备名称</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-[0.8rem] border border-line bg-white/74 px-4 py-3 outline-none transition-colors focus:border-foreground"
              />
            </label>

            <div className="grid gap-2 sm:grid-cols-2">
              {deviceOptions.map((item) => {
                const tone = toneClassMap[item.tone];
                const active = item.id === type;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setType(item.id)}
                    className={[
                      "flex items-center gap-2 rounded-[0.8rem] border px-3 py-3 text-left text-sm transition-colors",
                      active ? tone.button : tone.buttonMuted,
                    ].join(" ")}
                  >
                    {deviceIcon(item.id)}
                    {item.label}
                  </button>
                );
              })}
            </div>

            {type === "android" ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {androidBrandOptions.map((item) => {
                  const tone = toneClassMap[item.tone];
                  const active = item.id === brand;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBrand(item.id)}
                      className={[
                        "rounded-[0.8rem] border px-3 py-3 text-left text-sm transition-colors",
                        active ? tone.button : tone.buttonMuted,
                      ].join(" ")}
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-muted">{item.helper}</span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            <label className="block space-y-2 text-sm">
              <span className="font-medium text-foreground">当前状态</span>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as StatusId)}
                className="w-full rounded-[0.8rem] border border-line bg-white/74 px-4 py-3 outline-none transition-colors focus:border-foreground"
              >
                {statusOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={saveDevice}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[0.85rem] border border-foreground bg-foreground px-4 py-3 text-sm font-medium text-background transition-colors hover:bg-black"
            >
              <Plus size={15} />
              {editingId ? "保存设备修改" : "添加设备卡片"}
            </button>
          </div>
        </div>

        <div className="grid gap-3">
          {devices.length ? (
            devices.map((device) => {
              const option = deviceOptions.find((item) => item.id === device.type) ?? deviceOptions[0];
              const tone = toneClassMap[option.tone];
              const brandLabel = androidBrandOptions.find((item) => item.id === device.brand)?.label;
              const statusLabel = statusOptions.find((item) => item.id === device.status)?.label;

              return (
                <article
                  key={device.id}
                  className="rounded-[0.95rem] border border-line bg-background/70 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className={`inline-flex h-10 w-10 items-center justify-center rounded-[0.85rem] border ${tone.chip}`}>
                        {deviceIcon(device.type)}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight text-foreground">{device.name}</h3>
                        <p className="mt-1 text-sm text-muted">
                          {option.label}
                          {brandLabel ? ` / ${brandLabel}` : ""} / {statusLabel}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => editDevice(device)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-[0.7rem] border border-line bg-white/60 text-muted hover:text-foreground"
                        aria-label="修改设备"
                      >
                        <PencilSimple size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeDevice(device.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-[0.7rem] border border-line bg-white/60 text-muted hover:text-foreground"
                        aria-label="删除设备"
                      >
                        <Trash size={15} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/78">
                    <span
                      className={`block h-full ${tone.line}`}
                      style={{ width: `${Math.max(6, device.progress)}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted">
                    出海进度 {device.progress}% / 上次更新 {new Date(device.updatedAt).toLocaleDateString("zh-CN")}
                  </p>
                </article>
              );
            })
          ) : (
            <div className="rounded-[0.95rem] border border-dashed border-line bg-background/50 p-6 text-sm leading-7 text-muted">
              还没有设备卡片。先添加一台主力设备，后面航线推荐会更像是为你生成的。
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
