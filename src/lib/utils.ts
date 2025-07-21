import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTenantURL(tenantSlug: string) {
  return `/tenants/${tenantSlug}`;
}

export function formatCurrency(value: number | string) {
  const numericValue = typeof value === 'number' ? value : parseFloat(value.toString());
  
  if (isNaN(numericValue)) {
    throw new Error(`Invalid currency value: ${value}`);
  }
  
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numericValue);
}
