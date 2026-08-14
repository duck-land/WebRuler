'use client';

import React from 'react';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Link from 'next/link';
import { useLanguage } from '../../../../context/LanguageContext';
import { GUIDES_DATA } from '../../../../data/guidesData';
import { FaArrowLeft, FaClock, FaCalendarAlt } from 'react-icons/fa';

export default function GuideDetailClientPage({ slug }: { slug: string }) {
    const { language } = useLanguage();

    const article = GUIDES_DATA.find((g) => g.slug === slug) || GUIDES_DATA[0];

    const title = article.title[language] || article.title.en;
    const summary = article.summary[language] || article.summary.en;
    const category = article.category[language] || article.category.en;
    const content = article.content[language] || article.content.en;

    return (
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f12', color: '#fff' }}>
            <Header />

            <div className="container" style={{ flex: 1, padding: '120px 20px 60px' }}>
                <article style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <Link
                            href={`/${language}/guides`}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--text-muted)',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                marginBottom: '1.5rem'
                            }}
                        >
                            <FaArrowLeft />
                            <span>{language === 'ko' ? '가이드 목록으로 돌아가기' : 'Back to Guides'}</span>
                        </Link>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                            marginBottom: '1rem'
                        }}>
                            <span style={{
                                background: 'rgba(56, 189, 248, 0.1)',
                                color: '#38bdf8',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '6px',
                                fontWeight: 600
                            }}>
                                {category}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <FaCalendarAlt />
                                <span>{article.date}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <FaClock />
                                <span>{article.readTime}</span>
                            </div>
                        </div>

                        <h1 style={{
                            fontSize: '2.5rem',
                            fontWeight: 700,
                            marginBottom: '1.2rem',
                            lineHeight: 1.2,
                            background: 'linear-gradient(to right, #fff, #94a3b8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {title}
                        </h1>

                        <p style={{
                            fontSize: '1.15rem',
                            color: 'var(--text-muted)',
                            lineHeight: 1.6,
                            padding: '1.2rem',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '12px',
                            borderLeft: '4px solid var(--primary)'
                        }}>
                            {summary}
                        </p>
                    </div>

                    <div
                        className="glass-panel"
                        style={{
                            padding: '2.5rem',
                            lineHeight: '1.8',
                            color: '#e2e8f0',
                            fontSize: '1.05rem'
                        }}
                        dangerouslySetInnerHTML={{ __html: content }}
                    />

                    {/* CTA Box */}
                    <div style={{
                        marginTop: '3rem',
                        padding: '2rem',
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(56,189,248,0.15) 100%)',
                        borderRadius: '16px',
                        border: '1px solid rgba(99,102,241,0.3)',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>
                            {language === 'ko' ? '지금 직접 길이를 측정해보세요!' : 'Start Measuring Objects Now!'}
                        </h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            {language === 'ko' ? '신용카드 보정 기능으로 화면 위에서 즉시 센티미터와 인치를 측정할 수 있습니다.' : 'Calibrate in 1 second and measure real-world items on your screen in cm or inches.'}
                        </p>
                        <Link href={`/${language}/ruler`} className="btn btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
                            {language === 'ko' ? '온라인 자 실행하기' : 'Open Online Ruler'}
                        </Link>
                    </div>
                </article>
            </div>

            <Footer />
        </main>
    );
}
