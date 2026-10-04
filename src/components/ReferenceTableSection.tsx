'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaTable, FaCreditCard, FaFileAlt, FaCoins, FaDesktop } from 'react-icons/fa';

const I18N_REF: Record<string, {
    badge: string;
    title: string;
    subtitle: string;
    tabCards: string;
    tabPaper: string;
    tabCoins: string;
    tabDisplay: string;
    colName: string;
    colStd: string;
    colMm: string;
    colCm: string;
    colIn: string;
    colType: string;
    colSize: string;
    colRes: string;
    colPpi: string;
    colCountry: string;
    colThickness: string;
}> = {
    ko: {
        badge: '수치 참고표',
        title: '표준 규격 및 물체 크기 수치표',
        subtitle: '신용카드, ISO 종이, 주요 동전 및 디스플레이 PPI 규격표를 확인하세요.',
        tabCards: '신용카드 & 신분증',
        tabPaper: '종이 규격 (A4/B5/Letter)',
        tabCoins: '주요 동전 직경',
        tabDisplay: '디스플레이 PPI',
        colName: '물체 명칭', colStd: '표준 규격', colMm: '밀리미터 (mm)', colCm: '센티미터 (cm)', colIn: '인치 (inch)',
        colType: '기기 유형', colSize: '화면 크기', colRes: '해상도', colPpi: '평균 PPI',
        colCountry: '국가/지역', colThickness: '두께 (mm)'
    },
    en: {
        badge: 'QUICK REFERENCE TABLES',
        title: 'Standard Dimensions & Reference Tables',
        subtitle: 'Look up exact physical dimensions for credit cards, ISO paper standards, coins, and screen PPI values.',
        tabCards: 'Credit Cards & IDs',
        tabPaper: 'Paper Sizes (ISO/ANSI)',
        tabCoins: 'Coin Diameters',
        tabDisplay: 'Display PPI Standards',
        colName: 'Object Name', colStd: 'Standard', colMm: 'Millimeters (mm)', colCm: 'Centimeters (cm)', colIn: 'Inches (in)',
        colType: 'Device Category', colSize: 'Screen Size', colRes: 'Resolution', colPpi: 'Average PPI',
        colCountry: 'Country/Region', colThickness: 'Thickness (mm)'
    },
    zh: {
        badge: '速查参考表',
        title: '标准规格与实物尺寸对照表',
        subtitle: '查询信用卡、ISO 纸张标准、常见硬币及屏幕 PPI 的精确物理尺寸。',
        tabCards: '信用卡与身份证',
        tabPaper: '纸张规格 (A4/B5/Letter)',
        tabCoins: '常见硬币直径',
        tabDisplay: '显示屏 PPI 标准',
        colName: '物品名称', colStd: '标准规范', colMm: '毫米 (mm)', colCm: '厘米 (cm)', colIn: '英寸 (inch)',
        colType: '设备类型', colSize: '屏幕尺寸', colRes: '分辨率', colPpi: '平均 PPI',
        colCountry: '国家/地区', colThickness: '厚度 (mm)'
    },
    ja: {
        badge: '寸法参照表',
        title: '標準規格・実寸サイズ参照表',
        subtitle: 'クレジットカード、ISO用紙規格、主要硬貨、画面PPIの正確な実寸を確認できます。',
        tabCards: 'カード・身分証',
        tabPaper: '用紙サイズ (A4/B5/Letter)',
        tabCoins: '主要硬貨の直径',
        tabDisplay: 'ディスプレイ PPI',
        colName: '名称', colStd: '標準規格', colMm: 'ミリメートル (mm)', colCm: 'センチメートル (cm)', colIn: 'インチ (inch)',
        colType: 'デバイス種別', colSize: '画面サイズ', colRes: '解像度', colPpi: '平均 PPI',
        colCountry: '国・地域', colThickness: '厚さ (mm)'
    },
    es: {
        badge: 'TABLAS DE REFERENCIA',
        title: 'Tabla de Dimensiones Estándar y Referencias',
        subtitle: 'Consulte dimensiones físicas exactas de tarjetas, papel ISO, monedas y valores PPI.',
        tabCards: 'Tarjetas de Crédito e IDs',
        tabPaper: 'Tamaños de Papel (ISO/ANSI)',
        tabCoins: 'Diámetro de Monedas',
        tabDisplay: 'Estándares PPI',
        colName: 'Objeto', colStd: 'Estándar', colMm: 'Milímetros (mm)', colCm: 'Centímetros (cm)', colIn: 'Pulgadas (in)',
        colType: 'Dispositivo', colSize: 'Tamaño de Pantalla', colRes: 'Resolución', colPpi: 'PPI Promedio',
        colCountry: 'País/Región', colThickness: 'Grosor (mm)'
    },
    hi: {
        badge: 'त्वरित संदर्भ तालिका',
        title: 'मानक आयाम और संदर्भ तालिकाएं',
        subtitle: 'क्रेडिट कार्ड, ISO कागज़, सिक्के और स्क्रीन PPI के सटीक आयाम देखें।',
        tabCards: 'क्रेडिट कार्ड और आईडी',
        tabPaper: 'कागज़ के आकार (ISO/ANSI)',
        tabCoins: 'सिक्कों के व्यास',
        tabDisplay: 'स्क्रीन PPI मानक',
        colName: 'वस्तु का नाम', colStd: 'मानक', colMm: 'मिलीमीटर (mm)', colCm: 'सेंटीमीटर (cm)', colIn: 'इंच (in)',
        colType: 'डिवाइस श्रेणी', colSize: 'स्क्रीन का आकार', colRes: 'रेजोल्यूशन', colPpi: 'औसत PPI',
        colCountry: 'देश/क्षेत्र', colThickness: 'मोटाई (mm)'
    },
    fr: {
        badge: 'TABLEAUX DE RÉFÉRENCE',
        title: 'Tableaux des Dimensions et Références Standards',
        subtitle: 'Consultez les dimensions physiques exactes des cartes, papiers ISO, pièces et valeurs PPI.',
        tabCards: 'Cartes de Crédit et IDs',
        tabPaper: 'Formats de Papier (ISO/ANSI)',
        tabCoins: 'Diamètre des Pièces',
        tabDisplay: 'Normes PPI',
        colName: 'Nom de l\'Objet', colStd: 'Norme', colMm: 'Millimètres (mm)', colCm: 'Centimètres (cm)', colIn: 'Pouces (in)',
        colType: 'Catégorie', colSize: 'Taille d\'Écran', colRes: 'Résolution', colPpi: 'PPI Moyen',
        colCountry: 'Pays/Région', colThickness: 'Épaisseur (mm)'
    },
    ar: {
        badge: 'جداول مرجعية سريعة',
        title: 'الأبعاد القياسية والجداول المرجعية',
        subtitle: 'ابحث عن الأبعاد الفعالية لبطاقات الائتمان والورق والعملات وقيم PPI.',
        tabCards: 'بطاقات الائتمان والهويات',
        tabPaper: 'أحجام الورق (ISO/ANSI)',
        tabCoins: 'أقطار العملات',
        tabDisplay: 'معايير PPI الشاشة',
        colName: 'اسم الشيء', colStd: 'المعيار', colMm: 'مليمتر (mm)', colCm: 'سنتيمتر (cm)', colIn: 'بوصة (in)',
        colType: 'فئة الجهاز', colSize: 'حجم الشاشة', colRes: 'الدقة', colPpi: 'متوسط PPI',
        colCountry: 'البلد/المنطقة', colThickness: 'السمك (mm)'
    },
    ru: {
        badge: 'СПРАВОЧНЫЕ ТАБЛИЦЫ',
        title: 'Стандартные Размеры и Справочные Таблицы',
        subtitle: 'Справочник точных физических размеров карт, бумаги ISO, монет и значений PPI.',
        tabCards: 'Кредитные Карты и ID',
        tabPaper: 'Размеры Бумаги (ISO/ANSI)',
        tabCoins: 'Диаметры Монет',
        tabDisplay: 'Стандарты PPI Экран',
        colName: 'Название предмета', colStd: 'Стандарт', colMm: 'Миллиметры (мм)', colCm: 'Сантиметры (см)', colIn: 'Дюймы (in)',
        colType: 'Категория устройства', colSize: 'Диагональ', colRes: 'Разрешение', colPpi: 'Среднее PPI',
        colCountry: 'Страна/Регион', colThickness: 'Толщина (мм)'
    }
};

