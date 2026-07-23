import { getGoogleReviews } from "@/lib/googleReviews";
import { TestimonialsClient } from "@/components/home/TestimonialsClient";

// Server wrapper: Google Places data is fetched here (revalidated daily,
// see lib/googleReviews.ts) and handed to the client component as a plain
// prop, keeping the API key and fetch off the client bundle entirely.
export async function TestimonialsSection() {
  const reviews = await getGoogleReviews();

  const placeId = process.env.GOOGLE_PLACES_ID;
  const writeHref = placeId
    ? `https://search.google.com/local/writereview?placeid=${placeId}`
    : undefined;
  const viewHref = placeId
    ? `https://www.google.com/maps/place/?q=place_id:${placeId}`
    : undefined;

  return <TestimonialsClient reviews={reviews} writeHref={writeHref} viewHref={viewHref} />;
}
