'use client';

import Link from 'next/link';
import { FaRulerCombined } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: '1.5rem 0'
        }}>
            <div className="container glass-panel" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1.5rem'
            }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
                    <FaRulerCombined style={{ color: 'var(--primary)' }} />
                    <span>{t.header.title}</span>
                </Link>

                <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link href="#features" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.header.features}</Link>

                    {/* Language Selector */}
                    <div style={{ position: 'relative' }}>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as any)}
                            style={{
                                appearance: 'none',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-muted)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                padding: '0.4rem 2rem 0.4rem 0.8rem',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                outline: 'none',
                                textAlign: 'center'
                            }}
                        >
                            <option value="en">English</option>
                            <option value="ko">한국어</option>
                            <option value="zh">中文</option>
                            <option value="ja">日本語</option>
                            <option value="es">Español</option>
                            <option value="hi">हिन्दी</option>
                            <option value="fr">Français</option>
                            <option value="ar">العربية</option>
                            <option value="ru">Русский</option>
                        </select>
                        <div style={{
                            position: 'absolute',
                            right: '0.7rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            fontSize: '0.7rem',
                            color: 'var(--text-muted)'
                        }}>
                            ▼
                        </div>
                    </div>

                    <Link href="/ruler" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                        {t.header.openRuler}
                    </Link>
                </nav>
            </div>
        </header>
    );
}
