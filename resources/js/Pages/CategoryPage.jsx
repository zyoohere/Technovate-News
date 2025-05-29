import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function CategoryPage({ category, artikels, categories }) {
    return (
        
        <AppLayout categories={categories}>
            <Head title={`${category.nama}`} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* Header Kategori */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold uppercase tracking-wide text-white bg-blue-600 px-3 py-1 rounded-full shadow">
                            {category.nama ?? 'Umum'}
                        </span>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Artikel dalam Kategori "{category.nama}"
                        </h2>
                    </div>
                </div>

                {/* List Artikel */}
                {artikels.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {artikels.map((artikel) => (
                            <Link
                                key={artikel.id}
                                href={`/artikel/${artikel.slug}`}
                                className="group block rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-500 transition-all bg-white"
                            >
                                <img
                                    src={`/storage/${artikel.image}`}
                                    alt={artikel.title}
                                    onError={(e) => { e.target.src = '/default-image.jpg'; }}
                                    className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-300"
                                />
                                <div className="p-4 space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-2">
                                        {artikel.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-3">
                                        {artikel.excerpt}
                                    </p>
                                    {artikel.created_at && (
                                        <p className="text-xs text-gray-400">
                                            Dipublikasikan pada {new Date(artikel.created_at).toLocaleDateString('id-ID')}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-600 text-lg">Belum ada artikel dalam kategori ini.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
