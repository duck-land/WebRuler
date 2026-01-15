'use client';

import React, { useEffect, useState } from 'react';

interface InteractiveRulerProps {
    unit: 'cm' | 'inch';
    ppi: number;
    orientation: 'horizontal' | 'vertical';
    isFlipped?: boolean;
}

export default function InteractiveRuler({ unit, ppi, orientation, isFlipped = false }: InteractiveRulerProps) {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const length = orientation === 'horizontal' ? windowSize.width : windowSize.height;

    const totalInches = Math.ceil(length / ppi);
    const totalCm = Math.ceil(length / (ppi / 2.54));

    const isHorizontal = orientation === 'horizontal';

    // Base Styles
    const rulerStyle: React.CSSProperties = isHorizontal ? {
        width: '100%',
        height: '50px',
        background: '#fff',
        color: '#000',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #ddd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: isFlipped ? 'flex-start' : 'flex-end'
    } : {
        width: '50px',
        height: '100%',
        background: '#fff',
        color: '#000',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #ddd',
        boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: isFlipped ? 'flex-start' : 'flex-end'
    };

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

            <div style={rulerStyle}>

                {unit === 'cm' ? (
                    /* CM Scale */
                    <>
                        {Array.from({ length: totalCm }).map((_, i) => (
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
                        ))}
                    </>
                ) : (
                    /* Inch Scale */
                    <>
                        {Array.from({ length: totalInches }).map((_, i) => (
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
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
