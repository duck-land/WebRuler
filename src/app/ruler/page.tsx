'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaCog, FaRulerCombined, FaRedo } from 'react-icons/fa';
import InteractiveRuler from '../../components/InteractiveRuler';
import CalibrationModal from '../../components/CalibrationModal';
import { useLanguage } from '../../context/LanguageContext';

export default function RulerPage() {
    const { t, language, setLanguage } = useLanguage();
    const [unit, setUnit] = useState<'cm' | 'inch'>('cm');
    const [showCalibration, setShowCalibration] = useState(false);
    const [ppi, setPpi] = useState(96);
    const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');

    // Flipped State (for ticks)
    // Horizontal: below header -> Ticks Bottom (default for InteractiveRuler is Bottom/Right if !isFlipped?)
    // Let's check InteractiveRuler defaults.
    // InteractiveRuler: isHorizontal -> isFlipped ? flex-start (Top) : flex-end (Bottom).
    // so for Bottom Ticks, we want isFlipped = false.

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
        const savedPPI = localStorage.getItem('web-ruler-ppi');
        if (savedPPI) {
            setPpi(parseFloat(savedPPI));
        }
    }, []);

    const saveCalibration = (newPPI: number) => {
        setPpi(newPPI);
        localStorage.setItem('web-ruler-ppi', newPPI.toString());
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
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.9rem', opacity: 0.8 }}>
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
                    </button>

                </div>
            </div>

            {/* Centered Controls */}
            <div style={{
                position: 'absolute',

                // Dynamic Centering Logic
                // If Horizontal: Ruler is Top (50px). Center should be (50% + 25px) from Top.
                // If Vertical: Ruler is Left (50px). Center should be (50% + 25px) from Left.
                // Assuming we want to center in the *remaining* space.
                top: orientation === 'horizontal' ? 'calc(50% + 25px)' : '50%',
                left: orientation === 'vertical' ? 'calc(50% + 25px)' : '50%',

                transform: 'translate(-50%, -50%)',
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                padding: '1rem',
                width: '90%',
                maxWidth: '400px'
            }}>
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
                    />
                </div>
            </div>
        </main >
    );
}
