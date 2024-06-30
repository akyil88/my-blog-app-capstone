export type Blog = {
    id: string;
    title: string;
    description: string;
    image?: string; // Das Bild wird als Base64-String vom Backend kommen, daher als optionaler string definiert
};
