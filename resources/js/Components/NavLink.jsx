import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-[#3FAD00] text-[#1F3612] font-bold focus:border-[#2C7A00]'
                    : 'border-transparent text-[#728F63] hover:border-[#3FAD00]/30 hover:text-[#1F3612] focus:border-[#3FAD00]/30 focus:text-[#1F3612]') +
                className
            }
        >
            {children}
        </Link>
    );
}
