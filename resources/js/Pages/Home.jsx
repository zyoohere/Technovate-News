import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowRightCircle } from "lucide-react";

export default function Home({ artikels, categories }) {
    return (
        <AppLayout categories={categories}>
            <Head title="Beranda" />

            <section className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Artikel Terbaru</h1>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        {/* Artikel utama */}
                        {artikels.data.slice(0, 1).map(article => (
                            <div key={article.id} className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden">
                                <img
                                    src={article.image ? `/storage/${article.image}` : '/images/default-article.jpg'}
                                    alt={article.title}
                                    className="w-full h-64 object-cover"
                                    loading="lazy"
                                />
                                <div className="p-4 space-y-2">
                                    <Link href={`/artikel/${article.slug}`} className="block hover:text-blue-600 transition">
                                        <span className="text-xs text-white bg-blue-600 px-2 py-1 rounded-full">
                                            {article.category?.nama ?? 'Umum'}
                                        </span>
                                        <h2 className="text-xl font-bold mt-2 line-clamp-2">{article.title}</h2>
                                    </Link>
                                    <span className="text-sm text-gray-500">{article.user.name}  •  {new Date(article.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>

                                </div>
                            </div>
                        ))}

                        {/* Artikel lainnya */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {artikels.data.slice(1, ).map(article => (
                                <div key={article.id} className="bg-white rounded-lg shadow hover:shadow-md transition duration-300 overflow-hidden">
                                    <img
                                        src={article.image ? `/storage/${article.image}` : '/images/default-article.jpg'}
                                        alt={article.title}
                                        className="w-full h-40 object-cover"
                                        loading="lazy"
                                    />
                                    <div className="p-4 space-y-1">
                                        <Link href={`/artikel/${article.slug}`} className="block hover:text-blue-600 transition">
                                            <span className="text-xs text-white bg-blue-600 px-2 py-1 rounded-full">
                                                {article.category?.nama ?? 'Umum'}
                                            </span>
                                            <h3 className="text-md font-semibold mt-2 line-clamp-2">{article.title}</h3>
                                        </Link>
                                        <p className="text-xs text-gray-500">By {article.user.name} • {article.published_at}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </section>

            <section className="bg-gray-50 py-8 mt-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Kategori</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                href={`#`}
                                className="bg-white hover:bg-blue-50 p-4 rounded-lg shadow text-center border border-gray-200 transition"
                            >
                                <span className="text-blue-600 font-semibold">{category.nama}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
