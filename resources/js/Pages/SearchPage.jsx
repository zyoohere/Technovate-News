import AppLayout from '@/Layouts/AppLayout';
import React from 'react';

export default function SearchPage({ categories, artikels, query }) {
    return (
        <AppLayout categories={categories}>
            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                {/* Search Result Title */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
                    Hasil Pencarian untuk "<span className="text-indigo-600">{query}</span>"
                </h1>

                {/* Conditional Rendering for Articles */}
                {artikels.data.length === 0 ? (
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <p className="text-lg text-gray-700">
                            Maaf, tidak ada artikel yang ditemukan untuk pencarian Anda.
                        </p>
                        <p className="text-md text-gray-500 mt-2">
                            Coba kata kunci lain atau jelajahi kategori kami.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {artikels.data.map(article => (
                            <div key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                                <div className="p-5">
                                     <img
                                    src={`/storage/${article.image}`}
                                    alt={article.title}
                                    className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-300"
                                />
                                    <h2 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                                        <a href={`/artikel/${article.slug}`} className="hover:text-indigo-600 transition-colors duration-200">
                                            {article.title}
                                        </a>
                                    </h2>
                                    <p className="text-gray-600 text-base mb-4 line-clamp-3">
                                        {article.excerpt}
                                    </p>
                                    <div className="text-sm text-gray-500 flex items-center justify-between">
                                        <span>Oleh <span className="font-semibold">{article.user.name}</span></span>
                                        <span>{new Date(article.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}