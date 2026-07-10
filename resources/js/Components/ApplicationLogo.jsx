export default function ApplicationLogo(props) {
    return (
        <div {...props} className={`flex items-center gap-3 ${props.className || ''}`}>
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-[#3FAD00]/15 rounded-full blur-[2px]"></div>
                <svg className="w-7 h-7 text-[#3FAD00] relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Mint leaf vector */}
                    <path d="M11 20A7 7 0 0 1 4 13c0-6 7-10 7-10s2.5 3.5 2.5 6.5c0 3-2.5 4.5-2.5 6.5" fill="#3FAD00" fillOpacity="0.85" stroke="none" />
                    {/* Sparkling Clean star */}
                    <path d="M19 4.5l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8z" fill="#FFD200" stroke="none" />
                </svg>
            </div>
            <span className="sparkle-heading font-black text-xl tracking-wider uppercase whitespace-nowrap">
                <span className="text-[#1F3612]">Minty</span>
                <span className="text-[#3FAD00]">Fresh</span>
            </span>
        </div>
    );
}
