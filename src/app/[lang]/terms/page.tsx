import { Metadata } from 'next';
import TermsClientPage from './ClientPage';

const titles: Record<string, string> = {
    en: "Terms of Service | RulerHero",
    ko: "이용약관 | RulerHero",
    zh: "服务条款 | RulerHero",
    ja: "利用規約 | RulerHero",
    es: "Términos de Servicio | RulerHero",
    hi: "सेवा की शर्तें | RulerHero",
    fr: "Conditions d'Utilisation | RulerHero",
    ar: "شروط الخدمة | RulerHero",
    ru: "Условия Обслуживания | RulerHero",
};

const descriptions: Record<string, string> = {
    en: "Terms of Service for RulerHero online ruler application.",
    ko: "RulerHero 온라인 자 서비스 이용약관 안내.",
    zh: "RulerHero 在线尺子服务条款。",
    ja: "RulerHero オンライン定規サービスの利用規約。",
    es: "Términos de servicio de la aplicación de regla en línea RulerHero.",
    hi: "RulerHero ऑनलाइन स्केल सेवा की शर्तें।",
    fr: "Conditions d'utilisation de l'application de règle en ligne RulerHero.",
    ar: "شروط الخدمة لتطبيق المسطرة عبر الإنترنت RulerHero.",
    ru: "Условия обслуживания онлайн-линейки RulerHero.",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const baseUrl = 'https://rulerhero.com';
    const title = titles[lang] || titles.en;
    const description = descriptions[lang] || descriptions.en;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${baseUrl}/${lang}/terms`,
            siteName: 'RulerHero',
            type: 'website',
            locale: lang,
        },
        twitter: {
            card: 'summary',
            title,
            description,
        },
        alternates: {
            canonical: `${baseUrl}/${lang}/terms`,
            languages: {
                'en': `${baseUrl}/en/terms`,
                'ko': `${baseUrl}/ko/terms`,
                'zh': `${baseUrl}/zh/terms`,
                'ja': `${baseUrl}/ja/terms`,
                'es': `${baseUrl}/es/terms`,
                'hi': `${baseUrl}/hi/terms`,
                'fr': `${baseUrl}/fr/terms`,
                'ar': `${baseUrl}/ar/terms`,
                'ru': `${baseUrl}/ru/terms`,
                'x-default': `${baseUrl}/en/terms`,
            },
        },
    };
}

export default function Page() {
    return <TermsClientPage />;
}
