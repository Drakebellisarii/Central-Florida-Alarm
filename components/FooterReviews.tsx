import { Star } from "lucide-react";
import { getGoogleReviews } from "@/lib/googleReviews";

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3.02h3.88c2.27-2.09 3.57-5.17 3.57-8.84Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3.02c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.62H1.27a12 12 0 0 0 0 10.76l4-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.62l4 3.11C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  );
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className ?? ""}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          strokeWidth={0}
          className={`h-3 w-3 ${i < Math.round(rating) ? "fill-[#FBBC05]" : "fill-white/15"}`}
        />
      ))}
    </div>
  );
}

// Right-hand footer column: rating summary plus a single review quote that
// crossfades through the featured reviews (CSS-only, see .footer-review-slide).
export async function FooterReviews() {
  const data = await getGoogleReviews();
  if (!data) return null;

  const placeId = process.env.GOOGLE_PLACES_ID;
  const writeHref = `https://search.google.com/local/writereview?placeid=${placeId}`;
  const viewHref = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  // The Places API caps out at 5 reviews; feature the three strongest,
  // one per author. Quotes render in full (never clipped), so prefer
  // shorter ones as the tiebreak — keeps the footer column compact instead
  // of a wall of text setting the height for all three rotating slides.
  const featured = [...data.reviews]
    .sort((a, b) => b.rating - a.rating || a.text.length - b.text.length)
    .filter((r, i, arr) => arr.findIndex((o) => o.authorName === r.authorName) === i)
    .slice(0, 3);

  return (
    <div className="max-w-sm">
      <h2 className="flex items-center gap-2.5 font-sans text-[0.6875rem] uppercase tracking-eyebrow text-white/40">
        <GoogleG className="h-3.5 w-3.5" />
        Reviews
      </h2>

      <div className="mt-4 flex items-center gap-2.5">
        <Stars rating={data.rating} />
        <span className="font-sans text-[0.8125rem] text-white/70">
          {data.rating.toFixed(1)} · {data.totalReviews.toLocaleString()} reviews
        </span>
      </div>

      {/* Slides stack in the same grid cell so the footer never shifts as
          quotes rotate, but each slide carries its own buttons — that way
          the buttons sit right under that slide's own text instead of
          pinned to the bottom of whichever slide is tallest. */}
      <div className="mt-6 grid">
        {featured.map((r, i) => (
          <figure
            key={r.time}
            className="footer-review-slide"
            style={{ animationDelay: `${i * 9}s` }}
          >
            <blockquote className="border-l-2 border-white/25 pl-4 font-display text-[0.9375rem] leading-relaxed text-white/70">
              &ldquo;{r.text}&rdquo;
            </blockquote>
            <figcaption className="mt-3 font-sans text-[0.75rem] text-white/40">
              {r.authorName} <span className="text-white/25">·</span> {r.relativeTime}
            </figcaption>

            <div className="mt-6 flex flex-wrap items-center gap-3 font-sans text-[0.75rem]">
              <a
                href={writeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/25 px-4 py-1.5 text-white/85 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                Leave a review
              </a>
              <a
                href={viewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/25 px-4 py-1.5 text-white/85 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                View all reviews
              </a>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
