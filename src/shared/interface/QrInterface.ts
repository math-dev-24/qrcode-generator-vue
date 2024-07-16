export interface QrInterface {
    id: string;
    value: string;
    margin: number;
    background: string;
    foreground: string;
    type: "url" | "vcard" | "text" | "email" | "sms";
}