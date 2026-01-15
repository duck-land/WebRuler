'use client';

import Header from '../components/Header';
import Link from 'next/link';
import { FaCompressArrowsAlt, FaMobileAlt, FaDraftingCompass } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* Hero Section */}
      <section style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Abstract */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
          opacity: 0.2,
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: '4.5rem',
            lineHeight: 1.1,
            background: 'linear-gradient(to right, #fff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1.5rem',
            letterSpacing: '-2px'
          }} dangerouslySetInnerHTML={{ __html: t.home.heroTitle }} />

          <p style={{
            fontSize: '1.25rem',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}>
            {t.home.heroDesc}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/ruler" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
              {t.home.startMeasuring}
            </Link>
            <Link href="/how-it-works" className="btn" style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              fontSize: '1.1rem',
              padding: '1rem 2.5rem',
              color: '#fff'
            }}>
              {t.home.howItWorks}
            </Link>
          </div>

          {/* Decorative Ruler Graphic */}
          <div style={{
            marginTop: '5rem',
            height: '100px',
            background: 'linear-gradient(to bottom, #1c1c22, transparent)',
            borderTop: '2px solid var(--primary)',
            position: 'relative',
            maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
          }}>
            {/* Simple tick marks simulation */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '20px',
              backgroundImage: 'linear-gradient(to right, var(--text-muted) 1px, transparent 1px)',
              backgroundSize: '20px 100%',
              opacity: 0.3
            }} />
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '10px',
              backgroundImage: 'linear-gradient(to right, var(--text-muted) 1px, transparent 1px)',
              backgroundSize: '4px 100%',
              opacity: 0.2
            }} />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{ padding: '6rem 0', background: '#0f0f12' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <FeatureCard
              icon={<FaDraftingCompass size={24} color="var(--primary)" />}
              title={t.home.features.accuracy.title}
              desc={t.home.features.accuracy.desc}
            />
            <FeatureCard
              icon={<FaCompressArrowsAlt size={24} color="var(--accent)" />}
              title={t.home.features.units.title}
              desc={t.home.features.units.desc}
            />
            <FeatureCard
              icon={<FaMobileAlt size={24} color="#38bdf8" />}
              title={t.home.features.mobile.title}
              desc={t.home.features.mobile.desc}
            />
          </div>
        </div>
      </section>

      <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {t.home.footer}</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{
        width: '48px', height: '48px',
        borderRadius: '12px', background: 'rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{desc}</p>
    </div>
  );
}
