import { Metadata } from 'next';
import ClientPage from './ClientPage';

const titles: Record<string, string> = {
    en: "Interactive Online Screen Ruler Tool | RulerHero",
    ko: "대화형 온라인 실제 크기 자 도구 | RulerHero",
    zh: "交互式在线屏幕尺子工具 | RulerHero",
    ja: "インタラクティブ オンライン画面定規ツール | RulerHero",
    es: "Herramienta de Regla Interactiva en Línea | RulerHero",
    hi: "इंटरएक्टिव ऑनलाइन स्क्रीन स्केल टूल | RulerHero",
    fr: "Outil de Règle Écran Interactive en Ligne | RulerHero",
    ar: "أداة المسطرة التفاعلية عبر الإنترنت | RulerHero",
    ru: "Интерактивная Онлайн Линейка на Экране | RulerHero",
};

const descriptions: Record<string, string> = {
    en: "Measure items directly on your screen with multiple markers, draggable lines, cm/inch toggles, and credit card calibration.",
    ko: "화면 위에서 물건을 바로 측정하세요. 멀티 마커, 드래그 선 조정, cm/inch 단위 전환, 신용카드 보정 기능을 제공합니다.",
    zh: "直接在屏幕上测量物品，具备多重标记、可拖拽线条、厘米/英寸切换及信用卡校准功能。",
    ja: "画面上の物体を直接測定。マルチマーカー、ドラッグ調整、cm/inch切り替え、カード校正機能を搭載。",
    es: "Mide objetos directamente en tu pantalla con marcadores múltiples, líneas arrastrales, cambio de cm/pulgadas y calibración con tarjeta.",
    hi: "मल्टीपल मार्कर, ड्रैगेबल लाइन, सेमी/इंच टॉगल और कार्ड कैलिब्रेशन के साथ अपनी स्क्रीन पर ऑब्जेक्ट मापें।",
    fr: "Mesurez des objets directement sur votre écran avec plusieurs repères, lignes glissantes, bascule cm/pouce et étalonnage carte.",
    ar: "قِس العناصر مباشرة على شاشتك باستخدام علامات متعددة، وخطوط قابلة للسحب، والتبديل بين سم/بوصة، ومعايرة بطاقة الائتمان.",
    ru: "Измеряйте предметы прямо на экране с помощью маркеров, перетаскиваемых линий, переключателя см/дюйм и калибровки по карте.",
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
            url: `${baseUrl}/${lang}/ruler`,
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
            canonical: `${baseUrl}/${lang}/ruler`,
            languages: {
                'en': `${baseUrl}/en/ruler`,
                'ko': `${baseUrl}/ko/ruler`,
                'zh': `${baseUrl}/zh/ruler`,
                'ja': `${baseUrl}/ja/ruler`,
                'es': `${baseUrl}/es/ruler`,
                'hi': `${baseUrl}/hi/ruler`,
                'fr': `${baseUrl}/fr/ruler`,
                'ar': `${baseUrl}/ar/ruler`,
                'ru': `${baseUrl}/ru/ruler`,
                'x-default': `${baseUrl}/en/ruler`,
            },
        },
    };
}

export default function Page() {
    return <ClientPage />;
}
