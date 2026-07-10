export type GoogleReview = {
  authorName: string;
  authorPhotoUrl: string | null;
  rating: number;
  text: string;
  relativeTime: string;
  time: number;
};

export type GoogleReviewsData = {
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
};

type PlaceDetailsReview = {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  relative_time_description: string;
  time: number;
};

// Legacy Places "Details" endpoint — same key/project already confirmed
// working via Find Place From Text when the Place ID was looked up.
const DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const placeId = process.env.GOOGLE_PLACES_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!placeId || !apiKey) return null;

  const url = new URL(DETAILS_URL);
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "rating,user_ratings_total,reviews");
  url.searchParams.set("language", "en");
  url.searchParams.set("key", apiKey);

  try {
    // Revalidated once a day — review counts move slowly, no need to hit
    // Google on every request.
    const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
    if (!res.ok) return null;

    const data = await res.json();
    if (data.status !== "OK" || !data.result) return null;

    const reviews: GoogleReview[] = ((data.result.reviews as PlaceDetailsReview[]) ?? [])
      .filter((r) => r.text?.trim().length > 0 && r.rating >= 3)
      .map((r) => ({
        authorName: r.author_name,
        authorPhotoUrl: r.profile_photo_url ?? null,
        rating: r.rating,
        text: r.text,
        relativeTime: r.relative_time_description,
        time: r.time,
      }));

    if (reviews.length === 0) return null;

    return {
      rating: data.result.rating ?? 0,
      totalReviews: data.result.user_ratings_total ?? 0,
      reviews,
    };
  } catch {
    return null;
  }
}
