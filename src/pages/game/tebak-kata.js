// File: /pages/game/tebak-kata.js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAyat } from "../../lib/quranApi";

export default function GameTebakKata() {
  const [soal, setSoal] = useState([]);
  const [index, setIndex] = useState(0);
  const [skor, setSkor] = useState(0);
  const [jawab, setJawab] = useState(null);

  const router = useRouter();
  const { surat, start, end } = router.query;

  useEffect(() => {
    if (surat && start && end) {
      getAyat(surat, start, end).then((ayatList) => {
        const soalList = ayatList.map((a) => {
          const words = a.text.arab.split(" ");
          const rand = Math.floor(Math.random() * words.length);
          const jawaban = words[rand];
          words[rand] = "____";
          return {
            text: words.join(" "),
            correct: jawaban,
            options: shuffle([jawaban, "الله", "يوم", "الناس"]),
          };
        });
        setSoal(soalList.slice(0, 10));
      });
    }
  }, [surat, start, end]);

  const handleJawab = (pilihan) => {
    const benar = pilihan === soal[index].correct;
    if (benar) setSkor(skor + 1);
    setJawab(pilihan);
    setTimeout(() => {
      setJawab(null);
      setIndex(index + 1);
    }, 1000);
  };

  if (!soal.length) return <p className="p-6">Loading...</p>;
  if (index >= soal.length)
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">
          Skor kamu: {skor} / {soal.length}
        </h2>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Kembali
        </button>
      </div>
    );

  const current = soal[index];

  return (
    <div className="p-6">
      <h3 className="text-lg mb-4 font-semibold">
        Soal {index + 1} dari {soal.length}
      </h3>
      <p className="text-2xl mb-6 text-center">{current.text}</p>
      <div className="grid grid-cols-2 gap-4">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleJawab(opt)}
            className={`p-3 border rounded ${
              jawab === opt
                ? opt === current.correct
                  ? "bg-green-300"
                  : "bg-red-300"
                : "bg-white"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
