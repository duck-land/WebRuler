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

type Language = 'en' | 'ko' | 'zh' | 'ja' | 'es' | 'hi' | 'fr' | 'ar' | 'ru';

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

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en'); // Default to English initially
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load persisted language or detect browser language
        const validLangs: Language[] = ['en', 'ko', 'zh', 'ja', 'es', 'hi', 'fr', 'ar', 'ru'];
        const savedLang = localStorage.getItem('rulerhero_lang') as Language;

        if (savedLang && validLangs.includes(savedLang)) {
            setLanguage(savedLang);
        } else {
            const browserLang = navigator.language.slice(0, 2);
            if (validLangs.includes(browserLang as Language)) {
                setLanguage(browserLang as Language);
            }
        }
        setIsLoaded(true);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('rulerhero_lang', lang);
    };

    let t: Translations = en as Translations; // Cast to Translations to satisfy type checking
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

    // Prevent flash of wrong content (optional, but good for UX)
    // Or just render immediately with default. Let's render immediately for speed, effect adjusts it fast enough usually.

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
