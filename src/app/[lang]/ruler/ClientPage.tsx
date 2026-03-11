'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaCog, FaRulerCombined, FaRedo } from 'react-icons/fa';
import InteractiveRuler from '../../../components/InteractiveRuler';
import CalibrationModal from '../../../components/CalibrationModal';
import { useLanguage } from '../../../context/LanguageContext';

export default function RulerPage() {
    const { t, language, setLanguage } = useLanguage();
    const [unit, setUnit] = useState<'cm' | 'inch'>('cm');
    const [showCalibration, setShowCalibration] = useState(false);
    const [ppi, setPpi] = useState(96);
    const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
    const [activeTab, setActiveTab] = useState<'record' | 'settings' | 'qna'>('record');

    // Flipped State (for ticks)
    // Horizontal: below header -> Ticks Bottom (default for InteractiveRuler is Bottom/Right if !isFlipped?)
    // Let's check InteractiveRuler defaults.
    // InteractiveRuler Marker State Hoisting
    const [markers, setMarkers] = useState<{ id: number, pos: number, color: string }[]>([]);

    // Vertical: below header (Left side) -> Ticks Right (measuring content to right?)
    // InteractiveRuler: !isHorizontal -> isFlipped ? flex-start (Left) : flex-end (Right).
    // so for Right Ticks, we want isFlipped = false.
    const [isFlipped, setIsFlipped] = useState(false);

    // Update Header position & Flipped state based on orientation
    useEffect(() => {
        let newHeaderPos: 'top' | 'bottom';
        let newIsFlipped = false;

        if (orientation === 'horizontal') {
            // Horizontal Mode: Ruler at TOP.
            // Header should be at BOTTOM to avoid overlap - WAIT, user said "Fixed at Top" in previous step.
            // "헤더를 하단으로 이동하는 것도 제거하고 헤더 아래에 고정되도록 수정" -> Header Fixed at Top.
            // So headerPos is unused or always 'top'.
            newHeaderPos = 'top';

            // User requested ticks inversion.
            // Horizontal: previously false (Bottom). Now true (Top).
            newIsFlipped = true;
        } else {
            // Vertical Mode: Ruler at LEFT.
            // Header Fixed at Top.
            newHeaderPos = 'top';

            // User requested ticks inversion.
            // Vertical: previously false (Right). Now true (Left).
            newIsFlipped = true;
        }

        // setHeaderPos(newHeaderPos); // headerPos state removed in logic but might still be there??
        // Wait, I removed the state usage in the JSX in the previous step but maybe didn't remove the state definition?
        // Let's just set isFlipped.
        setIsFlipped(newIsFlipped);
        // And remove headerPos logic if it's dead.

    }, [orientation]);

    useEffect(() => {
        const savedPPI = localStorage.getItem('rulerhero-ppi');
        if (savedPPI) {
            setPpi(parseFloat(savedPPI));
        }
    }, []);

    const saveCalibration = (newPPI: number) => {
        setPpi(newPPI);
        localStorage.setItem('rulerhero-ppi', newPPI.toString());
    };

    const toggleOrientation = () => {
        const newOrientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';
        setOrientation(newOrientation);
        // isFlipped stays false for both as per above logic
    };

    const buttonStyle: React.CSSProperties = {
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        color: '#fff',
        fontSize: '0.8rem',
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background 0.2s',
        whiteSpace: 'nowrap'
    };

    // Simple Toggle Switch Component (Compact)
    const ToggleSwitch = ({ title, desc, value, onChange }: { // Removed 'options' prop as text is gone
        title: string,
        desc: string,
        value: boolean,
        onChange: () => void
    }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem' }}>
                <span style={{ fontSize: '1rem', color: '#222', fontWeight: 600 }}>{title}</span>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>{desc}</span>
            </div>
            <div
                onClick={onChange}
                style={{
                    width: '40px', // Compact Width
                    height: '20px', // Compact Height
                    background: value ? '#6366f1' : '#e0e0e0', // Color indication (Active/Inactive)
                    borderRadius: '16px',
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                    flexShrink: 0,
                    transition: 'background 0.3s'
                }}
            >
                {/* Sliding Knob */}
                <div style={{
                    width: '16px',
                    height: '16px',
                    background: '#fff',
                    borderRadius: '50%', // Circle
                    position: 'absolute',
                    left: value ? '22px' : '2px', // Slide logic (52 - 28 - 2 = 22)
                    transition: 'left 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    zIndex: 0
                }} />
            </div>
        </div>
    );

    const headerHeight = '66px'; // Define header height for consistent calculations

    return (
        <main style={{
            width: '100vw',
            height: '100dvh',
            background: '#f0f0f0',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
            // touchAction: 'none' REMOVED to allow pull-to-refresh
        }}>

            <CalibrationModal
                isOpen={showCalibration}
                onClose={() => setShowCalibration(false)}
                onSave={saveCalibration}
                initialPPI={ppi}
            />

            {/* Fixed Header at Top */}
            <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0, // Always Top
                padding: '1rem',
                background: 'rgba(18, 18, 22, 0.95)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                zIndex: 50,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link href={`/${language}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.9rem', opacity: 0.8 }}>
                        <FaArrowLeft />
                    </Link>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    {/* Language Selector - Matches Header.tsx style */}
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
                            right: '0.5rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            fontSize: '0.7rem',
                            color: 'rgba(255,255,255,0.6)'
                        }}>
                            ▼
                        </div>
                    </div>

                    <button
                        onClick={() => setShowCalibration(true)}
                        className="btn"
                        style={buttonStyle}
                    >
                        <FaCog />
                        <span>{t.ruler.calibrate}</span>
                    </button>

                </div>
            </div>

            {/* Centered Controls with Tabs */}
            <div style={{
                position: 'absolute',

                // Dynamic Centering Logic
                top: orientation === 'horizontal' ? 'calc(50% + 25px)' : '50%',
                left: orientation === 'vertical' ? 'calc(50% + 25px)' : '50%',

                transform: 'translate(-50%, -50%)',
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(10px)',
                width: '90%',
                maxWidth: '400px',
                overflow: 'hidden'
            }}>
                {/* Tabs Header */}
                <div style={{
                    display: 'flex',
                    borderBottom: '1px solid #ddd',
                    background: '#fafafa'
                }}>
                    <button
                        onClick={() => setActiveTab('record')}
                        style={{
                            flex: 1,
                            padding: '1rem 0',
                            border: 'none',
                            background: activeTab === 'record' ? '#fff' : 'transparent',
                            color: activeTab === 'record' ? '#6366f1' : '#666',
                            fontWeight: activeTab === 'record' ? 700 : 500,
                            borderBottom: activeTab === 'record' ? '2px solid #6366f1' : '2px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '0.9rem'
                        }}
                    >
                        {t.ruler.tabs?.record || '기록'}
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        style={{
                            flex: 1,
                            padding: '1rem 0',
                            border: 'none',
                            background: activeTab === 'settings' ? '#fff' : 'transparent',
                            color: activeTab === 'settings' ? '#6366f1' : '#666',
                            fontWeight: activeTab === 'settings' ? 700 : 500,
                            borderBottom: activeTab === 'settings' ? '2px solid #6366f1' : '2px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '0.9rem'
                        }}
                    >
                        {t.ruler.tabs?.settings || '설정'}
                    </button>
                    <button
                        onClick={() => setActiveTab('qna')}
                        style={{
                            flex: 1,
                            padding: '1rem 0',
                            border: 'none',
                            background: activeTab === 'qna' ? '#fff' : 'transparent',
                            color: activeTab === 'qna' ? '#6366f1' : '#666',
                            fontWeight: activeTab === 'qna' ? 700 : 500,
                            borderBottom: activeTab === 'qna' ? '2px solid #6366f1' : '2px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '0.9rem'
                        }}
                    >
                        {t.ruler.tabs?.faq || 'FAQ'}
                    </button>
                </div>

                {/* Tab Content */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {activeTab === 'settings' && (
                        <>
                            <ToggleSwitch
                                title={t.ruler.controls.position.title}
                                desc={t.ruler.controls.position.desc}
                                value={orientation === 'vertical'}
                                onChange={toggleOrientation}
                            />

                            <ToggleSwitch
                                title={t.ruler.controls.unit.title}
                                desc={t.ruler.controls.unit.desc}
                                value={unit === 'inch'}
                                onChange={() => setUnit(unit === 'cm' ? 'inch' : 'cm')}
                            />

                            <ToggleSwitch
                                title={t.ruler.controls.tick.title}
                                desc={t.ruler.controls.tick.desc}
                                value={isFlipped}
                                onChange={() => setIsFlipped(!isFlipped)}
                            />
                        </>
                    )}

                    {activeTab === 'record' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {/* Current Markers List - Grid View */}
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: '1fr 1fr',
                                gap: '0.6rem',
                                maxHeight: '180px',
                                overflowY: 'auto',
                                paddingRight: '0.5rem',
                                alignContent: 'start'
                            }}>
                                {markers.length === 0 ? (
                                    <div style={{ gridColumn: '1 / -1', color: '#888', fontSize: '0.9rem', textAlign: 'center', padding: '1rem 0' }}>
                                        {t.ruler.record?.empty || '측정된 기록이 없습니다.'}
                                    </div>
                                ) : (
                                    markers.map((marker, index) => {
                                        const value = unit === 'cm' 
                                            ? (marker.pos / (ppi / 2.54)).toFixed(2) + ' cm'
                                            : (marker.pos / ppi).toFixed(2) + ' in';
                                        
                                        return (
                                            <div key={marker.id} style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'space-between',
                                                background: '#f8f9fa',
                                                padding: '0.5rem 0.8rem',
                                                borderRadius: '8px',
                                                borderLeft: `3px solid ${marker.color}`
                                            }}>
                                                <span style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>#{index + 1}</span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                    <span style={{ fontWeight: 700, color: '#222', fontSize: '0.95rem' }}>{value}</span>
                                                    {/* Delete Button */}
                                                    <button 
                                                        onClick={() => setMarkers(prev => prev.filter(m => m.id !== marker.id))}
                                                        style={{ 
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: '16px', 
                                                            height: '16px', 
                                                            borderRadius: '50%', 
                                                            background: marker.color,
                                                            color: 'white',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            fontSize: '0.6rem',
                                                            padding: 0,
                                                            lineHeight: 1
                                                        }}
                                                        title="마커 삭제"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Divider */}
                            <div style={{ height: '1px', background: '#eee', width: '100%' }} />

                            {/* Brief Instructions */}
                            <div style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.5, background: 'rgba(99, 102, 241, 0.05)', padding: '0.8rem', borderRadius: '8px' }}>
                                {t.ruler.record?.guide ? (
                                    <span dangerouslySetInnerHTML={{ __html: t.ruler.record.guide }} />
                                ) : (
                                    <span><strong>💡 안내:</strong> 화면의 빈 곳을 터치하여 마커를 추가하고, 선을 드래그하여 조정하세요.</span>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'qna' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '250px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '0.8rem' }}>
                                <p style={{ fontWeight: 600, color: '#333', margin: '0 0 0.3rem 0', fontSize: '0.9rem' }}>{t.ruler.faq?.q1?.q || 'Q. 화면의 길이가 실제와 같은가요?'}</p>
                                <p style={{ color: '#666', margin: 0, fontSize: '0.85rem', lineHeight: 1.5 }}>
                                    {t.ruler.faq?.q1?.a || 'A. 네, 모니터/화면의 물리적 픽셀 밀도(PPI)를 기준으로 브라우저에서 계산되므로 매우 정확합니다. 브라우저의 줌(Zoom) 설정이 100%인지 확인해 주세요.'}
                                </p>
                            </div>
                            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '0.8rem' }}>
                                <p style={{ fontWeight: 600, color: '#333', margin: '0 0 0.3rem 0', fontSize: '0.9rem' }}>{t.ruler.faq?.q2?.q || 'Q. 여러 물건의 길이를 어떻게 재나요?'}</p>
                                <p style={{ color: '#666', margin: 0, fontSize: '0.85rem', lineHeight: 1.5 }}>
                                    {t.ruler.faq?.q2?.a || 'A. 화면의 빈 공간이나 자의 눈금을 가볍게 터치(클릭)하면 여러 개의 마커 선이 생성됩니다. 좌우/상하로 드래그하여 쉽게 길이를 맞출 수 있습니다.'}
                                </p>
                            </div>
                            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '0.8rem' }}>
                                <p style={{ fontWeight: 600, color: '#333', margin: '0 0 0.3rem 0', fontSize: '0.9rem' }}>{t.ruler.faq?.q3?.q || 'Q. 기록된 마커는 어떻게 지우나요?'}</p>
                                <p style={{ color: '#666', margin: 0, fontSize: '0.85rem', lineHeight: 1.5 }}>
                                    {t.ruler.faq?.q3?.a || 'A. 마커 라벨 바로 아래(혹은 우측)에 있는 동그란 ✕(엑스) 버튼을 누르거나, 위쪽 [기록] 탭 리스트에 있는 ✕ 버튼을 누르면 즉시 지워집니다.'}
                                </p>
                            </div>
                            <div>
                                <p style={{ fontWeight: 600, color: '#333', margin: '0 0 0.3rem 0', fontSize: '0.9rem' }}>{t.ruler.faq?.q4?.q || 'Q. 모바일 스마트폰에서도 측정이 가능한가요?'}</p>
                                <p style={{ color: '#666', margin: 0, fontSize: '0.85rem', lineHeight: 1.5 }}>
                                    {t.ruler.faq?.q4?.a || 'A. 네, 스마트폰 화면 위에 물건(카드, 동전 등)을 올리고 손가락으로 마커 라벨을 가볍게 터치한 채 드래그하여 측정하실 수 있습니다.'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Ruler Container Area */}
            <div
                style={{
                    position: 'absolute',
                    top: '66px',
                    left: 0,

                    // Size depends on orientation
                    width: orientation === 'horizontal' ? '100%' : '50px',

                    // If horizontal, height is fixed 50px
                    // If vertical, height is rest of screen
                    height: orientation === 'horizontal' ? '50px' : 'calc(100% - 66px)',

                    pointerEvents: 'auto' // Re-enable pointer events for possible ruler interactions if any (tooltips etc)
                }}
            >
                <div style={{ width: '100%', height: '100%' }}>
                    <InteractiveRuler
                        unit={unit}
                        ppi={ppi}
                        orientation={orientation}
                        isFlipped={isFlipped}
                        markers={markers}
                        setMarkers={setMarkers}
                    />
                </div>
            </div>
        </main >
    );
}
