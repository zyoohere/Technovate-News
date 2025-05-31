import { Bell } from 'lucide-react';

// Tambahkan di props komponen: { children, categories, notifications = [] }
export default function AppLayout({ children, categories, notifications = [] }) {
    // ...state lain
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifRef = useRef();

    // Tutup dropdown jika klik di luar
    useEffect(() => {
        function handleClickOutside(event) {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // ...return JSX
    return (
        // ...
        <nav className="hidden md:flex items-center gap-4">
            {/* Notifikasi */}
            {user && (
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        aria-label="Notifikasi"
                    >
                        <Bell size={20} />
                        {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                                {notifications.length}
                            </span>
                        )}
                    </button>
                    {isNotifOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold">
                                Notifikasi
                            </div>
                            <ul className="max-h-80 overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <li className="p-4 text-gray-500 dark:text-gray-400 text-sm text-center">
                                        Tidak ada notifikasi baru.
                                    </li>
                                ) : (
                                    notifications.map((notif, idx) => (
                                        <li key={idx} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                                            <div className="text-sm">{notif.message}</div>
                                            <div className="text-xs text-gray-400 mt-1">{notif.time}</div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            {/* ...lanjutkan dengan darkmode/user menu */}
        </nav>
        // ...
    );
}
