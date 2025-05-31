import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function CategoryPage({ category, artikels, categories }) {
    return (
        <AppLayout categories={categories}>
            <Head title={`${category.nama}`} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
                <div className="space-y-4 text-center">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-white bg-primary px-4 py-1 rounded-full shadow-md">
                        {category.nama ?? 'Umum'}
                    </span>
                    <h2 className="text-3xl font-bold text-primary dark:text-white">
                        Artikel dalam Kategori "{category.nama}"
                    </h2>
                </div>

                {/* Daftar Artikel */}
                {artikels.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {artikels.map((article) => (
                            <Link
                                key={article.id}
                                href={`/artikel/${article.slug}`}
                                className="group bg-surface-light dark:bg-gray-800  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                            >
                                <img
                                    src={`/storage/${article.image}`}
                                    alt={article.title}
                                    onError={(e) => { e.target.src = '/default-image.jpg'; }}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="p-5 space-y-3">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-text-light dark:group-hover:text-text-light transition">
                                        {article.title}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                                        {article.excerpt}
                                    </p>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between">
                                        <span>
                                            Oleh <span className="font-medium">{article.user.name}</span>
                                        </span>
                                        <span>
                                            {new Date(article.published_at).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <p className="text-gray-600 dark:text-gray-300 text-lg">Belum ada artikel dalam kategori ini.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
