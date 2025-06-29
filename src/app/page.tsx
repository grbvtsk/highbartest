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
  const [state, formAction, isPending] = useActionState(
    getRecommendations,
    initialState
  );

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center
                     bg-gradient-to-br from-purple-700 via-purple-800 to-black
                     text-white px-4 py-16"
    >
      <div className="w-full max-w-xl bg-black/30 backdrop-blur-sm rounded-2xl p-10 shadow-2xl">
        <h1 className="text-4xl font-bold mb-8 text-purple-200 text-center">
          Music Artist Recommendations
        </h1>

        <form action={formAction} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="artists" className="text-lg font-medium">
              Enter artist names (one per line)
            </label>
            <textarea
              id="artists"
              name="artists"
              rows={5}
              className="p-3 rounded-lg bg-white/90 text-black outline-none focus:ring-4
                         focus:ring-purple-500 placeholder:text-gray-500"
              placeholder="e.g., The Beatles
Radiohead
Daft Punk"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-lg font-semibold transition
                       bg-gradient-to-r from-purple-500 to-purple-700
                       hover:from-purple-400 hover:to-purple-600
                       disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isPending ? "Loading…" : "Get Recommendations"}
          </button>
        </form>

        {state?.recommendations && state.recommendations.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
            <ul className="space-y-2 list-disc list-inside">
              {state.recommendations.map((artist: string) => (
                <li key={artist}>{artist}</li>
              ))}
            </ul>
          </div>
        )}

        {state.message && (
          <p className="mt-8 text-red-300 font-semibold text-center">
            {state.message}
          </p>
        )}
      </div>
    </main>
  );
}
