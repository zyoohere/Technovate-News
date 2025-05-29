import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Sun, Search } from 'lucide-react';

export default function AppLayout({ children, categories }) {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user;
    const dropdownRef = useRef();
    const { data, setData, get } = useForm({ q: '' });

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('articles.search'));
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-zinc-100 text-dark">
            <header className="bg-white shadow sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/images/Logoicon.png" alt="Technovate Logo" className="h-12 w-12 rounded-full shadow" />
                        <span className="text-2xl font-extrabold text-dark tracking-wide">Technovate</span>
                    </Link>

                    <div className="hidden md:flex flex-1 mx-4 max-w-xl relative">
                        <form onSubmit={handleSearch} className="w-full flex items-center">
                            <input
                                type="text"
                                value={data.q}
                                onChange={(e) => setData('q', e.target.value)}
                                placeholder="Cari artikel..."
                                className="w-full bg-light text-sm px-4 py-2 rounded-lg pl-10 border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                            <button type="submit" className="absolute left-3 top-2.5 w-5 h-5 text-dark">
                                <Search size={18} />
                            </button>
                        </form>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {!user ? (
                            <>
                                <Link href="/login" className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg font-semibold shadow">
                                    Masuk
                                </Link>
                                <Link href="/register" className="text-dark hover:bg-secondary px-4 py-2 rounded-lg shadow font-semibold">
                                    Daftar
                                </Link>
                            </>
                        ) : (
                            <>
                                <Sun className="w-5 h-5 text-dark cursor-pointer hover:text-accent" />
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 bg-primary text-white font-bold flex items-center justify-center"
                                    >
                                        {user.name.charAt(0).toUpperCase()}
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                                            <ul className="text-sm">
                                                <li>
                                                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-light">Dashboard</Link>
                                                </li>
                                                <li>
                                                    <Link href="/profile" className="block px-4 py-2 hover:bg-light">Profile</Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/logout"
                                                        method="post"
                                                        as="button"
                                                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-light"
                                                    >
                                                        Logout
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-dark">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                <nav className="hidden md:flex justify-center bg-dark text-light py-2 gap-6 border-t border-gray-800">
                    {categories.map((cat) => (
                        <Link key={cat.id} href={`/artikel/kategori/${cat.slug || cat.id}`} className="hover:text-secondary font-medium transition">
                            {cat.nama}
                        </Link>
                    ))}
                </nav>

                {isOpen && (
                    <div className="md:hidden bg-white shadow-md px-4 pb-6 pt-4 border-t space-y-6">
                        <ul className="space-y-3">
                            {categories.map((cat) => (
                                <li key={cat.id}>
                                    <Link href={`/artikel/kategori/${cat.slug || cat.id}`} className="text-dark hover:text-primary font-medium">
                                        {cat.nama}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {!user ? (
                            <div className="space-y-2">
                                <Link href="/login" className="block w-full text-center px-4 py-2 bg-primary text-white rounded-lg font-semibold">
                                    Masuk
                                </Link>
                                <Link href="/register" className="block w-full text-center px-4 py-2 border border-primary rounded-lg font-semibold text-primary">
                                    Daftar
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Link href="/profile" className="block w-full text-center px-4 py-2 bg-light rounded-lg font-semibold text-dark">
                                    Profil
                                </Link>
                                <Link href="/logout" method="post" as="button" className="block w-full text-center px-4 py-2 bg-red-500 text-white rounded-lg font-semibold">
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </header>

                       <main className="flex-1 container mx-auto px-4 py-8">{children}</main>


            <footer className="bg-secondary text-light py-8 px-4 border-t border-gray-700">
                <div className="max-w-xl mx-auto grid grid-cols-4 md:grid-cols-4 gap-8">
                    <div>
                        <img src="/images/Logoicon.png" alt="Technovate Logo" className="h-12 w-12 rounded-full mb-2 shadow" />
                        <h2 className="text-xl font-bold text-secondary">Technovate</h2>
                        <p className="text-sm mt-2 text-neutral-300 leading-relaxed">
                            Sumber terpercaya berita teknologi, inovasi, dan highlight harian dari dunia digital.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Kategori</h3>
                        <ul className="space-y-2 text-sm">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link href={`/artikel/kategori/${category.slug || category.id}`} className="hover:text-secondary transition">
                                        {category.nama}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Informasi</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/Technovate-profile" className="hover:text-secondary transition">
                                    Company Profile
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Perusahaan</h3>
                        <p className="text-sm text-neutral-400">Technovate Media Digital © 2025</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}