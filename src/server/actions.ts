"use server";

import { State } from "@/lib/definitions";

const USER_AGENT =
  process.env.MUSICBRAINZ_USER_AGENT ??
  "MusicRecApp/0.1 (no-contact-set@example.com)";

async function fetchJSON<T = unknown>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!res.ok) {
    throw new Error(
      `MusicBrainz API error: ${res.status} ${res.statusText} for ${url}`
    );
  }
  return res.json();
}

async function findArtistByName(name: string) {
  const query = encodeURIComponent(`artist:${name}`);
  const url = `https://musicbrainz.org/ws/2/artist?query=${query}&fmt=json&limit=1`;
  const data = await fetchJSON<{ artists?: any[] }>(url);
  return data.artists?.[0] ?? null;
}

async function getArtistTags(mbid: string) {
  const url = `https://musicbrainz.org/ws/2/artist/${mbid}?fmt=json&inc=tags`;
  const data = await fetchJSON<{ tags?: { name: string; count?: number }[] }>(
    url
  );
  return data.tags ?? [];
}

export async function getRecommendations(
  _prev: State,
  formData: FormData
): Promise<State> {
  const raw = (formData.get("artists") as string | null) ?? "";
  const artistNames = raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  if (artistNames.length === 0) {
    return {
      artists: [],
      recommendations: [],
      message: "Please enter at least one artist.",
    };
  }

  try {
    const inputArtists: { id: string; name: string }[] = [];

    for (const name of artistNames) {
      const found = await findArtistByName(name);
      if (found) {
        inputArtists.push({ id: found.id, name: found.name });
      }
    }

    if (inputArtists.length === 0) {
      return {
        artists: artistNames,
        recommendations: [],
        message: "No matches found in MusicBrainz for the names you entered.",
      };
    }

    /** Агрегуємо всі теги. */
    const tagTotals: Record<string, number> = {};

    for (const { id } of inputArtists) {
      const tags = await getArtistTags(id);
      tags.forEach((t) => {
        if (t.name)
          tagTotals[t.name] = (tagTotals[t.name] ?? 0) + (t.count ?? 0);
      });
    }

    const topTags = Object.entries(tagTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag]) => tag);

    if (topTags.length < 3) {
      return {
        artists: artistNames,
        recommendations: [],
        message:
          "There are not enough popular tags to generate recommendations.",
      };
    }

    const tagQuery = topTags.map((t) => `tag:"${t}"`).join(" AND ");
    const recURL = `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(
      tagQuery
    )}&fmt=json&limit=20`;
    const recData = await fetchJSON<{ artists?: any[] }>(recURL);

    const excludeIds = new Set(inputArtists.map((a) => a.id));
    const recommendations: string[] = [];

    for (const art of recData.artists ?? []) {
      if (excludeIds.has(art.id)) continue;
      recommendations.push(art.name);
      if (recommendations.length >= 3) break;
    }

    return {
      artists: artistNames,
      recommendations,
      message:
        recommendations.length === 0
          ? "No suitable recommendations could be found."
          : null,
    };
  } catch (error) {
    console.error(error);
    return {
      artists: artistNames,
      recommendations: [],
      message:
        "We're sorry, there was an error contacting MusicBrainz. Please try again later.",
    };
  }
}
