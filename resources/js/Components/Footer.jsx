import { Link } from "@inertiajs/react";

export default function Footer({categories}){
    return (
        <footer className="bg-white text-darkText py-10 mt-auto border-t-4 border-primary dark:bg-gray-800 dark:text-gray-200 dark:border-primary"> {/* Adjusted colors for better dark mode */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-8"> {/* Added gap */}
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <div className="text-2xl font-semibold text-primary">Technovate</div>
                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">Portal Berita Terpercaya di Indonesia</p>
                        <div className="mt-4 text-gray-500 dark:text-gray-400">
                            <span>&copy; {new Date().getFullYear()} Technovate. All rights reserved.</span> {/* Dynamic year */}
                        </div>
                    </div>
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <div className="font-semibold mb-3 text-lg text-primary">Kategori</div> 
                        <ul className="space-y-2 text-sm">
                            {categories.map((cat) => (
                                <li key={cat.id}>
                                    <Link
                                        href={`/artikel/kategori/${cat.slug || cat.id}`}
                                        className="hover:text-primary transition text-gray-700 dark:text-gray-300" 
                                    >
                                        {cat.nama}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <div className="font-semibold mb-3 text-lg text-primary">Ikuti Kami</div> 
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary transition text-gray-700 dark:text-gray-300 flex items-center gap-2"><img src="/icons/facebook.svg" alt="Facebook" className="h-5 w-5 invert dark:invert-0" /> Facebook</a></li> {/* Placeholder for icons */}
                            <li><a href="#" className="hover:text-primary transition text-gray-700 dark:text-gray-300 flex items-center gap-2"><img src="/icons/twitter.svg" alt="Twitter" className="h-5 w-5 invert dark:invert-0" /> Twitter</a></li>
                            <li><a href="#" className="hover:text-primary transition text-gray-700 dark:text-gray-300 flex items-center gap-2"><img src="/icons/instagram.svg" alt="Instagram" className="h-5 w-5 invert dark:invert-0" /> Instagram</a></li>
                        </ul>
                    </div>
                    <div className="mt-6 md:mt-0 text-center md:text-left">
                        <div className="font-semibold mb-3 text-lg text-primary">Kontak</div>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <li><a href="mailto:contact@technovate.com" className="hover:text-primary transition">Email: contact@technovate.com</a></li>
                            <li><a href="tel:+628123456789" className="hover:text-primary transition">Telp: +62 812 3456 789</a></li>
                            <li>Jl. Contoh No. 123, Bandung, Indonesia</li> 
                        </ul>
                    </div>
                </div>
            </footer>
    );
}