'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem('rulerhero_lang');
    const validLangs = ['en', 'ko', 'zh', 'ja', 'es', 'hi', 'fr', 'ar', 'ru'];

    if (savedLang && validLangs.includes(savedLang)) {
      router.replace(`/${savedLang}`);
      return;
    }

    const browserLang = navigator.language.slice(0, 2);
    const targetLang = validLangs.includes(browserLang) ? browserLang : 'en';
    router.replace(`/${targetLang}`);
  }, [router]);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0c',
      color: 'white'
    }}>
      <p>Loading RulerHero..</p>
    </div>
  );
}
