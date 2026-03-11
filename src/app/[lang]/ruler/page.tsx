import { Metadata } from 'next';
import ClientPage from './ClientPage';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const baseUrl = 'https://rulerhero.com';

    return {
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
