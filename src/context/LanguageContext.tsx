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

type Language = 'en' | 'ko' | 'zh' | 'ja' | 'es' | 'hi' | 'fr' | 'ar' | 'ru';
type Translations = typeof en;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en'); // Default to English initially
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load persisted language or detect browser language
        const savedLang = localStorage.getItem('webruler_lang') as Language;
        const validLangs: Language[] = ['en', 'ko', 'zh', 'ja', 'es', 'hi', 'fr', 'ar', 'ru'];

        if (savedLang && validLangs.includes(savedLang)) {
            setLanguage(savedLang);
        } else {
            // Simple browser detection
            const browserLang = navigator.language;
            if (browserLang.includes('ko')) setLanguage('ko');
            else if (browserLang.includes('zh')) setLanguage('zh');
            else if (browserLang.includes('ja')) setLanguage('ja');
            else if (browserLang.includes('es')) setLanguage('es');
            else if (browserLang.includes('hi')) setLanguage('hi');
            else if (browserLang.includes('fr')) setLanguage('fr');
            else if (browserLang.includes('ar')) setLanguage('ar');
            else if (browserLang.includes('ru')) setLanguage('ru');
        }
        setIsLoaded(true);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('webruler_lang', lang);
    };

    let t = en;
    switch (language) {
        case 'ko': t = ko; break;
        case 'zh': t = zh; break;
        case 'ja': t = ja; break;
        case 'es': t = es; break;
        case 'hi': t = hi; break;
        case 'fr': t = fr; break;
        case 'ar': t = ar; break;
        case 'ru': t = ru; break;
        default: t = en;
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
