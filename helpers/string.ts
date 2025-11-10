import { date } from "./date";

export const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/ /g, '-');
}

export const generateRandomString = (length: number) => {
    return Math.random().toString(36).substring(2, 2 + length);
}

export const generateTransactionNo = () => {
    return `TRX${date().format('YYYYMMDDHHmmss')}`;
}

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const formatNumber = (amount: number): string => {
    return new Intl.NumberFormat('id-ID').format(amount);
};

/**
 * Format number to Rupiah input format (without currency symbol)
 * Example: 1000000 -> "1.000.000"
 */
export const formatRupiahInput = (amount: number | string): string => {
    if (!amount && amount !== 0) return "";
    const numValue = typeof amount === 'string' ? parseFloat(amount.replace(/\./g, '')) : amount;
    if (isNaN(numValue)) return "";
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numValue);
};

/**
 * Parse Rupiah formatted string to number
 * Example: "Rp 1.000.000" or "1.000.000" -> 1000000
 */
export const parseRupiah = (value: string): number => {
    if (!value) return 0;
    // Remove all non-digit characters except dots and commas
    const cleaned = value.toString().replace(/[^\d]/g, '');
    const parsed = parseInt(cleaned, 10);
    return isNaN(parsed) ? 0 : parsed;
};