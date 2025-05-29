import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Show({ artikels, categories, tags, comments, relatedArticles }) {
    const { data, setData, post, processing, reset } = useForm({
        artikel_id: artikels.id,
        content: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/artikel/komentar`, {
            onSuccess: () => {
                reset('content');
            },
        });
    };

    return (
        <AppLayout categories={categories}>
            <Head title={artikels.title} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    <Link href="/" className="hover:underline text-blue-600 dark:text-blue-400">Beranda</Link>
                    <span className="mx-2">›</span>
                    <span className="text-gray-700 dark:text-gray-300">{artikels.category?.nama || 'Berita'}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                    <div className="lg:col-span-8">
                        {/* Gambar Artikel */}
                        <div className="mb-8">
                            <img
                                src={`/storage/${artikels.image}`}
                                alt={artikels.title}
                                className="w-full h-auto rounded-2xl object-cover shadow-xl"
                                loading="lazy"
                            />
                        </div>

                        {/* Judul */}
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-snug mb-4">
                            {artikels.title}
                        </h1>

                        {/* Info Artikel */}
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-x-6 gap-y-2 mb-6">
                            <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
                                {artikels.category?.nama || 'Berita'}
                            </span>
                            <span className="font-medium">Ditulis oleh <strong>{artikels.user?.name}</strong></span>
                            <span>{new Date(artikels.created_at).toLocaleDateString()}</span>
                        </div>

                        {/* Like/Dislike Button */}
                        <div className="mb-6 flex space-x-4">
                            <button className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
                                <i className="fas fa-thumbs-up"></i> Like
                            </button>
                            <button className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200">
                                <i className="fas fa-thumbs-down"></i> Dislike
                            </button>
                        </div>

                        {/* Tombol Share */}
                        <div className="mb-6">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Bagikan:</span>
                            <div className="flex gap-4 mt-2">
                                <button className="text-blue-600 hover:text-blue-800 transition duration-200 flex items-center space-x-2">
                                    <i className="fab fa-twitter"></i> <span>Twitter</span>
                                </button>
                                <button className="text-green-600 hover:text-green-800 transition duration-200 flex items-center space-x-2">
                                    <i className="fab fa-whatsapp"></i> <span>WhatsApp</span>
                                </button>
                            </div>
                        </div>

                        {/* Konten Artikel */}
                        <article className="prose dark:prose-invert max-w-none mb-12">
                            <div dangerouslySetInnerHTML={{ __html: artikels.content }} />
                        </article>

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-4 mt-8">
                                {tags.map((tag) => (
                                    <Link
                                        href={`/tag/${tag.nama}`}
                                        key={tag.id}
                                        className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs font-medium px-4 py-2 rounded-full border border-blue-300 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                                    >
                                        #{tag.nama}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Artikel Terkait */}
                        <div className="mt-10">
                            <aside className="space-y-8 md:sticky md:top-24 h-fit">
                                <div className="bg-white rounded-xl shadow p-5">
                                    <h3 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-6">Artikel Terkait</h3>
                                    <div className="space-y-3">
                                        {relatedArticles.map((related) => (
                                            <div key={related.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hover:scale-105 transition-all duration-300">
                                                <Link href={`/artikel/${related.slug}`}  className="font-semibold text-lg text-gray-900 dark:text-white">{related.title}</Link>
                                                <div className="flex gap-4 items-start p-2 rounded-lg group-hover:bg-gray-50 transition">
                                                    <img
                                                        src={`/storage/${related.image}`}
                                                        alt={related.title}
                                                        className="w-20 h-20 object-cover rounded-md shadow"
                                                        loading="lazy"
                                                    />
                                                    <div>
                                                        <p className="text-xs text-gray-500">{related.user.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        </div>

                        {/* Komentar */}
                        <div className="mt-12">
                            <h4 className="text-2xl font-extrabold mb-6 text-gray-800 dark:text-white">
                                Tinggalkan Komentar
                            </h4>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <textarea
                                    className="w-full h-28 px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder:italic resize-none"
                                    rows={5}
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Tulis komentar kamu di sini..."
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                                >
                                    {processing ? "Mengirim..." : "Kirim Komentar"}
                                </button>
                            </form>

                            {/* Komentar List */}
                            {comments.length > 0 && (
                                <div className="mt-10 space-y-6">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex gap-6">
                                            {comment.user.avatar ? (
                                                <img
                                                    src={`/storage/${comment.user.avatar}`}
                                                    alt={comment.user.name}
                                                    className="w-12 h-12 rounded-full object-cover shadow-md"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold text-xl">
                                                    {comment.user.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <div className="text-sm font-semibold text-gray-700 dark:text-white mb-2">{comment.user.name}</div>
                                                <div className="text-gray-800 dark:text-gray-200">{comment.content}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tombol Back to Top */}
            <div className="fixed bottom-4 right-4 z-50">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
                    ↑
                </button>
            </div>
        </AppLayout>
    );
}
