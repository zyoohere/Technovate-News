import React, { useEffect, useRef, useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Search, Moon, Sun, Menu, X, LogIn, UserPlus, PencilLine, User, LogOut, ChevronDown } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function AppLayout({ children, categories }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user;
    const userDropdownRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(); // Renamed for clarity
    const mobileMenuRef = useRef(); // Ref for mobile menu
    const { data, setData, get } = useForm({ q: '' });
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedMode = localStorage.getItem('darkMode');
            if (savedMode) return savedMode === 'true';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', darkMode);
            localStorage.setItem('darkMode', darkMode); // Save preference
        }
    }, [darkMode]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {

            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('articles.search'));
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <div className="min-h-screen flex flex-col bg-lightBg text-darkText dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
            <header className="bg-white dark:bg-background-dark shadow sticky top-0 z-50"> {/* Using `white` for light mode header */}
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    {/* Logo and Site Title */}
                    <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                        <img
                            src="/images/Logoicon.png"
                            alt="Technovate Logo"
                            className="h-12 w-12 rounded-full shadow-md dark:bg-surface-light" // Adjusted dark mode background
                        />
                        <span className="text-2xl font-extrabold tracking-wide text-darkText dark:text-gray-100 uppercase">
                            Technovate
                        </span>
                    </Link>

                    {/* Desktop Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-6 relative"> {/* Increased max-width */}
                        <form onSubmit={handleSearch} className="w-full flex items-center">
                            <input
                                type="text"
                                value={data.q}
                                onChange={(e) => setData('q', e.target.value)}
                                placeholder="Cari artikel..."
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" // Rounded-full, adjusted focus ring
                            />
                            <button
                                type="submit"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-primary transition"
                                aria-label="Search"
                            >
                                <Search size={20} />
                            </button>
                        </form>
                    </div>

                    {/* Desktop Navigation & User Menu */}
                    <nav className="hidden md:flex items-center gap-4"> {/* Adjusted gap for better spacing */}
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition" // Rounded-full, better hover
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {darkMode ? <Moon size={20} className="text-indigo-300" /> : <Sun size={20} className="text-orange-400" />} {/* Added color to icons */}
                        </button>
                        {/* Auth Buttons / User Dropdown */}
                        {!user ? (
                            <>
                                <Link
                                    href="/login"
                                    className="px-5 py-2 bg-primary text-white rounded-full font-semibold hover:bg-indigo-700 transition shadow-md" // Rounded-full, better hover
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-5 py-2 border border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition shadow-md" // Rounded-full, better hover
                                >
                                    Daftar
                                </Link>
                            </>
                        ) : (
                            <div className="relative" ref={userDropdownRef}>
                                <button
                                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary dark:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-darkText transition" // Added focus-ring-offset for accessibility
                                    aria-label="User menu"
                                    aria-haspopup="true"
                                    aria-expanded={isUserDropdownOpen}
                                >
                                    {user.avatar ? (
                                        <img src={`/storage/${user.avatar}`} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </button>

                                {isUserDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 animate-fade-in-down" // Added shadow-xl, fade-in animation (requires custom keyframes)
                                    >
                                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                            <p className="font-semibold text-darkText dark:text-gray-100 truncate">{user.name}</p> {/* Truncate long names */}
                                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                        </div>
                                        <ul className="text-sm text-darkText dark:text-gray-200 py-1">
                                            <li>
                                                <Link href="/artikel/tulis" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition" onClick={() => setIsUserDropdownOpen(false)}>
                                                    <span className="flex items-center gap-2">✍️ Tulis Artikel</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition" onClick={() => setIsUserDropdownOpen(false)}>
                                                    <span className="flex items-center gap-2">👤 Profil</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={route('logout')} // Use route helper for consistency
                                                    method="post"
                                                    as="button"
                                                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-700 transition"
                                                    onClick={() => setIsUserDropdownOpen(false)}
                                                >
                                                    ➡️ Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {darkMode ? <Moon size={20} className="text-indigo-300" /> : <Sun size={20} className="text-orange-400" />}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-darkText dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary rounded p-1"
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />} {/* Using Lucide icons for consistency */}
                        </button>
                    </div>
                </div>

                {/* Desktop Category Navigation */}
                <nav className="hidden md:flex justify-center bg-primary text-white py-3 space-x-8 font-semibold shadow-inner"> {/* Added shadow-inner */}
                    <Link href="/" className="hover:text-secondary transition text-sm"> {/* Adjusted text size */}
                        Beranda
                    </Link>
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/artikel/kategori/${cat.slug || cat.id}`}
                            className="hover:text-secondary transition text-sm"
                        >
                            {cat.nama}
                        </Link>
                    ))}
                    <Link href="/Technovate-profile" className="hover:text-secondary transition text-sm">
                        Tentang Kami
                    </Link>
                </nav>

                {/* Mobile Menu Content */}
                {isMobileMenuOpen && (
                    <div ref={mobileMenuRef} className="md:hidden bg-white dark:bg-gray-800 shadow-lg px-6 pt-4 pb-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
                        {/* Mobile Search Bar */}
                        <form onSubmit={handleSearch} className="w-full flex items-center relative mb-4">
                            <input
                                type="text"
                                value={data.q}
                                onChange={(e) => setData('q', e.target.value)}
                                placeholder="Cari artikel..."
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            />
                            <button
                                type="submit"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-primary transition"
                                aria-label="Search"
                            >
                                <Search size={18} />
                            </button>
                        </form>

                        <ul className="space-y-4 text-center font-medium text-darkText dark:text-gray-100">
                            <li>
                                <Link
                                    href="/"
                                    className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Beranda
                                </Link>
                            </li>
                            {categories.map((cat) => (
                                <li key={cat.id}>
                                    <Link
                                        href={`/artikel/kategori/${cat.slug || cat.id}`}
                                        className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {cat.nama}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/Technovate-profile"
                                    className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Tentang Kami
                                </Link>
                            </li>
                        </ul>

                        {/* Mobile Auth Buttons / User Menu */}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            {!user ? (
                                <div className="space-y-3 px-4">
                                    <Link
                                        href="/login"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <LogIn className="w-5 h-5" />
                                        Masuk
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <UserPlus className="w-5 h-5" />
                                        Daftar
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 px-4 py-2">
                                        <button
                                            onClick={() => setIsOpen(!isOpen)}
                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                                        >
                                            {user.avatar ? (
                                                <img
                                                    src={`/storage/${user.avatar}`}
                                                    alt={user.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-md">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <div className="flex-1 text-left">
                                                <p className="font-semibold text-darkText dark:text-gray-100 truncate">{user.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                            </div>
                                            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                    {isOpen && (
                                        <div className="mt-2 space-y-1">
                                            <Link
                                                href="/artikel/tulis"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded"
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    setIsMobileMenuOpen(false);
                                                }}
                                            >
                                                <PencilLine className="w-4 h-4" />
                                                Tulis Artikel
                                            </Link>
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded"
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    setIsMobileMenuOpen(false);
                                                }}
                                            >
                                                <User className="w-4 h-4" />
                                                Profil
                                            </Link>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-700 transition rounded"
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    setIsMobileMenuOpen(false);
                                                }}
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>
                        <Toaster position="top-right" reverseOrder={false} /> {/* Added Toaster for notifications */}

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">{children}</main> {/* Adjusted padding for better responsiveness */}

            {/* Footer */}
            <footer className="bg-white text-darkText py-10 mt-auto border-t-4 border-primary dark:bg-gray-800 dark:text-gray-200 dark:border-primary"> {/* Adjusted colors for better dark mode */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-8"> {/* Added gap */}
                    {/* Brand Info */}
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <div className="text-2xl font-semibold text-primary">Technovate</div> {/* Applied primary color */}
                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">Portal Berita Terpercaya di Indonesia</p>
                        <div className="mt-4 text-gray-500 dark:text-gray-400">
                            <span>&copy; {new Date().getFullYear()} Technovate. All rights reserved.</span> {/* Dynamic year */}
                        </div>
                    </div>

                    {/* Category Links */}
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <div className="font-semibold mb-3 text-lg text-primary">Kategori</div> {/* Applied primary color, larger font */}
                        <ul className="space-y-2 text-sm">
                            {categories.map((cat) => (
                                <li key={cat.id}>
                                    <Link
                                        href={`/artikel/kategori/${cat.slug || cat.id}`}
                                        className="hover:text-primary transition text-gray-700 dark:text-gray-300" // Adjusted hover/default text color
                                    >
                                        {cat.nama}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <div className="font-semibold mb-3 text-lg text-primary">Ikuti Kami</div> {/* New heading, primary color */}
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary transition text-gray-700 dark:text-gray-300 flex items-center gap-2"><img src="/icons/facebook.svg" alt="Facebook" className="h-5 w-5 invert dark:invert-0" /> Facebook</a></li> {/* Placeholder for icons */}
                            <li><a href="#" className="hover:text-primary transition text-gray-700 dark:text-gray-300 flex items-center gap-2"><img src="/icons/twitter.svg" alt="Twitter" className="h-5 w-5 invert dark:invert-0" /> Twitter</a></li>
                            <li><a href="#" className="hover:text-primary transition text-gray-700 dark:text-gray-300 flex items-center gap-2"><img src="/icons/instagram.svg" alt="Instagram" className="h-5 w-5 invert dark:invert-0" /> Instagram</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-6 md:mt-0 text-center md:text-left">
                        <div className="font-semibold mb-3 text-lg text-primary">Kontak</div> {/* Primary color, larger font */}
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <li><a href="mailto:contact@technovate.com" className="hover:text-primary transition">Email: contact@technovate.com</a></li>
                            <li><a href="tel:+628123456789" className="hover:text-primary transition">Telp: +62 812 3456 789</a></li>
                            <li>Jl. Contoh No. 123, Bandung, Indonesia</li> {/* Added address */}
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}