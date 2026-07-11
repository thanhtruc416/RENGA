/**
 * Format a Vietnamese dong amount as a localised string.
 * The ₫ / đ symbol is intentionally excluded — append it in the template.
 *
 * Usage:
 *   // in component
 *   readonly formatVnd = formatVnd;
 *
 *   // in template
 *   {{ formatVnd(price) }}<u>đ</u>
 */
export function formatVnd(value: number): string {
  return value.toLocaleString('vi-VN');
}

export { formatVnd as formatPrice };
