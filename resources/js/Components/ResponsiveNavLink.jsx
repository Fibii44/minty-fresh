import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-[#3FAD00] bg-[#3FAD00]/10 text-[#1F3612] font-bold focus:border-[#2C7A00] focus:bg-[#3FAD00]/15'
                    : 'border-transparent text-[#728F63] hover:border-[#3FAD00]/30 hover:bg-[#3FAD00]/5 hover:text-[#1F3612] focus:border-[#3FAD00]/30 focus:bg-[#3FAD00]/5 focus:text-[#1F3612]'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
