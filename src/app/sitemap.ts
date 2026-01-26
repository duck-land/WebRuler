import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://rulerhero.com';
    const languages = ['en', 'ko', 'zh', 'ja', 'es', 'hi', 'fr', 'ar', 'ru'];
    // Pages that exist for each language
    const pages = ['', 'ruler', 'terms', 'privacy', 'how-it-works'];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    languages.forEach(lang => {
        pages.forEach(page => {
            // Avoid trailing slash for empty page if desired, or handle it cleanly.
            // URL struct: /en, /en/ruler
            const url = page ? `${baseUrl}/${lang}/${page}` : `${baseUrl}/${lang}`;
            sitemapEntries.push({
                url,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: page === '' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
