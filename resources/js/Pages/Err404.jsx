import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

export default function Err404({ categories }) {
    return (
        <AppLayout categories={categories}>
            <Head title="404 Not Found" />

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                    <p className="text-xl text-gray-600 mb-6">Halaman tidak ditemukan</p>
                    <a href="/" className="text-blue-600 hover:underline">Kembali ke Beranda</a>
                </div>
            </div>
        </AppLayout>
    );
}