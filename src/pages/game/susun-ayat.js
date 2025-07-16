// File: /pages/mode/susun-ayat.js

import { useEffect, useState } from "react";
import suratList from "@/data/suratList"; // Pastikan ini sesuai path
import { useRouter } from "next/router";

export default function SusunAyat() {
  const [potongan, setPotongan] = useState([]);
  const [jawabanBenar, setJawabanBenar] = useState([]);
  const [jawabanUser, setJawabanUser] = useState([]);
  const [selesai, setSelesai] = useState(false);

  const router = useRouter();
  const surat = router.query?.surat || "Al-Fatihah";

  useEffect(() => {
    const ambilAyat = async () => {
      try {
        const response = await fetch(
          `https://equran.id/api/surat/${getSurahNumber(surat)}`
        );
        const data = await response.json();

        const ayat =
          data.ayat[0]?.teks_ar || "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ";

        const kata = ayat.split(" ");
        setJawabanBenar(kata);
        setPotongan(shuffleArray(kata));
        setJawabanUser([]);
      } catch (err) {
        console.error("Gagal mengambil ayat:", err);
      }
    };

    ambilAyat();
  }, [surat]);

  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const handleKlikKata = (kata, index) => {
    setJawabanUser([...jawabanUser, kata]);
    setPotongan(potongan.filter((_, i) => i !== index));
  };

  const cekJawaban = () => {
    const benar = JSON.stringify(jawabanUser) === JSON.stringify(jawabanBenar);
    setSelesai(benar);
  };

  return (
    <div className="min-h-screen bg-yellow-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-yellow-700 mb-6">
        🧩 Susun Ayat
      </h1>
      <p className="text-center text-gray-600 mb-4">
        Susun ayat berikut sesuai urutan yang benar.
      </p>

      <div className="max-w-2xl mx-auto mb-6">
        <div className="bg-white rounded-xl shadow p-4 min-h-[80px] flex flex-wrap gap-2 border border-yellow-300">
          {jawabanUser.map((kata, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded-full text-lg"
            >
              {kata}
            </span>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {potongan.map((kata, index) => (
            <button
              key={index}
              onClick={() => handleKlikKata(kata, index)}
              className="px-4 py-2 bg-white border border-yellow-300 rounded-lg shadow hover:bg-yellow-100 transition"
            >
              {kata}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={cekJawaban}
            className="px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
          >
            Cek Jawaban
          </button>
        </div>

        {selesai && (
          <div className="mt-4 text-center text-green-600 font-semibold">
            ✅ Jawaban kamu benar! MasyaAllah!
          </div>
        )}
      </div>
    </div>
  );
}

// Fungsi untuk mapping nama surat ke nomor
function getSurahNumber(nama) {
  const mapping = {
    "Al-Fatihah": 1,
    "Al-Baqarah": 2,
    "Ali Imran": 3,
    "An-Nisa": 4,
    "Al-Ma'idah": 5,
    // Tambahkan sesuai kebutuhan
  };

  return mapping[nama] || 1;
}
