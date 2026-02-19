
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LanguageRedirector() {
    const router = useRouter();

    useEffect(() => {
        // 1. Check User Preference
        const savedLang = localStorage.getItem('rulerhero_lang');
        const validLangs = ['en', 'ko', 'zh', 'ja', 'es', 'hi', 'fr', 'ar', 'ru'];

        let targetLang = 'en';

        if (savedLang && validLangs.includes(savedLang)) {
            targetLang = savedLang;
        } else {
            // 2. Check Browser Language
            const browserLang = navigator.language.slice(0, 2);
            if (validLangs.includes(browserLang)) {
                targetLang = browserLang;
            }
        }

        // Always redirect to the target language path
        router.replace(`/${targetLang}`);
    }, [router]);

    return null;
}
