import { Metadata } from 'next';
import GuideDetailClientPage from './ClientPage';
import { GUIDES_DATA } from '../../../../data/guidesData';

const validLangs = ['en', 'ko', 'zh', 'ja', 'es', 'hi', 'fr', 'ar', 'ru'];

export function generateStaticParams() {
    const params: { lang: string; slug: string }[] = [];
    validLangs.forEach((lang) => {
        GUIDES_DATA.forEach((article) => {
            params.push({ lang, slug: article.slug });
        });
    });
    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const baseUrl = 'https://rulerhero.com';

    const article = GUIDES_DATA.find((g) => g.slug === slug) || GUIDES_DATA[0];
    const title = `${article.title[lang] || article.title.en} | RulerHero`;
    const description = article.summary[lang] || article.summary.en;

    const languageAlternates: Record<string, string> = {};
    validLangs.forEach((l) => {
        languageAlternates[l] = `${baseUrl}/${l}/guides/${slug}`;
    });
    languageAlternates['x-default'] = `${baseUrl}/en/guides/${slug}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${baseUrl}/${lang}/guides/${slug}`,
            siteName: 'RulerHero',
            type: 'article',
            locale: lang,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
        alternates: {
            canonical: `${baseUrl}/${lang}/guides/${slug}`,
            languages: languageAlternates,
        },
    };
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { slug } = await params;
    return <GuideDetailClientPage slug={slug} />;
}
