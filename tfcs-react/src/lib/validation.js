/** UAE mobile, e.g. 050 123 4567, +971501234567, 971 50 123 4567 */
export const isUaeMobile = (value) => /^(\+?971|0)?5\d{8}$/.test(String(value).replace(/[\s-]/g, ''));

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
