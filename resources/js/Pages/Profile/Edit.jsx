import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Save, RotateCw } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Profile({ user, categories, flash }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: '',
    avatar: null,
  });

  const [previewAvatar, setPreviewAvatar] = useState(
    user.avatar ? `/storage/${user.avatar}` : null
  );

  // Tampilkan flash message dari server (jika ada)
  React.useEffect(() => {
    if (flash?.success) toast.success(flash.success);
    if (flash?.error) toast.error(flash.error);
  }, [flash]);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file) {
        // Validasi size max 2MB
        if (file.size > 2 * 1024 * 1024) {
          toast.error('⚠️ Ukuran file maksimal 2MB!');
          setData(name, null);
          setPreviewAvatar(user.avatar ? `/storage/${user.avatar}` : null);
          e.target.value = null; // reset input file
          return;
        }
        setData(name, file);
        setPreviewAvatar(URL.createObjectURL(file));
      }
    } else {
      setData(name, value);
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    post(route('profile.update'), {
      data: formData,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onSuccess: () => {
        toast.success('Profil berhasil diperbarui!');
        setPreviewAvatar(data.avatar ? URL.createObjectURL(data.avatar) : previewAvatar);
        reset('password', 'password_confirmation');
      },
      onError: () => {
        toast.error(' Gagal memperbarui profil.');
      },
    });
  };

  return (
    <AppLayout categories={categories}>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 transition-all">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            Pengaturan Profil
          </h2>

          {/* Avatar */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Foto Profil
            </label>
            <input
              type="file"
              name="avatar"
              onChange={handleChange}
              accept="image/*"
              className="block w-full text-sm text-gray-700 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
            {previewAvatar && (
              <img
                src={previewAvatar}
                alt="Preview"
                className="w-20 h-20 mt-3 rounded-full border object-cover"
              />
            )}
            {errors.avatar && <p className="text-red-500 text-sm mt-2">{errors.avatar}</p>}
          </div>

          {/* Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Alamat Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Ubah Password
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password Baru"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              onChange={handleChange}
              placeholder="Konfirmasi Password"
              className="mt-3 w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSave}
              disabled={processing}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                <Save className="w-5 h-5" />
              )}
              {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
            <button
              onClick={() => {
                reset();
                setPreviewAvatar(user.avatar ? `/storage/${user.avatar}` : null);
              }}
              className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-2 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <RotateCw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
