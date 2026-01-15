'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaCog, FaRulerCombined, FaRedo } from 'react-icons/fa';
import InteractiveRuler from '../../components/InteractiveRuler';
import CalibrationModal from '../../components/CalibrationModal';
import { useLanguage } from '../../context/LanguageContext';

export default function RulerPage() {
    const { t } = useLanguage();
    const [unit, setUnit] = useState<'cm' | 'inch'>('cm');
    const [showCalibration, setShowCalibration] = useState(false);
    const [ppi, setPpi] = useState(96);
    const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');

    // Dragging State
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const itemStartPos = useRef({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const rulerRef = useRef<HTMLDivElement>(null);

    // Header Position State
    const [headerPos, setHeaderPos] = useState<'top' | 'bottom'>('top');

    // Flipped State (for ticks)
    const [isFlipped, setIsFlipped] = useState(false);

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

    // Center ruler initially only
    useEffect(() => {
        if (containerRef.current) {
            const containerH = containerRef.current.clientHeight;
            setPosition({ x: 0, y: (containerH - 50) / 2 });
        }
    }, []);

    const toggleOrientation = () => {
        const newOrientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';

        let newPos = { x: 0, y: 0 };

        // Calculate new position immediately
        if (containerRef.current) {
            const containerW = containerRef.current.clientWidth;
            const containerH = containerRef.current.clientHeight;

            if (newOrientation === 'horizontal') {
                newPos = { x: 0, y: (containerH - 50) / 2 };
            } else {
                newPos = { x: (containerW - 50) / 2, y: 0 };
            }
            setPosition(newPos);
        }

        setOrientation(newOrientation);

        // Update flipped state for new center position (usually center means NOT flipped by default logic?)
        // Center usually means ticks at bottom/right? 
        // Let's use standard: Horizontal -> CenterY. Y > Center? 
        // If centered, let's stick to default (isFlipped=false).
        setIsFlipped(false);
    };

    // Update Header position & Flipped state based on ruler Pos
    useEffect(() => {
        let newHeaderPos: 'top' | 'bottom' = 'top';
        let newIsFlipped = false;

        const containerW = containerRef.current?.clientWidth || window.innerWidth;
        const containerH = containerRef.current?.clientHeight || window.innerHeight;

        if (orientation === 'horizontal') {
            if (position.y < 80) newHeaderPos = 'bottom';

            // Flip determines if ticks are on Top or Bottom.
            // User wanted: Top -> Top Ticks (isFlipped=true), Bottom -> Bottom Ticks (isFlipped=false)
            const centerY = containerH / 2;
            if (position.y < centerY - 25) { // If in Top Half
                newIsFlipped = true; // Set Ticks to Top
            }
        } else {
            // Vertical
            // Header logic (keep top mainly unless needed)

            // User wanted: Left -> Left Ticks (isFlipped=true), Right -> Right Ticks (isFlipped=false)

            const centerX = containerW / 2;
            if (position.x < centerX - 25) { // If in Left Half
                newIsFlipped = true; // Set Ticks to Left
            }
        }

        if (headerPos !== newHeaderPos) setHeaderPos(newHeaderPos);
        if (isFlipped !== newIsFlipped) setIsFlipped(newIsFlipped);

    }, [position.x, position.y, orientation, headerPos, isFlipped]);

    const handleStart = (clientX: number, clientY: number) => {
        setIsDragging(true);
        dragStartPos.current = { x: clientX, y: clientY };
        itemStartPos.current = { ...position };
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (!isDragging || !containerRef.current) return;

        const deltaX = clientX - dragStartPos.current.x;
        const deltaY = clientY - dragStartPos.current.y;

        let newX = itemStartPos.current.x + deltaX;
        let newY = itemStartPos.current.y + deltaY;

        // Boundaries & Snapping
        const containerW = containerRef.current.clientWidth;
        const containerH = containerRef.current.clientHeight;

        const SNAP_THRESHOLD = 30;
        const RULER_THICKNESS = 50;

        if (orientation === 'horizontal') {
            // Ruler is full width, draggable Y.
            // Snap Y
            if (newY < SNAP_THRESHOLD) newY = 0; // Top
            if (newY > containerH - RULER_THICKNESS - SNAP_THRESHOLD) newY = containerH - RULER_THICKNESS; // Bottom

            // Snap X (keep left logic)
            if (Math.abs(newX) < SNAP_THRESHOLD) newX = 0;
        } else {
            // Ruler is full height, draggable X.
            // Snap X to Left / Right
            if (newX < SNAP_THRESHOLD) newX = 0; // Left
            if (newX > containerW - RULER_THICKNESS - SNAP_THRESHOLD) newX = containerW - RULER_THICKNESS; // Right

            // strictly lock Y to 0 for vertical mode (fixed below header)
            newY = 0;
        }

        setPosition({ x: newX, y: newY });
    };

    const handleEnd = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY);
        const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const onEnd = () => handleEnd();

        if (isDragging) {
            window.addEventListener('touchmove', onTouchMove);
            window.addEventListener('touchend', onEnd);
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onEnd);
        }
        return () => {
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onEnd);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onEnd);
        };
    }, [isDragging]);


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

    return (
        <main style={{
            width: '100vw',
            height: '100vh',
            background: '#f0f0f0',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative'
        }}>

            <CalibrationModal
                isOpen={showCalibration}
                onClose={() => setShowCalibration(false)}
                onSave={saveCalibration}
                initialPPI={ppi}
            />

            {/* Floating Header */}
            <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: headerPos === 'top' ? 0 : 'auto',
                bottom: headerPos === 'bottom' ? 0 : 'auto',
                padding: '1rem',
                background: 'rgba(18, 18, 22, 0.95)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: headerPos === 'top' ? '0 2px 10px rgba(0,0,0,0.2)' : '0 -2px 10px rgba(0,0,0,0.2)',
                zIndex: 50,
                transition: 'all 0.3s ease-in-out',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.9rem', opacity: 0.8 }}>
                        <FaArrowLeft /> {t.ruler.back}
                    </Link>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>

                    <button
                        onClick={toggleOrientation}
                        className="btn"
                        style={buttonStyle}
                    >
                        <FaRedo /> Rotate
                    </button>

                    <button
                        onClick={() => setUnit(unit === 'cm' ? 'inch' : 'cm')}
                        className="btn"
                        style={{ ...buttonStyle, minWidth: '100px', justifyContent: 'center' }}
                    >
                        <FaRulerCombined />
                        {unit === 'cm' ? 'CM' : 'INCH'}
                    </button>

                    <button
                        onClick={() => setShowCalibration(true)}
                        className="btn"
                        style={buttonStyle}
                    >
                        <FaCog />
                    </button>

                </div>
            </div>

            {/* Ruler Container Area */}
            <div
                ref={containerRef}
                style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: '#e5e5e5',
                    overflow: 'hidden',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    zIndex: 10
                }}
                onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
                onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
            >
                <div
                    ref={rulerRef}
                    style={{
                        position: 'absolute',
                        // Adjust Top and Height for Vertical Mode to avoid overlapping Header (Fixed Top)
                        top: orientation === 'vertical' ? '66px' : 0,

                        left: 0,
                        transform: `translate(${position.x}px, ${position.y}px)`,
                        // Size depends on orientation
                        width: orientation === 'horizontal' ? '100%' : '50px',
                        height: orientation === 'horizontal' ? '50px' : 'calc(100% - 66px)',
                    }}
                >
                    <div style={{ pointerEvents: 'none', width: '100%', height: '100%' }}>
                        <InteractiveRuler
                            unit={unit}
                            ppi={ppi}
                            orientation={orientation}
                            isFlipped={isFlipped}
                        />
                    </div>
                </div>

                {/* Placeholder text */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.1,
                    fontSize: '3rem',
                    fontWeight: 800,
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}>
                    DRAG ME
                </div>

            </div>
        </main>
    );
}
