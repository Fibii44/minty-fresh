import React, { useState, useRef, useEffect } from 'react';

export default function BeforeAfter() {
    const [sliderPos, setSliderPos] = useState(50);
    const sliderRef = useRef(null);
    const isDragging = useRef(false);

    const handleMove = (clientX) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        let percentage = (x / rect.width) * 100;
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;
        setSliderPos(percentage);
    };

    const handleTouchMove = (e) => {
        if (!isDragging.current) return;
        if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX);
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        handleMove(e.clientX);
    };

    useEffect(() => {
        const stopDrag = () => {
            isDragging.current = false;
        };
        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('touchend', stopDrag);
        return () => {
            window.removeEventListener('mouseup', stopDrag);
            window.removeEventListener('touchend', stopDrag);
        };
    }, []);

    return (
        <section id="before-after" className="py-24 bg-white border-b border-[#3FAD00]/10 w-full px-6 md:px-12">
            <div className="max-w-4xl mx-auto text-center space-y-6">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#2C7A00] font-extrabold">
                    Transformations
                </div>
                <h2 className="sparkle-heading text-3xl sm:text-4xl font-extrabold text-[#1F3612]">
                    Real Before & After Results
                </h2>
                <p className="text-[#2C7A00] max-w-xl mx-auto">
                    Drag the slider to see how our detail-focused cleaners transform a lived-in space into a pristine, welcoming environment.
                </p>
                
                {/* Slider Component */}
                <div 
                    ref={sliderRef}
                    className="ba-slider-container mt-12 cursor-ew-resize select-none"
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    onMouseDown={() => { isDragging.current = true; }}
                    onTouchStart={() => { isDragging.current = true; }}
                >
                    {/* Before Image (Top Panel - Clamped Width) */}
                    <div 
                        className="ba-image ba-before" 
                        style={{ 
                            backgroundImage: "url('/before.png')",
                            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
                        }}
                    >
                        <span className="ba-label ba-label-before">Before</span>
                    </div>

                    {/* After Image (Bottom Panel - Fixed Width) */}
                    <div 
                        className="ba-image ba-after" 
                        style={{ 
                            backgroundImage: "url('/after.png')" 
                        }}
                    >
                        <span className="ba-label ba-label-after">After</span>
                    </div>

                    {/* Handle bar */}
                    <div 
                        className="ba-slider-handle" 
                        style={{ left: `${sliderPos}%` }}
                    >
                        <div className="ba-slider-button">
                            ↔
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
