import { MetadataRoute } from 'next'
import { GUIDES_DATA } from '../data/guidesData';

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://rulerhero.com';
    const languages = ['en', 'ko', 'zh', 'ja', 'es', 'hi', 'fr', 'ar', 'ru'];
    
    // Core pages
    const mainPages = ['', 'ruler', 'terms', 'privacy', 'contact', 'guides'];
    
    const sitemapEntries: MetadataRoute.Sitemap = [];

    languages.forEach(lang => {
        // Main pages
        mainPages.forEach(page => {
            const url = page ? `${baseUrl}/${lang}/${page}` : `${baseUrl}/${lang}`;
            sitemapEntries.push({
                url,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: page === '' ? 1.0 : (page === 'ruler' ? 0.9 : 0.7),
            });
        });

        // Guide detail pages
        GUIDES_DATA.forEach(article => {
            sitemapEntries.push({
                url: `${baseUrl}/${lang}/guides/${article.slug}`,
                lastModified: new Date(article.date),
                changeFrequency: 'monthly',
                priority: 0.8,
            });
        });
    });

    return sitemapEntries;
}
