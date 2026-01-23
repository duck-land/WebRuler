'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { FaCreditCard, FaDesktop, FaArrowsAlt, FaExpandArrowsAlt, FaMobileAlt, FaCog, FaSlidersH } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

export default function HowItWorks() {
    const { t } = useLanguage();

    return (
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f12', color: '#fff' }}>
            <Header />

            <section className="container" style={{ flex: 1, paddingTop: '120px', paddingBottom: '60px' }}>

                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 800,
                        marginBottom: '1rem',
                        background: 'linear-gradient(to right, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {t.howItWorks.title}
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        {t.howItWorks.subtitle}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    {/* Step 1 */}
                    <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{
                            width: '80px', height: '80px',
                            background: 'rgba(99, 102, 241, 0.1)',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '1.5rem',
                            fontSize: '1.8rem',
                            color: '#6366f1',
                            gap: '0.5rem'
                        }}>
                            <FaCreditCard />
                            <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>/</span>
                            <FaDesktop />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t.howItWorks.step1.title}</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: t.howItWorks.step1.desc }} />
                    </div>

                    {/* Step 2 */}
                    <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{
                            width: '80px', height: '80px',
                            background: 'rgba(168, 85, 247, 0.1)',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '1.5rem',
                            fontSize: '2rem',
                            color: '#a855f7'
                        }}>
                            <FaExpandArrowsAlt />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t.howItWorks.step2.title}</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: t.howItWorks.step2.desc }} />
                    </div>

                    {/* Step 3 */}
                    <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{
                            width: '80px', height: '80px',
                            background: 'rgba(236, 72, 153, 0.1)',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '1.5rem',
                            fontSize: '2rem',
                            color: '#ec4899'
                        }}>
                            <FaSlidersH />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t.howItWorks.step3.title}</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: t.howItWorks.step3.desc }} />
                    </div>

                </div>

                <div style={{ marginTop: '5rem', textAlign: 'center', padding: '3rem', background: '#1c1c22', borderRadius: '20px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t.howItWorks.ctaTitle}</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        {t.howItWorks.ctaDesc}
                    </p>
                    <Link href="/ruler" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                        {t.howItWorks.ctaButton}
                    </Link>
                </div>

            </section>
            <Footer />
        </main >
    );
}
