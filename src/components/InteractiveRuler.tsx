'use client';

import React, { useEffect, useState, useRef } from 'react';

interface InteractiveRulerProps {
    unit: 'cm' | 'inch';
    ppi: number;
    orientation: 'horizontal' | 'vertical';
    isFlipped?: boolean;
    markers: Marker[];
    setMarkers: React.Dispatch<React.SetStateAction<Marker[]>>;
}

interface Marker {
    id: number;
    pos: number;
    color: string;
}

// A palette of distinct colors for the markers
const MARKER_COLORS = [
    '#ef4444', // Red
    '#3b82f6', // Blue
    '#10b981', // Green
    '#f59e0b', // Amber
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#f97316'  // Orange
];

export default function InteractiveRuler({ unit, ppi, orientation, isFlipped = false, markers, setMarkers }: InteractiveRulerProps) {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [draggingMarkerId, setDraggingMarkerId] = useState<number | null>(null);
    const rulerRef = useRef<HTMLDivElement>(null);

    // Keep track of the next color index to assign
    const nextColorIndex = useRef(0);

    useEffect(() => {
        // Initial set
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowSize({ width: window.innerWidth, height: window.innerHeight });
            }, 100); // 100ms debounce
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    const length = orientation === 'horizontal' ? windowSize.width : windowSize.height;

    // Memoize calculations
    const { totalInches, totalCm } = React.useMemo(() => {
        return {
            totalInches: Math.ceil(length / ppi),
            totalCm: Math.ceil(length / (ppi / 2.54))
        };
    }, [length, ppi]);

    const isHorizontal = orientation === 'horizontal';

    const handlePointerDown = (e: React.PointerEvent) => {
        const target = e.target as HTMLElement;

        // Check if delete button was clicked
        if (target.closest('[data-delete-btn]')) {
            const markerId = parseInt(target.closest('[data-delete-btn]')!.getAttribute('data-delete-btn')!, 10);
            setMarkers(prev => prev.filter(m => m.id !== markerId));
            return; // Don't initiate drag or add
        }

        if (!rulerRef.current) return;

        const isMarker = target.closest('[data-marker-id]');

        const rect = rulerRef.current.getBoundingClientRect();
        let pos = isHorizontal ? e.clientX - rect.left : e.clientY - rect.top;
        pos = Math.max(0, Math.min(pos, isHorizontal ? rect.width : rect.height));

        if (isMarker) {
            // Start dragging existing marker
            const markerId = parseInt(isMarker.getAttribute('data-marker-id')!, 10);
            setDraggingMarkerId(markerId);
        } else {
            // Add new marker
            const color = MARKER_COLORS[nextColorIndex.current % MARKER_COLORS.length];
            nextColorIndex.current += 1;
            const newMarker: Marker = { id: Date.now(), pos, color };
            setMarkers([...markers, newMarker]);
            setDraggingMarkerId(newMarker.id);
        }
        (e.target as Element).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (draggingMarkerId === null || !rulerRef.current) return;
        const rect = rulerRef.current.getBoundingClientRect();
        let pos = isHorizontal ? e.clientX - rect.left : e.clientY - rect.top;
        pos = Math.max(0, Math.min(pos, isHorizontal ? rect.width : rect.height));

        setMarkers(prev => prev.map(m => m.id === draggingMarkerId ? { ...m, pos } : m));
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setDraggingMarkerId(null);
        if ((e.target as Element).hasPointerCapture(e.pointerId)) {
            (e.target as Element).releasePointerCapture(e.pointerId);
        }
    };

    const getMeasurementText = (pos: number) => {
        if (unit === 'cm') {
            return (pos / (ppi / 2.54)).toFixed(2) + ' cm';
        } else {
            return (pos / ppi).toFixed(2) + ' in';
        }
    };

    // Base Styles
    const rulerStyle: React.CSSProperties = isHorizontal ? {
        width: '100%',
        height: '50px',
        background: '#fff',
        color: '#000',
        position: 'relative',
        border: '1px solid #ddd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: isFlipped ? 'flex-start' : 'flex-end',
        touchAction: 'none',
        cursor: 'crosshair'
    } : {
        width: '50px',
        height: '100%',
        background: '#fff',
        color: '#000',
        position: 'relative',
        border: '1px solid #ddd',
        boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: isFlipped ? 'flex-start' : 'flex-end',
        touchAction: 'none',
        cursor: 'crosshair'
    };

    // Memoize the tick rendering
    const ticks = React.useMemo(() => {
        if (unit === 'cm') {
            return Array.from({ length: totalCm }).map((_, i) => (
                <div key={`cm-${i}`} style={isHorizontal ? {
                    position: 'absolute',
                    left: `${i * (ppi / 2.54)}px`,
                    top: isFlipped ? 0 : 'auto',
                    bottom: isFlipped ? 'auto' : 0,
                    borderLeft: '1px solid #000',
                    height: '100%'
                } : {
                    position: 'absolute',
                    top: `${i * (ppi / 2.54)}px`,
                    left: isFlipped ? 0 : 'auto',
                    right: isFlipped ? 'auto' : 0,
                    borderTop: '1px solid #000',
                    width: '100%'
                }}>
                    <span style={isHorizontal ? {
                        position: 'absolute',
                        top: isFlipped ? 'auto' : '2px',
                        bottom: isFlipped ? '2px' : 'auto',
                        left: '4px', fontSize: '0.75rem', fontWeight: 600
                    } : {
                        position: 'absolute',
                        left: isFlipped ? 'auto' : '2px',
                        right: isFlipped ? '2px' : 'auto',
                        top: '4px', fontSize: '0.75rem', fontWeight: 600, writingMode: 'vertical-rl', transform: 'rotate(180deg)'
                    }}>
                        {i}
                    </span>

                    {/* Millimeter ticks */}
                    {Array.from({ length: 9 }).map((_, m) => (
                        <div key={`mm-${i}-${m}`} style={isHorizontal ? {
                            position: 'absolute',
                            left: `${(m + 1) * ((ppi / 2.54) / 10)}px`,
                            top: isFlipped ? 0 : 'auto',
                            bottom: isFlipped ? 'auto' : 0,
                            height: m === 4 ? '18px' : '10px',
                            borderLeft: '1px solid #555'
                        } : {
                            position: 'absolute',
                            top: `${(m + 1) * ((ppi / 2.54) / 10)}px`,
                            left: isFlipped ? 0 : 'auto',
                            right: isFlipped ? 'auto' : 0,
                            width: m === 4 ? '18px' : '10px',
                            borderTop: '1px solid #555'
                        }} />
                    ))}
                </div>
            ));
        } else {
            return Array.from({ length: totalInches }).map((_, i) => (
                <div key={`in-${i}`} style={isHorizontal ? {
                    position: 'absolute',
                    left: `${i * ppi}px`,
                    top: isFlipped ? 0 : 'auto',
                    bottom: isFlipped ? 'auto' : 0,
                    borderLeft: '1px solid #000',
                    height: '100%'
                } : {
                    position: 'absolute',
                    top: `${i * ppi}px`,
                    left: isFlipped ? 0 : 'auto',
                    right: isFlipped ? 'auto' : 0,
                    borderTop: '1px solid #000',
                    width: '100%'
                }}>
                    <span style={isHorizontal ? {
                        position: 'absolute',
                        top: isFlipped ? 'auto' : '2px',
                        bottom: isFlipped ? '2px' : 'auto',
                        left: '4px', fontSize: '0.75rem', fontWeight: 600
                    } : {
                        position: 'absolute',
                        left: isFlipped ? 'auto' : '2px',
                        right: isFlipped ? '2px' : 'auto',
                        top: '4px', fontSize: '0.75rem', fontWeight: 600, writingMode: 'vertical-rl', transform: 'rotate(180deg)'
                    }}>
                        {i}
                    </span>

                    {/* 1/16th inch ticks */}
                    {Array.from({ length: 15 }).map((_, m) => {
                        const isHalf = (m + 1) % 8 === 0;
                        const isQuarter = (m + 1) % 4 === 0;
                        const isEighth = (m + 1) % 2 === 0;
                        const size = isHalf ? '20px' : (isQuarter ? '15px' : (isEighth ? '10px' : '6px'));

                        return (
                            <div key={`th-${i}-${m}`} style={isHorizontal ? {
                                position: 'absolute',
                                left: `${(m + 1) * (ppi / 16)}px`,
                                top: isFlipped ? 0 : 'auto',
                                bottom: isFlipped ? 'auto' : 0,
                                height: size,
                                borderLeft: '1px solid #555'
                            } : {
                                position: 'absolute',
                                top: `${(m + 1) * (ppi / 16)}px`,
                                left: isFlipped ? 0 : 'auto',
                                right: isFlipped ? 'auto' : 0,
                                width: size,
                                borderTop: '1px solid #555'
                            }} />
                        );
                    })}
                </div>
            ));
        }
    }, [unit, totalCm, totalInches, isHorizontal, isFlipped, ppi]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: isHorizontal ? 'column' : 'row',
            width: isHorizontal ? '100%' : '50px',
            height: isHorizontal ? '50px' : '100%',
            alignItems: 'flex-start',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            msUserSelect: 'none'
        }}>

            <div
                style={rulerStyle}
                ref={rulerRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                {ticks}
                {markers.map(marker => (
                    <div
                        key={marker.id}
                        data-marker-id={marker.id}
                        style={isHorizontal ? {
                            position: 'absolute',
                            left: `${marker.pos - 10}px`, // Increased hit area
                            top: 0,
                            height: '100px',
                            width: '20px', // Hit area width
                            display: 'flex',
                            justifyContent: 'center',
                            zIndex: 10,
                            cursor: 'ew-resize'
                        } : {
                            position: 'absolute',
                            top: `${marker.pos - 10}px`,
                            left: 0,
                            width: '100px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            zIndex: 10,
                            cursor: 'ns-resize'
                        }}
                    >
                        {/* Visible Line */}
                        <div style={isHorizontal ? {
                            width: '2px',
                            height: '100%',
                            backgroundColor: marker.color
                        } : {
                            height: '2px',
                            width: '100%',
                            backgroundColor: marker.color
                        }} />

                        {/* Label and Delete Wrapper */}
                        <div style={isHorizontal ? {
                            position: 'absolute',
                            top: '90%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '2px',
                            zIndex: 20,
                        } : {
                            position: 'absolute',
                            left: '90%',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '2px',
                            zIndex: 20,
                        }}>
                            {/* Label Badge */}
                            <div style={isHorizontal ? {
                                backgroundColor: marker.color,
                                color: 'white',
                                padding: '4px 6px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                pointerEvents: 'none'
                            } : {
                                backgroundColor: marker.color,
                                color: 'white',
                                padding: '4px 6px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                writingMode: 'vertical-rl',
                                transform: 'rotate(180deg)',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                pointerEvents: 'none'
                            }}>
                                {getMeasurementText(marker.pos)}
                            </div>

                            {/* Circular Delete Button */}
                            <div
                                data-delete-btn={marker.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: marker.color,
                                    color: 'white',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    fontSize: '0.7rem',
                                    lineHeight: 1,
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    pointerEvents: 'auto',
                                    flexShrink: 0
                                }}
                            >
                                ✕
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

