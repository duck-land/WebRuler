import { Metadata } from 'next';
import ClientPage from './ClientPage';

const titles: Record<string, string> = {
    en: "Online Ruler - Accurate Screen Ruler | RulerHero",
    ko: "온라인 자 - 화면에서 바로 재는 정확한 실제 크기 자 | RulerHero",
    zh: "在线尺子 - 精确的屏幕尺子 | RulerHero",
    ja: "オンライン定規 - 画面で測れる正確な定規 | RulerHero",
    es: "Regla en Línea - Regla de Pantalla Precisa | RulerHero",
    hi: "ऑनलाइन स्केल - सटीक स्क्रीन स्केल | RulerHero",
    fr: "Règle en Ligne - Règle Écran Précise | RulerHero",
    ar: "مسطرة عبر الإنترنت - مسطرة الشاشة الدقيقة | RulerHero",
    ru: "Онлайн Линейка - Точная Линейка на Экране | RulerHero",
};

const descriptions: Record<string, string> = {
    en: "The most accurate online screen ruler. Calibrate with a credit card or monitor size to measure anything on your screen in cm or inches.",
    ko: "웹 브라우저에서 바로 사용하는 가장 정확한 실제 크기 자. 신용카드나 모니터 크기로 1초만에 보정하고 cm, inch를 정확하게 측정하세요.",
    zh: "最准确的在线屏幕尺子。使用信用卡或显示器尺寸快速校准，精确测量厘米和英寸。",
    ja: "ブラウザで使える最も正確なオンライン定規。クレジットカードやモニターサイズで簡単にキャリブレーションしてcm・inchを測定。",
    es: "La regla en línea más precisa para tu navegador. Calibra con una tarjeta de crédito o el tamaño de tu monitor para medir en cm o pulgadas.",
    hi: "वेब ब्राउज़र के लिए सबसे सटीक ऑनलाइन स्केल। क्रेडिट कार्ड या मॉनिटर साइज से आसानी से सेन्티मीटर और इंच मापें।",
    fr: "La règle en ligne la plus précise pour votre navigateur. Étalonnez avec une carte bancaire ou la taille de votre écran pour mesurer en cm et pouces.",
    ar: "أدق مسطرة عبر الإنترنت لمتصفحك. قم بالمعايرة باستخدام بطاقة ائتمان أو حجم الشاشة للقياس بالسنتيمتر والبوصة.",
    ru: "Самая точная онлайн-линейка для браузера. Калибруйте по банковской карте или размеру монитора для измерения в см и дюймах.",
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
            url: `${baseUrl}/${lang}`,
            siteName: 'RulerHero',
            type: 'website',
            locale: lang,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
        alternates: {
            canonical: `${baseUrl}/${lang}`,
            languages: {
                'en': `${baseUrl}/en`,
                'ko': `${baseUrl}/ko`,
                'zh': `${baseUrl}/zh`,
                'ja': `${baseUrl}/ja`,
                'es': `${baseUrl}/es`,
                'hi': `${baseUrl}/hi`,
                'fr': `${baseUrl}/fr`,
                'ar': `${baseUrl}/ar`,
                'ru': `${baseUrl}/ru`,
                'x-default': `${baseUrl}/en`,
            },
        },
    };
}

export default function Page() {
    return <ClientPage />;
}
