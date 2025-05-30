import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

export default function CompanyProfile({ categories }) {
  return (
    <AppLayout categories={categories}>
      <Head title="Profil Perusahaan" />

      <section className="max-w-6xl mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-10 rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <img
            src="/images/logoicon.png"
            alt="Logo Perusahaan"
            className="w-36 h-36 md:w-48 md:h-48 object-cover rounded-xl shadow-md dark:shadow-black/50"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-wide text-gray-900 dark:text-white">
              Perusahaan XYZ
            </h1>
            <p className="max-w-lg text-lg text-gray-700 dark:text-gray-300">
              Kami adalah perusahaan yang berfokus pada inovasi teknologi, menyediakan solusi digital untuk membantu bisnis lokal berkembang.
            </p>
          </div>
        </div>

        {/* Tentang Kami */}
        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-center mb-6 tracking-tight text-gray-900 dark:text-white">
            Tentang Kami
          </h2>
          <p className="max-w-3xl mx-auto text-center text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Didirikan pada tahun 2020, Perusahaan XYZ memiliki misi untuk membantu bisnis lokal dengan solusi digital yang inovatif dan tepat guna. 
            Kami percaya bahwa teknologi yang tepat dapat mengubah cara bisnis berjalan, terutama untuk pasar lokal.
          </p>
        </section>

        {/* Layanan Kami */}
        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-center mb-6 tracking-tight text-gray-900 dark:text-white">
            Layanan Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Pengembangan Aplikasi Mobile</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                Kami membantu perusahaan lokal dalam mengembangkan aplikasi mobile yang user-friendly dan efisien untuk meningkatkan engagement pelanggan.
              </p>
            </div>
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Website dan E-Commerce</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                Solusi website dan e-commerce yang dapat membantu bisnis lokal untuk menjual produk mereka secara online dengan mudah dan aman.
              </p>
            </div>
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Konsultasi Teknologi</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                Memberikan saran strategis tentang pemanfaatan teknologi terbaik untuk mengoptimalkan operasi bisnis lokal.
              </p>
            </div>
          </div>
        </section>

        {/* Testimoni Klien Lokal */}
        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-center mb-6 tracking-tight text-gray-900 dark:text-white">
            Testimoni Klien Lokal
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-sm">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                "Perusahaan XYZ telah membantu kami mengembangkan aplikasi mobile yang meningkatkan penjualan kami secara signifikan."
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">Andi Setiawan</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">CEO, ABC Corp.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-sm">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                "Layanan mereka sangat profesional dan mereka benar-benar memahami kebutuhan bisnis lokal seperti kami."
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">Rina Pratama</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Founder, XYZ Store</p>
            </div>
          </div>
        </section>

        {/* Kontak Kami */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-center tracking-tight text-gray-900 dark:text-white">
            Kontak Kami
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            <p><strong>Alamat:</strong> Jl. Teknologi No. 123, Jakarta, Indonesia</p>
            <p><strong>Email:</strong> contact@perusahaanxyz.com</p>
            <p><strong>Telepon:</strong> +62 21 1234 5678</p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/62812345678" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">+62 812 3456 7890</a></p>
          </div>
        </section>

        {/* Peta Lokasi */}
        <section className="mt-16">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-6 tracking-tight text-gray-900 dark:text-white">
              Lokasi Kami
            </h2>
            <div className="w-full h-80 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md">
              {/* Peta Interaktif */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126562.90916936095!2d106.62857991412856!3d-6.179572612568941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e5b42d24bd5f%3A0x6b8c4b6e303dbf28!2sJakarta!5e0!3m2!1sen!2sid!4v1643653902690!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>

        {/* CTA - Hubungi Kami */}
        <section className="mt-16 text-center">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Hubungi Kami untuk Konsultasi Gratis
          </button>
        </section>

      </section>
    </AppLayout>
  );
}
