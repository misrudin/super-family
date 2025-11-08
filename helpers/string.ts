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