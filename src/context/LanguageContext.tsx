'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en } from '../locales/en';
import { ko } from '../locales/ko';
import { zh } from '../locales/zh';
import { ja } from '../locales/ja';
import { es } from '../locales/es';
import { hi } from '../locales/hi';
import { fr } from '../locales/fr';
import { ar } from '../locales/ar';
import { ru } from '../locales/ru';

// Define the structure for the new keys
interface RulerControls {
    position: { title: string; desc: string; };
    unit: { title: string; desc: string; };
    tick: { title: string; desc: string; };
}

interface CalibrationStrings {
    title: string;
    desc: string;
    descMonitor: string;
    tabs: {
        card: string;
        monitor: string;
    };
    guide: string;
    cancel: string;
    save: string;
    currentPPI: string;
}

// Extend the existing Translations type to include the new keys
type Translations = typeof en & {
    ruler: {
        title: string;
        controls: RulerControls;
    };
    calibration: CalibrationStrings;
    footerLinks: {
        privacy: string;
        terms: string;
    };
    privacyContent: {
        title: string;
        intro: string;
        items: { title: string; desc: string; };
        cookies: { title: string; desc: string; };
        retention: { title: string; desc: string; };
    };
    meta: {
        title: string;
    };
    termsContent: {
        title: string;
        purpose: { title: string; desc: string; };
        service: { title: string; desc: string; };
        liability: { title: string; desc: string; };
        obligations: { title: string; desc: string; };
        updates: { title: string; desc: string; };
    };
};

export type Language = 'en' | 'ko' | 'zh' | 'ja' | 'es' | 'hi' | 'fr' | 'ar' | 'ru';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
    en: en as Translations,
    ko: ko as Translations,
    zh: zh as Translations,
    ja: ja as Translations,
    es: es as Translations,
    hi: hi as Translations,
    fr: fr as Translations,
    ar: ar as Translations,
    ru: ru as Translations,
};

export function LanguageProvider({ children, initialLang }: { children: ReactNode, initialLang?: Language }) {
    // Default to URL lang or English
    const [language, setLanguage] = useState<Language>(initialLang || 'en');

    useEffect(() => {
        if (initialLang) {
            setLanguage(initialLang);
        }
    }, [initialLang]);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('rulerhero_lang', lang);

        // Redirect to new language path
        // Assume current path is /[lang]/...
        // We need to replace the first segment.
        const path = window.location.pathname;
        const segments = path.split('/').filter(Boolean);

        // If first segment is a known lang, replace it
        // If not (e.g. root), prepend it (though root should be redirecting)
        const validLangs: string[] = ['en', 'ko', 'zh', 'ja', 'es', 'hi', 'fr', 'ar', 'ru'];

        if (segments.length > 0 && validLangs.includes(segments[0])) {
            segments[0] = lang;
        } else {
            segments.unshift(lang);
        }

        const newPath = '/' + segments.join('/');
        window.location.href = newPath;
    };

    let t: Translations = en as Translations;
    switch (language) {
        case 'ko': t = ko as Translations; break;
        case 'zh': t = zh as Translations; break;
        case 'ja': t = ja as Translations; break;
        case 'es': t = es as Translations; break;
        case 'hi': t = hi as Translations; break;
        case 'fr': t = fr as Translations; break;
        case 'ar': t = ar as Translations; break;
        case 'ru': t = ru as Translations; break;
        default: t = en as Translations;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
