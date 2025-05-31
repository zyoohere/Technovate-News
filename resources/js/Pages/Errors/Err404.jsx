import { Head, Link } from "@inertiajs/react";

export default function Err404() {
    return (
        <>
            <Head title="404 Not Found" />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center px-4 text-center">
                <img
                    src="/images/404.svg"
                    alt="404 Not Found"
                    className="w-64 mb-8"
                    onError={(e) => (e.target.style.display = 'none')}
                />
                <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white">404</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 mb-6">
                    Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primaryHover transition"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </>
    );
}
