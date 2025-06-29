import { ArtistRecommendation, AIProvider } from "@/lib/definitions";

// ### (Optional) Phase #3
export class AIService {
  private provider: AIProvider;

  constructor(provider: AIProvider = "google") {
    this.provider = provider;
  }

  // This is a free form implementation. You can implement any logic you want.
  async generateArtistDescriptions(
    inputArtists: ArtistRecommendation[]
  ): Promise<ArtistRecommendation[]> {
    // 1. For each artist, generate a description.
    const artistDescriptions = inputArtists.map((artist) => ({
      ...artist,
      description: "This is a description of the artist",
    }));

    // 2. Return the enhanced recommendations.
    return artistDescriptions;
  }
}
