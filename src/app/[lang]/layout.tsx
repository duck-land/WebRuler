import { Language, LanguageProvider } from "../../context/LanguageContext";
import { Metadata } from "next";

export async function generateStaticParams() {
    return [
        { lang: 'en' },
        { lang: 'ko' },
        { lang: 'zh' },
        { lang: 'ja' },
        { lang: 'es' },
        { lang: 'hi' },
        { lang: 'fr' },
        { lang: 'ar' },
        { lang: 'ru' },
    ];
}

export const metadata: Metadata = {
    title: "RulerHero",
    description: "Online Ruler - Measure length on your screen",
};

export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    // Validate lang
    const validLangs = ['en', 'ko', 'zh', 'ja', 'es', 'hi', 'fr', 'ar', 'ru'];
    const currentLang = validLangs.includes(lang) ? (lang as Language) : 'en';

    return (
        <LanguageProvider initialLang={currentLang}>
            {children}
        </LanguageProvider>
    );
}
