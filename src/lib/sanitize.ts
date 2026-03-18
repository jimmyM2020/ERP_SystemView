/**
 * Strips all HTML tags and dangerous content using DOMPurify.
 * Safe to call on server (no-op) and client.
 */
export function sanitize(value: string): string {
  if (typeof window === 'undefined') return value
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const DOMPurify = require('dompurify')
  return DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
}
