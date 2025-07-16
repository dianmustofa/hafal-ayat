// File: /pages/mode/[mode].js

import { useRouter } from "next/router";
import { useState } from "react";
import { suratList } from "../../data/suratList";

export default function PilihSurat() {
  const router = useRouter();
  const { mode } = router.query;
  const [surat, setSurat] = useState(1);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(7);

  const handleMulai = () => {
    router.push(`/game/${mode}?surat=${surat}&start=${start}&end=${end}`);
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
