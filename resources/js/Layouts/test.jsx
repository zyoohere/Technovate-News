import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Moon, Sun,Search } from "lucide-react";

export default function AppLayout({ children }) {
  const { auth } = usePage().props;
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-background-dark text-text-default dark:text-text-dark">
      {/* Header */}
      <header className="bg-surface-light dark:bg-surface-dark shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold tracking-wide text-text-default dark:text-text-dark">
            Technovate
          </Link>

          {/* Search bar */}
          <div className="relative w-full max-w-md mx-4">
            <input
              type="text"
              placeholder="Cari artikel..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-default dark:text-text-dark placeholder:text-text-light dark:placeholder:text-text-soft"
            />
            <span className="absolute left-3 top-2.5 text-text-light dark:text-text-soft">
              <Search/>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Toggle Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-primary/10 dark:hover:bg-primaryHover/20 transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Auth */}
            {!auth.user ? (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primaryHover transition"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition"
                >
                  Daftar
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-2 font-semibold">
                  {auth.user.name}
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg shadow-lg z-50 hidden group-hover:block">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-primary/10 dark:hover:bg-primaryHover/10 transition"
                  >
                    Profil
                  </Link>
                  <Link
                    href="/logout"
                    method="post"
                    className="block px-4 py-2 hover:bg-primary/10 dark:hover:bg-primaryHover/10 transition"
                  >
                    Keluar
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      <footer className="bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-soft py-10 mt-auto border-t border-border-light dark:border-border-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Technovate. Semua Hak Dilindungi.</p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-primary transition">Tentang Kami</a>
            <a href="#" className="hover:text-primary transition">Kontak</a>
            <a href="#" className="hover:text-primary transition">Privasi</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
