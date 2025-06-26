"use server";

import { State } from "@/lib/definitions";

// ### Phase #1
export async function getRecommendations(
  prevState: State,
  formData: FormData
): Promise<State> {
  const artists = formData.get("artists") as string;
  const artistList = artists.split("\n").filter((name) => name.trim() !== "");

  console.log("Artists submitted:", artistList);

  // TODO: Implement the logic to fetch data from MusicBrainz API
  // 1. For each artist in artistList, find their MusicBrainz ID.
  // 2. For each artist, get their tags.
  // 3. Calculate the 3 most popular tags.
  // 4. Find other artists with these 3 tags.
  // 5. Return the recommended artists.

  // For now, returning a dummy list.
  // The final implementation should return the new state.

  return {
    artists: artistList,
    recommendations: [], // This will be populated by the real logic
  };
}
