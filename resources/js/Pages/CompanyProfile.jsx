import React from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import AppLayout from "@/Layouts/AppLayout";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function CompanyProfile({ categories }) {
  return (
    <AppLayout categories={categories}>
      <Head title="Profil Perusahaan" />
      <motion.section
        className="max-w-6xl mx-auto dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-8 md:p-16 space-y-24 "
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* Header Perusahaan */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-start gap-10  rounded-2xl shadow-md p-8 bg-teal-50 dark:bg-gray-800"
          variants={fadeInUp}
        >
          <img
            src="/images/logoicon.png"
            alt="Logo Perusahaan"
            className="w-36 h-36 md:w-48 md:h-48 object-cover  dark:shadow-black/50"
          />
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r text-text-light bg-clip-text  mb-4">
              Technovate
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
              Kami adalah perusahaan teknologi yang mendorong pertumbuhan bisnis lokal melalui solusi digital inovatif.
            </p>
          </div>
        </motion.div>

        {/* Tentang Kami */}
        <motion.section variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Tentang Kami</h2>
          <p className="text-lg text-center max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-300">
            Didirikan pada tahun 2020, Technovate berkomitmen membantu UMKM dan perusahaan lokal dengan teknologi yang mudah diakses, efektif, dan berkelanjutan.
          </p>
        </motion.section>

        {/* Layanan Kami */}
        <motion.section variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">Layanan Kami</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Aplikasi Mobile",
                desc: "Membangun aplikasi native & hybrid untuk meningkatkan engagement pelanggan.",
              },
              {
                title: "Website & E-Commerce",
                desc: "Platform penjualan online & website bisnis dengan desain responsif dan SEO-friendly.",
              },
              {
                title: "Konsultasi Teknologi",
                desc: "Solusi strategis yang disesuaikan untuk transformasi digital perusahaan lokal.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-6 bg-teal-100 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-secondary mb-3">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimoni */}
        <motion.section variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">Apa Kata Klien</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {[
              {
                name: "Andi Setiawan",
                role: "CEO, ABC Corp.",
                text: "Aplikasi buatan Technovate meningkatkan efisiensi dan penjualan kami secara signifikan!",
              },
              {
                name: "Rina Pratama",
                role: "Founder, XYZ Store",
                text: "Tim mereka sangat profesional dan mampu menyesuaikan dengan kebutuhan bisnis kami.",
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="bg-teal-100 dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-sm hover:shadow-lg transition"
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900 dark:text-secondary ">{testimonial.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Kontak Kami */}
        <motion.section className="max-w-3xl mx-auto" variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Hubungi Kami</h2>
          <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
            <p><strong>Alamat:</strong> Jl. Teknologi No. 123, Jakarta, Indonesia</p>
            <p><strong>Email:</strong> <a href="mailto:contact@technovate.com" className="text-secondary  hover:underline dark:text-secondary ">contact@technovate.com</a></p>
            <p><strong>Telepon:</strong> +62 21 1234 5678</p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/62812345678" target="_blank" className="text-secondary hover:underline dark:text-secondary ">+62 812 3456 7890</a></p>
          </div>
        </motion.section>

        {/* Lokasi */}
        <motion.section variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Lokasi Kami</h2>
          <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18..."
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Lokasi Technovate"
            ></iframe>
          </div>
        </motion.section>
      </motion.section>
    </AppLayout>
  );
}
