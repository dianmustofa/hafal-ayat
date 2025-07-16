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
    if (mode === "tebak-kata") {
      router.push(`/game/${mode}?surat=${suratSlug}&start=${start}&end=${end}`);
    } else if (mode === "susun-ayat") {
      router.push(`/mode/susun-ayat?surat=${suratSlug}&ayat=${ayat}`);
    } else {
      alert("Mode tidak dikenali");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Mode: {mode?.replace("-", " ").toUpperCase()}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-700 font-medium">
              Surat:
            </label>
            <select
              className="w-full border border-gray-300 px-3 py-2 rounded"
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
            <div className="flex gap-2">
              <input
                className="w-1/2 border border-gray-300 px-3 py-2 rounded"
                type="number"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                placeholder="Awal"
              />
              <input
                className="w-1/2 border border-gray-300 px-3 py-2 rounded"
                type="number"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
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
                value={ayat}
                onChange={(e) => setAyat(e.target.value)}
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
