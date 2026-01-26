'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
    const { t, language } = useLanguage();

    return (
        <footer style={{
            padding: '2rem 0',
            borderTop: '1px solid var(--border)',
            marginTop: 'auto',
            background: 'var(--surface)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.9rem'
            }}>
                <div>
                    {t.home.footer}
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link href={`/${language}/privacy`} className="footer-link">
                        {t.footerLinks.privacy}
                    </Link>
                    <Link href={`/${language}/terms`} className="footer-link">
                        {t.footerLinks.terms}
                    </Link>
                </div>
            </div>
        </footer>
    );
}
