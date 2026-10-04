'use client';

import React from 'react';
import Link from 'next/link';
import { GUIDES_DATA } from '../data/guidesData';
import { useLanguage } from '../context/LanguageContext';
import { FaBookOpen, FaArrowRight, FaClock } from 'react-icons/fa';

const I18N_GUIDES: Record<string, { badge: string; title: string; subtitle: string; readMore: string }> = {
    ko: {
        badge: '측정 백과사전',
        title: '측정 백과사전 & 전문 가이드',
        subtitle: '화면 PPI 계산법, 종이 규격, 신용카드 실물 치수 등 측정을 위한 핵심 가이드',
        readMore: '가이드 읽기'
    },
    en: {
        badge: 'KNOWLEDGE BASE',
        title: 'Measurement Knowledge Base & Guides',
        subtitle: 'Essential guides on screen PPI calculation, paper dimensions, and reference object standards.',
        readMore: 'Read Full Guide'
    },
    zh: {
        badge: '知识库',
        title: '测量知识库与专业指南',
        subtitle: '关于屏幕 PPI 计算、纸张规格及标准参照物尺寸的权威指南。',
        readMore: '阅读完整指南'
    },
    ja: {
        badge: 'ナレッジベース',
        title: '測定ナレッジベース＆専門ガイド',
        subtitle: '画面PPIの計算方法、用紙サイズ規格、参照物の実寸に関する決定版ガイド。',
        readMore: 'ガイドを読む'
    },
    es: {
        badge: 'BASE DE CONOCIMIENTO',
        title: 'Base de Conocimiento y Guías de Medición',
        subtitle: 'Guías esenciales sobre cálculo de PPI de pantalla, dimensiones de papel y objetos de referencia.',
        readMore: 'Leer Guía Completa'
    },
    hi: {
        badge: 'ज्ञान केंद्र',
        title: 'मापन ज्ञान केंद्र और गाइड',
        subtitle: 'स्क्रीन PPI गणना, कागज़ के आकार और संदर्भ वस्तुओं पर आवश्यक गाइड।',
        readMore: 'पूरी गाइड पढ़ें'
    },
    fr: {
        badge: 'BASE DE CONNAISSANCES',
        title: 'Base de Connaissances et Guides de Mesure',
        subtitle: 'Guides essentiels sur le calcul du PPI d\'écran, les formats de papier et les objets de référence.',
        readMore: 'Lire le Guide Complet'
    },
    ar: {
        badge: 'قاعدة المعرفة',
        title: 'قاعدة معرفة وأدلة القياس',
        subtitle: 'أدلة أساسية لحساب PPI الشاشة وأبعاد الورق والمعايير المرجعية.',
        readMore: 'قراءة الدليل الكامل'
    },
    ru: {
        badge: 'БАЗА ЗНАНИЙ',
        title: 'База Знаний и Руководства по Измерениям',
        subtitle: 'Основные руководства по расчету PPI экрана, форматам бумаги и эталонным предметам.',
        readMore: 'Читать Руководство'
    }
};

export default function HomeGuidesSection() {
    const { language } = useLanguage();
    const tSection = I18N_GUIDES[language] || I18N_GUIDES.en;

    return (
        <section id="guides" style={{ padding: '6rem 0', background: 'var(--background)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.4rem 1rem',
                        borderRadius: '20px',
                        background: 'rgba(99, 102, 241, 0.1)',
                        color: '#6366f1',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        marginBottom: '1rem'
                    }}>
                        <FaBookOpen />
                        <span>{tSection.badge}</span>
                    </div>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        marginBottom: '1rem',
                        background: 'linear-gradient(to right, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {tSection.title}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
                        {tSection.subtitle}
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {GUIDES_DATA.map((article) => {
                        const title = article.title[language] || article.title['en'] || article.title['ko'];
                        const summary = article.summary[language] || article.summary['en'] || article.summary['ko'];
                        const category = article.category[language] || article.category['en'] || article.category['ko'];

                        return (
                            <div key={article.slug} className="glass-panel" style={{
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                                transition: 'transform 0.2s, border-color 0.2s',
                                border: '1px solid var(--border)'
                            }}>
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '1rem'
                                    }}>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            padding: '0.25rem 0.6rem',
                                            borderRadius: '6px',
                                            background: 'rgba(99, 102, 241, 0.15)',
                                            color: 'var(--primary-glow)'
                                        }}>
                                            {category}
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <FaClock size={12} />
                                            {article.readTime}
                                        </span>
                                    </div>

                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.4 }}>
                                        <Link href={`/${language}/guides/${article.slug}`} style={{ color: '#fff', textDecoration: 'none' }}>
                                            {title}
                                        </Link>
                                    </h3>

                                    <p style={{
                                        color: 'var(--text-muted)',
                                        fontSize: '0.9rem',
                                        lineHeight: 1.6,
                                        marginBottom: '1.5rem',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {summary}
                                    </p>
                                </div>

                                <Link href={`/${language}/guides/${article.slug}`} style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'var(--primary)',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    marginTop: 'auto'
                                }}>
                                    <span>{tSection.readMore}</span>
                                    <FaArrowRight size={12} />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
