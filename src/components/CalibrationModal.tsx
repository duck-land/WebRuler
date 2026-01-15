'use client';

import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaCheck, FaTimes, FaMinus, FaPlus } from 'react-icons/fa';
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

    useEffect(() => {
        if (isOpen) {
            // Initialize with current PPI
            setPixels(Math.round(CARD_WIDTH_INCH * initialPPI));
        }
    }, [isOpen, initialPPI]);

    const handleSave = () => {
        const newPPI = pixels / CARD_WIDTH_INCH;
        onSave(newPPI);
        onClose();
    };

    if (!isOpen) return null;

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
            paddingTop: '10vh', // Fixed top offset
            overflowY: 'auto'
        }}>
            <div className="glass-panel" style={{
                width: '90%',
                maxWidth: '500px',
                padding: '2rem',
                background: '#1c1c22',
                border: '1px solid var(--border)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                <h2 style={{ color: 'white', marginBottom: '1rem', textAlign: 'center' }}>{t.calibration.title}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    {t.calibration.desc}
                </p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginBottom: '2rem',
                    height: 'auto',
                    alignItems: 'flex-start',
                    position: 'relative',
                    padding: '20px'
                }}>
                    {/* Alignment Guide (Crosshair +) */}
                    <div style={{
                        position: 'absolute',
                        top: '20px', left: '20px', // Matches padding to be the effective 0,0
                        width: '0', height: '0',
                        pointerEvents: 'none',
                        zIndex: 20
                    }}>
                        {/* Horizontal Line (-10px left, +30px right) */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: '-10px',
                            width: '40px', height: '2px',
                            background: '#fbbf24'
                        }} />
                        {/* Vertical Line (-10px top, +30px bottom) */}
                        <div style={{
                            position: 'absolute',
                            top: '-10px', left: 0,
                            width: '2px', height: '40px',
                            background: '#fbbf24'
                        }} />
                    </div>

                    <span style={{
                        position: 'absolute',
                        top: '0', left: '0',
                        fontSize: '0.75rem',
                        color: '#fbbf24',
                        fontWeight: 'bold',
                        zIndex: 20
                    }}>
                        {t.calibration.guide}
                    </span>

                    <div style={{
                        width: `${pixels}px`,
                        height: `${pixels * 0.628}px`,
                        minHeight: '50px',
                        // maxHeight removed
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: '3rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        transition: 'width 0.1s ease-out, height 0.1s ease-out'
                    }}>
                        <FaCreditCard />
                    </div>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', width: '100%' }}>
                        <button
                            className="btn"
                            style={{ padding: '1rem', background: '#333' }}
                            onClick={() => setPixels(p => Math.max(100, p - 1))}
                            onContextMenu={(e) => { e.preventDefault(); setPixels(p => Math.max(100, p - 5)); }} // Right click for larger step
                        >
                            <FaMinus />
                        </button>

                        <input
                            type="range"
                            min="100"
                            max="430"
                            value={pixels}
                            onChange={(e) => setPixels(Number(e.target.value))}
                            style={{ width: '100%', maxWidth: '200px' }}
                        />

                        <button
                            className="btn"
                            style={{ padding: '1rem', background: '#333' }}
                            onClick={() => setPixels(p => Math.min(430, p + 1))}
                            onContextMenu={(e) => { e.preventDefault(); setPixels(p => Math.min(430, p + 5)); }}
                        >
                            <FaPlus />
                        </button>
                    </div>

                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        {t.calibration.currentPPI} <span style={{ color: 'white', fontWeight: 'bold' }}>{(pixels / CARD_WIDTH_INCH).toFixed(1)}</span>
                    </div>

                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={onClose}
                        className="btn"
                        style={{ flex: 1, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                    >
                        {t.calibration.cancel}
                    </button>
                    <button
                        onClick={handleSave}
                        className="btn btn-primary"
                        style={{ flex: 1 }}
                    >
                        {t.calibration.save}
                    </button>
                </div>
            </div>
        </div>
    );
}
