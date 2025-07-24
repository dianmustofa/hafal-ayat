// File: /pages/mode/[mode].js

import { useRouter } from "next/router";
import { useState } from "react";
import { suratList } from "../../data/suratList";

export default function PilihSurat() {
  const router = useRouter();
  const { mode } = router.query;

  const [suratSlug, setSuratSlug] = useState("al-fatihah");
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(3);
  const [ayat, setAyat] = useState(1);

  const handleMulai = () => {
    const suratId = getSuratIdFromSlug(suratSlug);

    if (!suratId) {
      alert("Surat tidak ditemukan");
      return;
    }

    if (mode === "tebak-kata") {
      router.push(
        `/game/tebak-kata?surat=${suratId}&start=${start}&end=${end}`
      );
    } else if (mode === "susun-ayat") {
      router.push(`/game/susun-ayat?surat=${suratId}&ayat=${ayat}`);
    } else {
      alert("Mode tidak dikenali");
    }
  };

  const getSuratIdFromSlug = (slug) => {
    const found = suratList.find((s) => s.slug === slug);
    return found ? found.id : null;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Mode: {mode?.replace("-", " ").toUpperCase()}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm md:text-base text-gray-700 dark:text-gray-200 font-medium">
              Surat:
            </label>
            <select
              className="w-full border border-gray-300 px-3 py-2 rounded text-sm md:text-base bg-white text-gray-800"
              value={suratSlug}
              onChange={(e) => setSuratSlug(e.target.value)}
            >
              {suratList.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.id}. {s.nama}
                </option>
              ))}
            </select>
          </div>

          {mode === "tebak-kata" && (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                className="w-full sm:w-1/2 border border-gray-300 px-3 py-2 rounded text-gray-800"
                type="number"
                min="1"
                value={start}
                onChange={(e) => setStart(Number(e.target.value))}
                placeholder="Awal"
              />
              <input
                className="w-full sm:w-1/2 border border-gray-300 px-3 py-2 rounded text-gray-800"
                type="number"
                min="1"
                value={end}
                onChange={(e) => setEnd(Number(e.target.value))}
                placeholder="Akhir"
              />
            </div>
          )}

          {mode === "susun-ayat" && (
            <div>
              <label className="block mb-1 text-sm text-gray-700 font-medium">
                Ayat ke:
              </label>
              <input
                className="w-full border border-gray-300 px-3 py-2 rounded"
                type="number"
                min="1"
                value={ayat}
                onChange={(e) => setAyat(Number(e.target.value))}
              />
            </div>
          )}

          <button
            onClick={handleMulai}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-3 rounded-xl text-lg hover:scale-105 transition"
          >
            🎮 Mulai Game
          </button>
        </div>
      </div>
    </div>
  );
}
