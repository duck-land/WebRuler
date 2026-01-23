'use client';

import React from 'react';
import Header from '../../components/Header';
import { useLanguage } from '../../context/LanguageContext';

export default function PrivacyPage() {
    const { t } = useLanguage();
    return (
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f12', color: '#fff' }}>
            <Header />
            <section className="container" style={{ flex: 1, paddingTop: '120px', paddingBottom: '60px', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 700 }}>{t.privacyContent.title}</h1>

                <div style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '2rem' }}>{t.privacyContent.intro}</p>

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>{t.privacyContent.items.title}</h2>
                    <p>{t.privacyContent.items.desc}</p>

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>{t.privacyContent.cookies.title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: t.privacyContent.cookies.desc }} />

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>{t.privacyContent.retention.title}</h2>
                    <p>{t.privacyContent.retention.desc}</p>
                </div>
            </section>
        </main>
    );
}
