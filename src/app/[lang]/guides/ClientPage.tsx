'use client';

import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import { GUIDES_DATA } from '../../../data/guidesData';
import { FaBookOpen, FaArrowRight } from 'react-icons/fa';

export default function GuidesIndexClientPage() {
    const { language } = useLanguage();

    const titleText = language === 'ko' ? '측정 & 디스플레이 기술 가이드' : 'Measurement & Display Guides';
    const subText = language === 'ko'
        ? '정확한 치수 계측, 화면 PPI 계산법, 종이 및 물체 규격에 대한 유용한 가이드를 읽어보세요.'
        : 'Explore comprehensive guides on screen PPI calculation, paper standards, and physical reference objects.';

    return (
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f12', color: '#fff' }}>
            <Header />

            <div className="container" style={{ flex: 1, padding: '120px 20px 60px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.4rem 1rem',
                            borderRadius: '20px',
                            background: 'rgba(99, 102, 241, 0.1)',
                            color: 'var(--primary)',
                            fontSize: '0.9rem',
                            marginBottom: '1rem',
                            border: '1px solid rgba(99, 102, 241, 0.2)'
                        }}>
                            <FaBookOpen />
                            <span>Knowledge Hub</span>
                        </div>

                        <h1 style={{
                            fontSize: '2.8rem',
                            fontWeight: 700,
                            marginBottom: '1rem',
                            background: 'linear-gradient(to right, #fff, #94a3b8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-1px'
                        }}>
                            {titleText}
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
                            {subText}
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {GUIDES_DATA.map((article) => {
                            const title = article.title[language] || article.title.en;
                            const summary = article.summary[language] || article.summary.en;
                            const category = article.category[language] || article.category.en;

                            return (
                                <Link
                                    key={article.slug}
                                    href={`/${language}/guides/${article.slug}`}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <div className="glass-panel" style={{
                                        padding: '1.8rem',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        transition: 'transform 0.2s, border-color 0.2s',
                                        cursor: 'pointer',
                                        borderRadius: '16px'
                                    }}>
                                        <div>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '1rem',
                                                fontSize: '0.85rem',
                                                color: 'var(--text-muted)'
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
                                                <span>{article.readTime}</span>
                                            </div>

                                            <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#fff', marginBottom: '0.8rem', lineHeight: '1.4' }}>
                                                {title}
                                            </h2>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                                {summary}
                                            </p>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: 'var(--primary)',
                                            fontWeight: 600,
                                            fontSize: '0.9rem'
                                        }}>
                                            <span>{language === 'ko' ? '가이드 읽기' : 'Read Article'}</span>
                                            <FaArrowRight size={12} />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
