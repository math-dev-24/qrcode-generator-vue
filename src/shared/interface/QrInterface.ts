export type QrType = "url" | "vcard" | "text" | "email" | "sms" | "wifi" | "paypal" | "whatsapp" | "image" | "qrcode" | "call" | "event" | "twitter" | "tweet";

export interface QrInterface {
    id: string;
    value: string;
    margin: number;
    background: string;
    foreground: string;
    type: QrType;
    like: boolean;
    created_at: string;
}