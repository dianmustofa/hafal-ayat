import { useRouter } from "next/router";
import { useState } from "react";
import { suratList } from "../../data/suratList";

export default function PilihSurat() {
  const router = useRouter();
  const { mode } = router.query;

  const [surat, setSurat] = useState(1);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(3);
  const [ayat, setAyat] = useState(1);

  const handleMulai = () => {
    if (mode === "tebak-kata") {
      router.push(`/game/${mode}?surat=${surat}&start=${start}&end=${end}`);
    } else if (mode === "susun-ayat") {
      router.push(`/mode/susun-ayat?surat=${surat}&ayat=${ayat}`);
    } else {
      alert("Mode tidak dikenali");
    }
  };

  const getNamaSurat = (id) => {
    const s = suratList.find((s) => s.id === parseInt(id));
    return s?.nama || `Surat ${id}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Mode: {mode?.replace("-", " ").toUpperCase()}
        </h2>

        <div className="space-y-4">
          {/* Pilih Surat */}
          <div>
            <label className="block mb-1 text-sm text-gray-700 font-medium">
              Pilih Surat:
            </label>
            <select
              className="w-full border border-gray-300 px-3 py-2 rounded"
              value={surat}
              onChange={(e) => setSurat(e.target.value)}
            >
              {suratList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id}. {s.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Input Ayat atau Range Ayat */}
          {mode === "tebak-kata" && (
            <div className="flex gap-2">
              <input
                className="w-1/2 border border-gray-300 px-3 py-2 rounded"
                type="number"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                placeholder="Dari Ayat"
              />
              <input
                className="w-1/2 border border-gray-300 px-3 py-2 rounded"
                type="number"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                placeholder="Sampai Ayat"
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
                placeholder="Contoh: 1"
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
