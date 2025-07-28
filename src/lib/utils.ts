import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class values into a single string, resolving Tailwind CSS class conflicts.
 *
 * Accepts any number of class values, conditionally joins them, and merges Tailwind CSS classes to ensure only the final variant of conflicting classes is included.
 *
 * @returns The merged class name string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a tenant-specific URL path using the provided tenant slug.
 *
 * @param tenantSlug - The unique identifier for the tenant
 * @returns The URL path in the format `/tenants/{tenantSlug}`
 */
export function generateTenantURL(tenantSlug: string) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isSubdomainRoutingEnabled =
    process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING === "true";
  if (isDevelopment || !isSubdomainRoutingEnabled) {
    return `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenantSlug}`;
  }
  const protocol = "https";
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN!;

  return `${protocol}://${tenantSlug}.${domain}`;
}

export function formatCurrency(value: number | string) {
  const numericValue =
    typeof value === "number" ? value : parseFloat(value.toString());

  if (isNaN(numericValue)) {
    throw new Error(`Invalid currency value: ${value}`);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numericValue);
}
