import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

export default function Err404({ categories }) {
    return (
        <AppLayout categories={categories}>
            <Head title="500 Server Error" />

            <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
                <h1 className="text-6xl font-bold text-red-500">500</h1>
                <p className="mt-4 text-xl">Terjadi kesalahan di server.</p>
                <a href="/" className="mt-6 text-blue-500 underline">Coba lagi nanti</a>
            </div>
        </AppLayout>
    );
}