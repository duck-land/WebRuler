import { Metadata } from 'next';
import ContactClientPage from './ClientPage';

const titles: Record<string, string> = {
    en: "Contact Us | RulerHero",
    ko: "문의하기 | RulerHero",
    zh: "联系我们 | RulerHero",
    ja: "お問い合わせ | RulerHero",
    es: "Contacto | RulerHero",
    hi: "संपर्क करें | RulerHero",
    fr: "Contactez-nous | RulerHero",
    ar: "اتصل بنا | RulerHero",
    ru: "Контакты | RulerHero",
};

const descriptions: Record<string, string> = {
    en: "Contact the RulerHero team for support, feedback, or inquiries.",
    ko: "RulerHero 서비스 문의 및 피드백 전송.",
    zh: "联系 RulerHero 团队获取支持、反馈或咨询。",
    ja: "RulerHeroチームへのお問い合わせ・フィードバック。",
    es: "Póngase en contacto con el equipo de RulerHero para soporte o consultas.",
    hi: "सहायता या प्रतिक्रिया के लिए RulerHero टीम से संपर्क करें।",
    fr: "Contactez l'équipe RulerHero pour toute question ou suggestion.",
    ar: "تواصل مع فريق RulerHero للدعم أو الملاحظات.",
    ru: "Свяжитесь с командой RulerHero для поддержки или обратной связи.",
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
            url: `${baseUrl}/${lang}/contact`,
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
            canonical: `${baseUrl}/${lang}/contact`,
            languages: {
                'en': `${baseUrl}/en/contact`,
                'ko': `${baseUrl}/ko/contact`,
                'zh': `${baseUrl}/zh/contact`,
                'ja': `${baseUrl}/ja/contact`,
                'es': `${baseUrl}/es/contact`,
                'hi': `${baseUrl}/hi/contact`,
                'fr': `${baseUrl}/fr/contact`,
                'ar': `${baseUrl}/ar/contact`,
                'ru': `${baseUrl}/ru/contact`,
                'x-default': `${baseUrl}/en/contact`,
            },
        },
    };
}

export default function Page() {
    return <ContactClientPage />;
}
