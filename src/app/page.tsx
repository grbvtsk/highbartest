"use client";

import { useActionState } from "react";
import { State } from "@/lib/definitions";
import { getRecommendations } from "@/server/actions";

const initialState: State = {
  artists: [],
  recommendations: [],
  message: null,
};

export default function Home() {
  const [state, formAction] = useActionState(getRecommendations, initialState);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Music Artist Recommendations</h1>
      <form action={formAction} className="flex flex-col gap-4 w-full max-w-md">
        <label htmlFor="artists" className="text-lg">
          Enter artist names (one per line)
        </label>
        <textarea
          id="artists"
          name="artists"
          rows={5}
          className="p-2 border rounded text-black"
          placeholder="e.g., The Beatles
Radiohead
Daft Punk"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Recommendations
        </button>
      </form>

      {state?.recommendations && state.recommendations.length > 0 && (
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-2xl font-bold">Recommendations</h2>
          <ul>
            {state.recommendations.map((artist: string) => (
              <li key={artist}>{artist}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
