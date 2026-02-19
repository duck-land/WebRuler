
'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useLanguage } from '../../../context/LanguageContext';
import { IoMailOutline } from "react-icons/io5";

export default function ContactPage() {
    const { t } = useLanguage();

    return (
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />

            <div className="container" style={{ flex: 1, padding: '120px 20px 60px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        marginBottom: '2rem',
                        background: 'linear-gradient(to right, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-1px'
                    }}>
                        {t.contact.title}
                    </h1>

                    <div className="glass-panel" style={{ padding: '2.5rem' }}>
                        <p style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.6',
                            color: 'var(--text-muted)',
                            marginBottom: '2rem'
                        }}>
                            {t.contact.desc}
                        </p>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1.5rem',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '12px',
                            border: '1px solid var(--border)'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: 'rgba(56, 189, 248, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#38bdf8'
                            }}>
                                <IoMailOutline size={24} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    {t.contact.email}
                                </span>
                                <a href="mailto:saitsiot3@gamil.com" style={{
                                    fontSize: '1.1rem',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    fontWeight: 600
                                }}>
                                    saitsiot3@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
