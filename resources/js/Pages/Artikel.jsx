import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Artikel({ artikels, categories, selectedKategori }) {
    const handleFilterChange = (e) => {
        router.get('/artikel-terbaru', {
            kategori: e.target.value || undefined, // hapus query jika kosong
        }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AppLayout categories={categories}>
            <div className="container mx-auto px-4 py-6">
                <Head title="Artikel" />
                <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Semua Artikel</h1>

                {/* Artikel Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artikels.data.map((artikel) => (
                        <div key={artikel.id} className="rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition duration-300 bg-white">
                            <div className="relative aspect-w-16 aspect-h-9">
                                <img
                                    src={artikel.image ? `/storage/${artikel.image}` : "/images/default-article.jpg"}
                                    alt={artikel.title}
                                    onError={(e) => e.target.src = "/images/default-article.jpg"}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-0 p-4 text-white">
                                    <span className="text-xs bg-blue-600 px-2 py-1 rounded-full font-medium">
                                        {artikel.category?.nama ?? "Umum"}
                                    </span>
                                    <h2 className="text-lg font-bold mt-2 line-clamp-2">
                                        <Link href={`/artikel/${artikel.slug}`} className="hover:underline">
                                            {artikel.title}
                                        </Link>
                                    </h2>
                                    <p className="text-sm text-gray-300 mt-1">
                                        {artikel.user.name} • {new Date(artikel.published_at).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Paginasi */}
                <div className="mt-8 flex justify-center space-x-2">
                    {artikels.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => router.get(link.url)}
                            className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