export default function ReferenceTableSection() {
    const { language } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<'cards' | 'paper' | 'coins' | 'display'>('cards');
    const tSection = I18N_REF[language] || I18N_REF.en;

    return (
        <section id="reference-tables" style={{ padding: '6rem 0', background: '#0c0c0e' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.4rem 1rem',
                        borderRadius: '20px',
                        background: 'rgba(56, 189, 248, 0.1)',
                        color: '#38bdf8',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        marginBottom: '1rem'
                    }}>
                        <FaTable />
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

                {/* Tab Controls */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    marginBottom: '2.5rem'
                }}>
                    <TabButton
                        active={activeCategory === 'cards'}
                        onClick={() => setActiveCategory('cards')}
                        icon={<FaCreditCard />}
                        label={tSection.tabCards}
                    />
                    <TabButton
                        active={activeCategory === 'paper'}
                        onClick={() => setActiveCategory('paper')}
                        icon={<FaFileAlt />}
                        label={tSection.tabPaper}
                    />
                    <TabButton
                        active={activeCategory === 'coins'}
                        onClick={() => setActiveCategory('coins')}
                        icon={<FaCoins />}
                        label={tSection.tabCoins}
                    />
                    <TabButton
                        active={activeCategory === 'display'}
                        onClick={() => setActiveCategory('display')}
                        icon={<FaDesktop />}
                        label={tSection.tabDisplay}
                    />
                </div>

                {/* Table Content Container */}
                <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
                    {activeCategory === 'cards' && (
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0', textAlign: 'left', minWidth: '500px' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border)', color: '#fff' }}>
                                    <th style={{ padding: '1rem' }}>{tSection.colName}</th>
                                    <th style={{ padding: '1rem' }}>{tSection.colStd}</th>
                                    <th style={{ padding: '1rem' }}>{tSection.colMm}</th>
                                    <th style={{ padding: '1rem' }}>{tSection.colCm}</th>
                                    <th style={{ padding: '1rem' }}>{tSection.colIn}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>Standard Credit / Debit Card</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>ISO/IEC 7810 ID-1</td>
                                    <td style={{ padding: '1rem' }}>85.60 × 53.98 mm</td>
                                    <td style={{ padding: '1rem' }}>8.56 × 5.40 cm</td>
                                    <td style={{ padding: '1rem' }}>3.37 × 2.12 in</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>Driver&apos;s License / ID Card</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>ISO/IEC 7810 ID-1</td>
                                    <td style={{ padding: '1rem' }}>85.60 × 53.98 mm</td>
                                    <td style={{ padding: '1rem' }}>8.56 × 5.40 cm</td>
                                    <td style={{ padding: '1rem' }}>3.37 × 2.12 in</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>East Asia Business Card</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>Standard Business Card</td>
                                    <td style={{ padding: '1rem' }}>90.00 × 50.00 mm</td>
                                    <td style={{ padding: '1rem' }}>9.00 × 5.00 cm</td>
                                    <td style={{ padding: '1rem' }}>3.54 × 1.97 in</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>US Business Card</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>US Standard</td>
                                    <td style={{ padding: '1rem' }}>88.90 × 50.80 mm</td>
                                    <td style={{ padding: '1rem' }}>8.89 × 5.08 cm</td>
                                    <td style={{ padding: '1rem' }}>3.50 × 2.00 in</td>
                                </tr>
                            </tbody>
                        </table>
                    )}

                    {activeCategory === 'paper' && (
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0', textAlign: 'left', minWidth: '500px' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border)', color: '#fff' }}>
                                    <th style={{ padding: '1rem' }}>Format</th>
                                    <th style={{ padding: '1rem' }}>{tSection.colStd}</th>
                                    <th style={{ padding: '1rem' }}>{tSection.colMm}</th>
                                    <th style={{ padding: '1rem' }}>{tSection.colCm}</th>
                                    <th style={{ padding: '1rem' }}>{tSection.colIn}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>A3</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>ISO 216 Series A</td>
                                    <td style={{ padding: '1rem' }}>297 × 420 mm</td>
                                    <td style={{ padding: '1rem' }}>29.7 × 42.0 cm</td>
                                    <td style={{ padding: '1rem' }}>11.7 × 16.5 in</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(99,102,241,0.08)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>A4 (Standard)</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>ISO 216 Series A</td>
                                    <td style={{ padding: '1rem' }}>210 × 297 mm</td>
                                    <td style={{ padding: '1rem' }}>21.0 × 29.7 cm</td>
                                    <td style={{ padding: '1rem' }}>8.3 × 11.7 in</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>A5</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>ISO 216 Series A</td>
                                    <td style={{ padding: '1rem' }}>148 × 210 mm</td>
                                    <td style={{ padding: '1rem' }}>14.8 × 21.0 cm</td>
                                    <td style={{ padding: '1rem' }}>5.8 × 8.3 in</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>B5</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>ISO 216 Series B</td>
                                    <td style={{ padding: '1rem' }}>176 × 250 mm</td>
                                    <td style={{ padding: '1rem' }}>17.6 × 25.0 cm</td>
                                    <td style={{ padding: '1rem' }}>6.9 × 9.8 in</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>US Letter</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>ANSI / N. America</td>
                                    <td style={{ padding: '1rem' }}>215.9 × 279.4 mm</td>
                                    <td style={{ padding: '1rem' }}>21.59 × 27.94 cm</td>
                                    <td style={{ padding: '1rem' }}>8.5 × 11.0 in</td>
                                </tr>
                            </tbody>
                        </table>
                    )}

                    {activeCategory === 'coins' && (
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0', textAlign: 'left', minWidth: '500px' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border)', color: '#fff' }}>
                                    <th style={{ padding: '1rem' }}>{tSection.colName}</th>
                                    <th style={{ padding: '1rem' }}>{tSection.colCountry}</th>
                                    <th style={{ padding: '1rem' }}>{tSection.colMm}</th>
                                    <th style={{ padding: '1rem' }}>{tSection.colCm}</th>
                                    <th style={{ padding: '1rem' }}>{tSection.colThickness}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>KRW 500 Coin</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>Korea (KRW)</td>
                                    <td style={{ padding: '1rem' }}>26.50 mm</td>
                                    <td style={{ padding: '1rem' }}>2.65 cm</td>
                                    <td style={{ padding: '1rem' }}>2.00 mm</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>KRW 100 Coin</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>Korea (KRW)</td>
                                    <td style={{ padding: '1rem' }}>24.00 mm</td>
                                    <td style={{ padding: '1rem' }}>2.40 cm</td>
                                    <td style={{ padding: '1rem' }}>1.90 mm</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>US Quarter (25¢)</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>USA (USD)</td>
                                    <td style={{ padding: '1rem' }}>24.26 mm</td>
                                    <td style={{ padding: '1rem' }}>2.43 cm</td>
                                    <td style={{ padding: '1rem' }}>1.75 mm</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>2 Euro (€2)</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>European Union (EUR)</td>
                                    <td style={{ padding: '1rem' }}>25.75 mm</td>
                                    <td style={{ padding: '1rem' }}>2.58 cm</td>
                                    <td style={{ padding: '1rem' }}>2.20 mm</td>
                                </tr>
                            </tbody>
                        </table>
                    )}

                    {activeCategory === 'display' && (
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0', textAlign: 'left', minWidth: '500px' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border)', color: '#fff' }}>
                                    <th style={{ padding: '1rem' }}>{tSection.colType}</th>
                                    <th style={{ padding: '1rem' }}>{tSection.colSize}</th>
                                    <th style={{ padding: '1rem' }}>{tSection.colRes}</th>
                                    <th style={{ padding: '1rem' }}>{tSection.colPpi}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>Full HD Desktop Monitor</td>
                                    <td style={{ padding: '1rem' }}>24 Inch</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>1920 × 1080 (FHD)</td>
                                    <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--primary)' }}>91.79 PPI</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>QHD Desktop Monitor</td>
                                    <td style={{ padding: '1rem' }}>27 Inch</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>2560 × 1440 (QHD)</td>
                                    <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--primary)' }}>108.79 PPI</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>MacBook Air 13</td>
                                    <td style={{ padding: '1rem' }}>13.6 Inch</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>2560 × 1664 (Retina)</td>
                                    <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--primary)' }}>224.5 PPI</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>iPhone 15 Pro</td>
                                    <td style={{ padding: '1rem' }}>6.1 Inch</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>2556 × 1179 (Super Retina)</td>
                                    <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--primary)' }}>460.0 PPI</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </section>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.25rem',
                borderRadius: '12px',
                border: active ? '1px solid var(--primary)' : '1px solid var(--border)',
                background: active ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: active ? '#fff' : 'var(--text-muted)',
                fontWeight: active ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.9rem'
            }}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}
