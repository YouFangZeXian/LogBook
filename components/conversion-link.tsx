"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { trackConversionEvent } from "@/lib/cloud-data";

type ConversionLinkProps = ComponentProps<typeof Link> & {
  eventType: string;
  target: string;
  metadata?: Record<string, unknown>;
};

export function ConversionLink({
  eventType,
  target,
  metadata,
  onClick,
  ...props
}: ConversionLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        void trackConversionEvent({ eventType, target, metadata });
        onClick?.(event);
      }}
    />
  );
}
