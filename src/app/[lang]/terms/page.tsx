'use client';

import React from 'react';
import Header from '../../../components/Header';
import { useLanguage } from '../../../context/LanguageContext';

export default function TermsPage() {
    const { t } = useLanguage();
    return (
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f12', color: '#fff' }}>
            <Header />
            <section className="container" style={{ flex: 1, paddingTop: '120px', paddingBottom: '60px', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 700 }}>{t.termsContent.title}</h1>

                <div style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>{t.termsContent.purpose.title}</h2>
                    <p>{t.termsContent.purpose.desc}</p>

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>{t.termsContent.service.title}</h2>
                    <p>{t.termsContent.service.desc}</p>

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>{t.termsContent.liability.title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: t.termsContent.liability.desc }} />

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>{t.termsContent.obligations.title}</h2>
                    <p>{t.termsContent.obligations.desc}</p>

                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>{t.termsContent.updates.title}</h2>
                    <p>{t.termsContent.updates.desc}</p>
                </div>
            </section>
        </main>
    );
}
