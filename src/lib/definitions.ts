export type State = {
  artists: string[];
  message?: string | null;
  recommendations: string[];
};

// ### (Optional) Phase #3
export type ArtistRecommendation = {
  name: string;
  tags: string[];
  description?: string;
  musicbrainzId?: string;
};

export type AIProvider = "google";
