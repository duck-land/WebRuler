'use client';

import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaCheck, FaTimes, FaMinus, FaPlus, FaDesktop } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

interface CalibrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (ppi: number) => void;
    initialPPI: number;
}

export default function CalibrationModal({ isOpen, onClose, onSave, initialPPI }: CalibrationModalProps) {
    const { t } = useLanguage();
    // Standard credit card width is 85.60 mm = 3.370 inches
    const CARD_WIDTH_MM = 85.60;
    const CARD_WIDTH_INCH = 3.370;

    // We track the pixel width of the on-screen card
    const [pixels, setPixels] = useState(0);

    // New Tab State - Default to Monitor, Monitor on Left
    const [activeTab, setActiveTab] = useState<'monitor' | 'card'>('monitor');
    const [monitorSize, setMonitorSize] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Initialize with current PPI
            setPixels(Math.round(CARD_WIDTH_INCH * initialPPI));
            setMonitorSize('');
        }
    }, [isOpen, initialPPI]);

    const handleSave = () => {
        if (activeTab === 'card') {
            const newPPI = pixels / CARD_WIDTH_INCH;
            onSave(newPPI);
        } else {
            const size = parseFloat(monitorSize);
            if (!size || size <= 0) {
                alert('Please enter a valid monitor size.');
                return;
            }
            const screenDiagonalPixels = Math.sqrt(window.screen.width ** 2 + window.screen.height ** 2);
            // PPI = Diagonal Pixels / Diagonal Inches
            const newPPI = screenDiagonalPixels / size;
            onSave(newPPI);
        }
        onClose();
    };

    if (!isOpen) return null;

    // Helper for Tab Styling to match the Dark/Glass theme
    const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
        flex: 1,
        padding: '0.6rem',
        borderRadius: '8px',
        background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
        color: isActive ? 'white' : 'var(--text-muted, #888)',
        border: 'none',
        cursor: 'pointer',
        fontWeight: isActive ? 600 : 400,
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontSize: '0.9rem'
    });

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'flex-start', // Helper anchor at top
            justifyContent: 'center',
            backdropFilter: 'blur(5px)',
            paddingTop: '7vh', // Fixed top offset
            overflowY: 'auto'
        }}>
            <div className="glass-panel" style={{
                width: '90%',
                maxWidth: '500px',
                padding: '1.5rem', // Reduced from 2rem
                background: '#1c1c22',
                border: '1px solid var(--border)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ color: 'white', marginBottom: '1rem' }}>{t.calibration.title}</h2>

                    {/* TAB NAVIGATION - Moved below Title */}
                    <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '4px', marginBottom: '1rem' }}>
                        <button style={tabButtonStyle(activeTab === 'monitor')} onClick={() => setActiveTab('monitor')}>
                            <FaDesktop /> {t.calibration.tabs.monitor}
                        </button>
                        <button style={tabButtonStyle(activeTab === 'card')} onClick={() => setActiveTab('card')}>
                            <FaCreditCard /> {t.calibration.tabs.card}
                        </button>
                    </div>

                    {/* Dynamic Description - Moved below Tabs */}
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.4' }}>
                        {activeTab === 'card'
                            ? t.calibration.desc
                            : t.calibration.descMonitor}
                    </p>
                </div>

                {/* CONTENT AREA */}
                {activeTab === 'card' ? (
                    // --- ORIGINAL CREDIT CARD UI ---
                    <>
                        {/* Controls */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}> {/* Reduced gap & mb */}

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}> {/* Reduced gap */}
                                <button
                                    className="btn"
                                    style={{ padding: '0.75rem', background: '#333' }}
                                    onClick={() => setPixels(p => Math.max(100, p - 1))}
                                    onContextMenu={(e) => { e.preventDefault(); setPixels(p => Math.max(100, p - 5)); }}
                                >
                                    <FaMinus size={12} />
                                </button>

                                <input
                                    type="range"
                                    min="100"
                                    max="506" // 150 PPI * 3.37 inch = 505.5
                                    value={pixels}
                                    onChange={(e) => setPixels(Number(e.target.value))}
                                    style={{ width: '100%', maxWidth: '200px' }}
                                />

                                <button
                                    className="btn"
                                    style={{ padding: '0.75rem', background: '#333' }}
                                    onClick={() => setPixels(p => Math.min(506, p + 1))}
                                    onContextMenu={(e) => { e.preventDefault(); setPixels(p => Math.min(506, p + 5)); }}
                                >
                                    <FaPlus size={12} />
                                </button>
                            </div>

                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                {t.calibration.currentPPI} <span style={{ color: 'white', fontWeight: 'bold' }}>{(pixels / CARD_WIDTH_INCH).toFixed(1)}</span>
                            </div>

                        </div>
                        {/* Visuals (Crosshair + Card) */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            position: 'relative', // Relative for possible absolute children if needed, but we use flex centering
                            padding: '10px',
                            minHeight: '200px' // Ensure space
                        }}>
                            {/*
                                Anchor Wrapper:
                                We want the "Top-Left" (Crosshair) to remain stationary relative to the modal
                                even as the card grows. The previous 'justifyContent: center' caused the
                                Left edge to move left as width increased.

                                Fix: Use a fixed-width or zero-width container centered in the parent,
                                offset slightly to the left so it looks balanced.
                            */}

                            <div style={{ position: 'relative', width: 0, left: '-160px' }}>
                                {/* Crosshair - Fixed at 0,0 of this wrapper */}
                                <div style={{
                                    position: 'absolute',
                                    top: '0', left: '0',
                                    width: '0', height: '0',
                                    pointerEvents: 'none',
                                    zIndex: 20
                                }}>
                                    <div style={{ position: 'absolute', top: 0, left: '-10px', width: '40px', height: '2px', background: '#fbbf24' }} />
                                    <div style={{ position: 'absolute', top: '-10px', left: 0, width: '2px', height: '40px', background: '#fbbf24' }} />
                                </div>

                                <span style={{
                                    position: 'absolute',
                                    top: '-20px', left: '10px',
                                    fontSize: '0.75rem',
                                    color: '#fbbf24',
                                    fontWeight: 'bold',
                                    zIndex: 20,
                                    whiteSpace: 'nowrap'
                                }}>
                                    {t.calibration.guide}
                                </span>

                                {/* Card - VERTICAL orientation */}
                                <div style={{
                                    width: `${pixels * 0.628}px`, // Expands to the RIGHT
                                    height: `${pixels}px`,
                                    minWidth: '50px',
                                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'rgba(255,255,255,0.8)',
                                    fontSize: '2rem',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                    transition: 'width 0.1s ease-out, height 0.1s ease-out',

                                    // Ensure it starts at 0,0 of wrapper
                                    position: 'absolute', // Absolute to flow out of 0-width wrapper?
                                    top: 0, left: 0
                                }}>
                                    <FaCreditCard style={{ transform: 'rotate(90deg)' }} />
                                </div>

                                {/* Spacer to prevent overlap: Matches Card Height */}
                                <div style={{ width: '1px', height: `${pixels}px`, visibility: 'hidden' }} />
                            </div>
                        </div>
                    </>
                ) : (
                    // --- NEW MONITOR SIZE UI ---
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem', alignItems: 'center' }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            width: '100%',
                            textAlign: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <input
                                    type="number"
                                    placeholder="e.g. 24"
                                    value={monitorSize}
                                    onChange={(e) => setMonitorSize(e.target.value)}
                                    style={{
                                        width: '120px',
                                        padding: '0.8rem',
                                        borderRadius: '8px',
                                        border: '1px solid #444',
                                        background: '#222',
                                        color: 'white',
                                        fontSize: '1.2rem',
                                        textAlign: 'center',
                                        outline: 'none'
                                    }}
                                />
                                <span style={{ color: 'white', fontWeight: 600 }}>inch</span>
                            </div>
                        </div>

                        {monitorSize && !isNaN(parseFloat(monitorSize)) && parseFloat(monitorSize) > 0 && (
                            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                Calculated PPI: <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '1.1rem', marginLeft: '0.5rem' }}>
                                    {(Math.sqrt(window.screen.width ** 2 + window.screen.height ** 2) / parseFloat(monitorSize)).toFixed(1)}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}> {/* Reduced gap */}
                    <button
                        onClick={onClose}
                        className="btn"
                        style={{ flex: 1, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '0.75rem' }}
                    >
                        {t.calibration.cancel}
                    </button>
                    <button
                        onClick={handleSave}
                        className="btn btn-primary"
                        style={{ flex: 1, padding: '0.75rem' }}
                    >
                        {t.calibration.save}
                    </button>
                </div>
            </div>
        </div>
    );
}
