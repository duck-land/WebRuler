import { Metadata } from 'next';
import PrivacyClientPage from './ClientPage';

const titles: Record<string, string> = {
    en: "Privacy Policy | RulerHero",
    ko: "개인정보 처리방침 | RulerHero",
    zh: "隐私政策 | RulerHero",
    ja: "プライバシーポリシー | RulerHero",
    es: "Política de Privacidad | RulerHero",
    hi: "गोपनीयता नीति | RulerHero",
    fr: "Politique de Confidentialité | RulerHero",
    ar: "سياسة الخصوصية | RulerHero",
    ru: "Политика Конфиденциальности | RulerHero",
};

const descriptions: Record<string, string> = {
    en: "Privacy Policy for RulerHero - Learn about how we handle cookies, analytics, and Google AdSense compliance.",
    ko: "RulerHero 개인정보 처리방침 - 쿠키 사용, 구글 애널리틱스 및 구글 애드센스 준수 사항 안내.",
    zh: "RulerHero 隐私政策 - 了解我们如何处理 Cookie、分析和 Google AdSense 合规性。",
    ja: "RulerHero プライバシーポリシー - クッキー、アナリティクス、Google AdSenseに関する取り扱い。",
    es: "Política de privacidad de RulerHero: aprenda cómo manejamos las cookies, análisis y cumplimiento de Google AdSense.",
    hi: "RulerHero की गोपनीयता नीति - कुकीज़, एनालिटिक्स और गूगल एडसेंस अनुपालन के बारे में जानें।",
    fr: "Politique de confidentialité de RulerHero - Découvrez comment nous gérons les cookies et la conformité Google AdSense.",
    ar: "سياسة الخصوصية لـ RulerHero - تعرف على كيفية تعاملنا مع ملفات تعريف الارتباط والتحليلات والامتثال لـ Google AdSense.",
    ru: "Политика конфиденциальности RulerHero - Узнайте о том, как мы используем cookie, аналитику и соблюдаем правила Google AdSense.",
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
            url: `${baseUrl}/${lang}/privacy`,
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
            canonical: `${baseUrl}/${lang}/privacy`,
            languages: {
                'en': `${baseUrl}/en/privacy`,
                'ko': `${baseUrl}/ko/privacy`,
                'zh': `${baseUrl}/zh/privacy`,
                'ja': `${baseUrl}/ja/privacy`,
                'es': `${baseUrl}/es/privacy`,
                'hi': `${baseUrl}/hi/privacy`,
                'fr': `${baseUrl}/fr/privacy`,
                'ar': `${baseUrl}/ar/privacy`,
                'ru': `${baseUrl}/ru/privacy`,
                'x-default': `${baseUrl}/en/privacy`,
            },
        },
    };
}

export default function Page() {
    return <PrivacyClientPage />;
}
