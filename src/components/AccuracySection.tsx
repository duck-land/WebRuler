'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function AccuracySection() {
    const { t } = useLanguage();

    return (
        <section id="accuracy" style={{ padding: '6rem 0', background: '#15151a', color: '#fff' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        marginBottom: '1rem',
                        background: 'linear-gradient(to right, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {t.accuracy.title}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
                        {t.accuracy.intro}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', maxWidth: '900px', margin: '0 auto' }}>
                    {t.accuracy.sections.map((section: any, index: number) => (
                        <div key={index} style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '16px',
                            padding: '2rem',
                            transition: 'transform 0.2s',
                        }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#e2e8f0' }}>
                                {section.title}
                            </h3>
                            <p style={{
                                color: 'var(--text-muted)',
                                lineHeight: '1.7',
                                fontSize: '1.05rem',
                                wordBreak: 'keep-all' // Improves Korean text readability
                            }}>
                                {section.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
