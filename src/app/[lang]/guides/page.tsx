import { Metadata } from 'next';
import GuidesIndexClientPage from './ClientPage';

const titles: Record<string, string> = {
    en: "Measurement & Display Technology Guides | RulerHero",
    ko: "측정 & 디스플레이 기술 가이드 | RulerHero",
    zh: "测量与显示技术指南 | RulerHero",
    ja: "測定・ディスプレイ技術ガイド | RulerHero",
    es: "Guías de Medición y Tecnología de Display | RulerHero",
    hi: "मापन और डिस्प्ले तकनीक गाइड | RulerHero",
    fr: "Guides de Mesure et Technologie d'Affichage | RulerHero",
    ar: "أدلة القياس وتقنية الشاشة | RulerHero",
    ru: "Руководства по Измерениям и Дисплеям | RulerHero",
};

const descriptions: Record<string, string> = {
    en: "Explore expert guides on screen PPI calculations, paper size standards (A4/Letter), physical reference dimensions, and digital ruler calibration.",
    ko: "화면 PPI 계산법, 종이 규격(A4/Letter), 실물 크기 기준표, 디지털 자 정밀 보정법에 관한 전문 가이드를 확인하세요.",
    zh: "探索有关屏幕 PPI 计算、纸张尺寸标准（A4/Letter）、物理参考尺寸和数字尺子校准的专业指南。",
    ja: "画面PPI計算、用紙サイズ規格（A4/Letter）、参照物サイズ、デジタル定規校正の専門ガイドをご案内。",
    es: "Guías sobre cálculo de PPI en pantalla, estándares de papel (A4/Letter), dimensiones de referencia y calibración de regla digital.",
    hi: "स्क्रीन पीपीआई गणना, कागज मानक (A4/लेटर), संदर्भ आयाम और डिजिटल स्केल कैलिब्रेशन पर गाइड।",
    fr: "Guides d'experts sur le calcul du PPI, les normes de papier (A4/Letter), les dimensions de référence et l'étalonnage de règle numérique.",
    ar: "استكشف أدلة الخبراء حول حسابات PPI للشاشة، ومعايير حجم الورق (A4/Letter)، وأبعاد المراجع والمصاطر الرقمية.",
    ru: "Экспертные руководства по расчету PPI, стандартам бумаги (A4/Letter), размерам предметов и калибровке онлайн-линейки.",
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
            url: `${baseUrl}/${lang}/guides`,
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
            canonical: `${baseUrl}/${lang}/guides`,
            languages: {
                'en': `${baseUrl}/en/guides`,
                'ko': `${baseUrl}/ko/guides`,
                'zh': `${baseUrl}/zh/guides`,
                'ja': `${baseUrl}/ja/guides`,
                'es': `${baseUrl}/es/guides`,
                'hi': `${baseUrl}/hi/guides`,
                'fr': `${baseUrl}/fr/guides`,
                'ar': `${baseUrl}/ar/guides`,
                'ru': `${baseUrl}/ru/guides`,
                'x-default': `${baseUrl}/en/guides`,
            },
        },
    };
}

export default function Page() {
    return <GuidesIndexClientPage />;
}
