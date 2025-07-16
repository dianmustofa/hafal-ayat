// File: /utils/quranApi.js

export async function getAyat(suratId, start, end) {
  // const res = await fetch(`https://api.quran.gading.dev/surah/${suratId}`);
  const res = await fetch(`https://equran.id/api/surat//${suratId}`);
  const data = await res.json();

  if (!data?.data?.verses) {
    console.error("Verses not found in API response:", data);
    return [];
  }

  return data.data.verses.slice(start - 1, end);
}
