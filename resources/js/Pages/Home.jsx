import AppLayout from "@/Layouts/AppLayout";
import MediaSection from "@/Components/MediaSection";
import { Head, Link } from "@inertiajs/react";
import { ArrowRightCircle } from "lucide-react";

export default function Home({ artikels, categories, tags, media }) {
    const groupedByCategory = categories.map(category => ({
        ...category,
        articles: artikels.data.filter(article => article.category?.id === category.id),
    }));

    return (
        <AppLayout categories={categories}>
            <Head title="Beranda" />

            <section className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-1 gap-6">
                    {/* MAIN CONTENT */}
                    <div className="lg:col-span-9 space-y-10">
                        {/* HERO UTAMA */}
                        {artikels.data[0] && (
                            <div className="relative rounded-xl overflow-hidden h-64 shadow-lg group">
                                <img
                                    src={artikels.data[0].image ? `/storage/${artikels.data[0].image}` : "/images/default-article.jpg"}
                                    alt={artikels.data[0].title}
                                    onError={(e) => e.target.src = "/images/default-article.jpg"}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-0 p-4 text-white">
                                    <span className="text-xs bg-blue-600 px-2 py-1 rounded-full font-medium">
                                        {artikels.data[0].category?.nama ?? "Umum"}
                                    </span>
                                    <h2 className="text-2xl font-bold mt-2 line-clamp-2">
                                        <Link href={`/artikel/${artikels.data[0].slug}`} className="hover:underline">
                                            {artikels.data[0].title}
                                        </Link>
                                    </h2>
                                    <p className="text-sm text-gray-300 mt-1">
                                        {artikels.data[0].user.name} • {new Date(artikels.data[0].published_at).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* ARTIKEL TERBARU */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📰 Artikel Terbaru</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {artikels.data.slice(1, 7).map(article => (
                                    <Link key={article.id} href={`/artikel/${article.slug}`} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition overflow-hidden">
                                        <img
                                            src={article.image ? `/storage/${article.image}` : "/images/default-article.jpg"}
                                            alt={article.title}
                                            onError={(e) => e.target.src = "/images/default-article.jpg"}
                                            className="w-full h-40 object-cover"
                                            loading="lazy"
                                        />
                                        <div className="p-4">
                                            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full inline-block mb-2">
                                                {article.category?.nama ?? "Umum"}
                                            </span>
                                            <h3 className="text-md font-semibold text-gray-800 dark:text-white line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">By {article.user.name}</p>
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
                        <MediaSection media={media} />
                        {/* ARTIKEL PER KATEGORI */}
                        {groupedByCategory.map(cat => cat.articles.length > 0 && (
                            <div key={cat.id} className="mt-10">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{cat.nama}</h2>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {cat.articles.slice(0, 3).map(article => (
                                        <Link key={article.id} href={`/artikel/${article.slug}`} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition">
                                            <img
                                                src={article.image ? `/storage/${article.image}` : "/images/default-article.jpg"}
                                                alt={article.title}
                                                className="w-full h-32 object-cover rounded"
                                            />
                                            <h4 className="text-md font-semibold mt-2 text-gray-800 dark:text-white line-clamp-2">
                                                {article.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{article.user.name}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </section>
            {/* Media  */}
            <section className="bg-gray-100 dark:bg-gray-900 py-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">📺 Media Terbaru</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tags.map(tag => (
                            <Link key={tag.id} href={`/tag/${tag.slug}`} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition p-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{tag.nama}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tag.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <section className="bg-gray-50 dark:bg-gray-800 py-10">
                <div className="container mx-auto px-4">

                </div>
            </section>

        </AppLayout>
    );
}
