// Struktur: Next.js (pages router) + TailwindCSS + Quran API
// File: /pages/index.js

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200">
      <header className="text-center py-16 px-4">
        <h1 className="text-5xl font-bold text-green-800 mb-4">
          🎮 Game Hafalan Quran
        </h1>
        <p className="text-gray-700 text-xl max-w-2xl mx-auto">
          Latih hafalanmu lewat game seru dan interaktif yang dirancang untuk
          para penghafal Quran dari semua usia.
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Link href="/mode/tebak-kata">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer border-t-4 border-green-500">
            <div className="text-5xl mb-4">🧠</div>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              Tebak Kata Hilang
            </h2>
            <p className="text-gray-600 text-sm">
              Tebak kata yang hilang dari ayat yang ditampilkan. Cocok untuk
              melatih ketelitian hafalanmu.
            </p>
          </div>
        </Link>

        <Link href="/mode/susun-ayat">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer border-t-4 border-blue-500">
            <div className="text-5xl mb-4">🧩</div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              Susun Ayat
            </h2>
            <p className="text-gray-600 text-sm">
              Susun potongan ayat menjadi urutan yang benar. Tantang kemampuan
              hafalanmu!
            </p>
          </div>
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-yellow-500">
          <div className="text-5xl mb-4">🚧</div>
          <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
            Mode Baru
          </h2>
          <p className="text-gray-600 text-sm">
            Mode permainan baru akan segera hadir. Tunggu ya!
          </p>
        </div>
      </section>

      <footer className="text-center py-10 text-sm text-gray-500 border-t">
        &copy; {new Date().getFullYear()} <strong>HafalanQuran</strong>. Dibuat
        dengan ❤️ untuk membantu menghafal Al-Qur'an.
      </footer>
    </div>
  );
}
