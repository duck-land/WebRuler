import { Metadata } from 'next';
import ClientPage from './ClientPage';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const baseUrl = 'https://rulerhero.com';

    return {
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
