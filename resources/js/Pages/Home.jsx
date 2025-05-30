import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowRightCircle } from "lucide-react";

export default function Home({ artikels, categories, tags }) {
    const groupedByCategory = categories.map(category => ({
        ...category,
        articles: artikels.data.filter(article => article.category?.id === category.id)
    }));

    return (
        <AppLayout categories={categories}>
            <Head title="Beranda" />

            <section className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-12 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-10">
                        {/* Hero Artikel Utama */}
                        {artikels.data[0] && (
                            <div className="relative rounded-lg overflow-hidden h-64">
                                <img
                                    src={artikels.data[0].image ? `/storage/${artikels.data[0].image}` : "/images/default-article.jpg"}
                                    alt={artikels.data[0].title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-0 p-4 text-white">
                                    <span className="text-xs bg-blue-600 px-2 py-1 rounded-full">
                                        {artikels.data[0].category?.nama ?? "Umum"}
                                    </span>
                                    <h2 className="text-2xl font-bold mt-2 line-clamp-2">
                                        <Link href={`/artikel/${artikels.data[0].slug}`} className="hover:underline">
                                            {artikels.data[0].title}
                                        </Link>
                                    </h2>
                                    <p className="text-sm text-gray-300">
                                        {artikels.data[0].user.name} • {new Date(artikels.data[0].published_at).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Artikel Lainnya */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest News</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {artikels.data.slice(1, 7).map(article => (
                                    <Link key={article.id} href={`/artikel/${article.slug}`} className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
                                        <img
                                            src={article.image ? `/storage/${article.image}` : "/images/default-article.jpg"}
                                            alt={article.title}
                                            className="w-full h-40 object-cover"
                                            loading="lazy"
                                        />
                                        <div className="p-4 space-y-1">
                                            <span className="text-xs text-white bg-blue-600 px-2 py-1 rounded-full inline-block">
                                                {article.category?.nama ?? "Umum"}
                                            </span>
                                            <h3 className="text-md font-semibold mt-2 line-clamp-2">{article.title}</h3>
                                            <p className="text-xs text-gray-500">By {article.user.name}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-6 text-center">
                                <Link href="/artikel" className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                                    Lihat Semua Artikel <ArrowRightCircle className="ml-2 w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                        {/* Artikel per Kategori */}
                        {groupedByCategory.map(cat => cat.articles.length > 0 && (
                            <div key={cat.id} className="mt-10">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">{cat.nama}</h2>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {cat.articles.slice(0, 3).map(article => (
                                        <Link key={article.id} href={`/artikel/${article.slug}`} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
                                            <img
                                                src={article.image ? `/storage/${article.image}` : "/images/default-article.jpg"}
                                                alt={article.title}
                                                className="w-full h-32 object-cover rounded"
                                            />
                                            <h4 className="text-md font-semibold mt-2 line-clamp-2">{article.title}</h4>
                                            <p className="text-xs text-gray-500">{article.user.name}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-3 space-y-8">
                        {/* Artikel Terkini */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-3">🆕 Artikel Terkini</h2>
                            <div className="space-y-4">
                                {artikels.data.slice(0, 5).map(article => (
                                    <Link key={article.id} href={`/artikel/${article.slug}`} className="flex items-center space-x-3">
                                        <img
                                            src={article.image ? `/storage/${article.image}` : "/images/default-article.jpg"}
                                            alt={article.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div>
                                            <h4 className="text-sm font-medium line-clamp-2">{article.title}</h4>
                                            <p className="text-xs text-gray-500">{article.user.name}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Trending Artikel */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-3">🔥 Trending Artikel</h2>
                            <ul className="space-y-3">
                                {artikels.data.slice(0, 3).map((article, i) => (
                                    <li key={article.id}>
                                        <Link href={`/artikel/${article.slug}`} className="block text-sm hover:text-blue-600">
                                            #{i + 1} {article.title}
                                        </Link>
                                        <span className="text-xs text-gray-500">{article.user.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tag */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-3">📚 Tag</h2>
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <Link
                                        key={tag.id}
                                        href={`/tag/${tag.slug}`}
                                        className="bg-white hover:bg-blue-50 px-3 py-1 rounded-full border text-sm text-blue-600"
                                    >
                                        {tag.nama}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </AppLayout>
    );
}