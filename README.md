## Future improvements

Future improvements could include filtering by artist type(e.g., person, group) and country of origin. This would allow the app to recommend, for example, only bands or only solo artists from specific regions—such as British indie bands or Canadian solo performers—making the results more relevant to the user’s preferences or search context.

## Test Assignment: "Music Artist Recommendations"

This is a scaffold project for the take-home assignment. Your goal is to build a simple music artist recommendation tool using Next.js, React, and the MusicBrainz API.

### Phase #1: Basic Recommendations

Build a web application that allows users to get music artist recommendations based on a simple algorithm:

1.  **Artist Input:** Create a UI where a user can input a list of artist names.
2.  **Tag Calculation:** For the given artists, fetch their profiles from the [MusicBrainz API](https://musicbrainz.org/doc/MusicBrainz_API). From these profiles, calculate the 3 most popular **tags** (by total count across all found artists).
3.  **Recommendations:** Search for other artists on MusicBrainz who have all three of the popular tags you just calculated.
4.  **Display Results:** Display the first `n` (you can make this a configurable option, defaulting to 3) recommended artists. Ensure that the original artists from the input are not included in the recommendations.

### Technical Requirements

- **Framework:** Use [Next.js](https://nextjs.org/).
- **Language:** Use [TypeScript](https://www.typescriptlang.org/).
- **API Calls:** All calls to the MusicBrainz API should be made from the server-side, preferably using [Server Functions](https://react.dev/reference/rsc/server-functions).
- **Rendering:** Use Server-Side Rendering (SSR) and Server Components where it makes sense. The initial page load should present the user with the main interface.
- **Styling:** Use [Tailwind CSS](https://tailwindcss.com/) for styling. The quality of the UI/UX is important.
- **Error Handling:** The application should gracefully handle errors, such as when an artist is not found or the MusicBrainz API is unavailable.
- **Rate Limiting:** Be mindful of the [MusicBrainz API Rate Limiting rules](https://musicbrainz.org/doc/MusicBrainz_API/Rate_Limiting). You should include your contact information in the `User-Agent` header for your requests.

### (Optional) Phase #2: Improving Recommendations

Suggest how you might improve the quality of your recommendations. For example, you could consider using information on shared labels, the years artists were active, their country of
origin, etc. You can either implement these ideas or describe them in the `README.md`.

### (Optional) Phase #3: AI-Enhanced Recommendations

Enhance the recommendation system with AI-powered conversational features:

#### AI-Enhanced Recommendations Interface

Implement a chat-like interface that allows users to:

- Ask questions about recommendations (e.g., "Show me more electronic artists", "I want something from the 90s")
- Get personalized descriptions for each artist that was recommended

#### Technical Requirements for AI Integration

- **Provider Support:** Support selected AI provider of your choice (Google Gemini, OpenAI, Anthropic, etc.) with ability to switch between providers through environment variables
- **Conversational State:** Maintain conversation context across multiple interactions
- **Semantic Analysis:** Use AI to analyze tags relationships and generate meaningful descriptions

### Example User Flow

1. User inputs initial artists → Gets basic recommendations
2. AI generates personalized descriptions for each recommendation
3. User asks: "Show me more electronic artists" → AI refines recommendations
4. AI explains the connection: "These artists share approaches to [specific tag]"
5. User can continue the conversation to further refine results

## Getting Started

To get started, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Good luck!

## Links

- [API Documentation](https://musicbrainz.org/doc/MusicBrainz_API)

- [Detailed Search Documentation](https://musicbrainz.org/doc/MusicBrainz_API/Search)

- [Rate Limiting](https://musicbrainz.org/doc/MusicBrainz_API/Rate_Limiting)

## License

Proprietary.

Copyright © 2025
