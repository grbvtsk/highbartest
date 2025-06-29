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
export type ChatMessage = {
  role: string;
  content: string;
};

export type MBArtist = {
  id: string;
  name: string;
  type?: string;
  country?: string;
  tags?: { name: string; count?: number }[];
};

export type AIProvider = "google";
