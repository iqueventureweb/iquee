import type { Blog } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";

const wpm = 250;

function toPlainText(html: string) {
  return (html || "").replace(/<[^>]+>/g, "");
}

function getWordsCount(content: string) {
  if (!content) return 0;
  return content.split(/\s+/).filter((w) => w.length > 0).length;
}

export default function BlogsListing({ blogs }: { blogs: Blog[] }) {
  const items = (blogs || []).filter((b) => b?.slug);
  const [featured, ...rest] = items;

  return (
    <section className="py-16 lg:py-24 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white p-8 md:p-12 mb-12">
          <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-400/30 to-cyan-400/30 blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full border border-white/20 text-xs uppercase tracking-wide">
                Our Blog
              </span>
              <span className="text-xs uppercase tracking-wide text-white/70">
                {(items?.length || 0).toString()} posts
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-medium font-['DM_Sans'] leading-tight">
              Insights & Stories from iQue
            </h1>
            <p className="mt-4 text-white/80 max-w-2xl">
              Explore product thinking, venture insights, and stories from our
              team.
            </p>
          </div>
          <div className="absolute bottom-4 right-4 opacity-70">
            <Image
              src="/images/big-arrow.svg"
              alt="Arrow"
              width={56}
              height={56}
            />
          </div>
        </div>

        {featured ? (
          <Link href={`/blogs/${featured.slug}`} className="group block mb-12">
            <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md transition-shadow">
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2 h-48 md:h-full relative bg-neutral-100">
                  <Image
                    src="https://placehold.co/960x720"
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                </div>
                <div className="md:col-span-3 p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-xs uppercase tracking-wide">
                      Featured
                    </span>
                    <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-xs uppercase tracking-wide">
                      {featured.author || "Unknown"}
                    </span>
                    {featured.createdAt ? (
                      <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-xs uppercase tracking-wide">
                        {new Date(featured.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    ) : null}
                    {(() => {
                      const decoded = toPlainText(featured.content || "");
                      const minutes = Math.max(
                        1,
                        Math.ceil(getWordsCount(decoded) / wpm)
                      );
                      return (
                        <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-xs uppercase tracking-wide">
                          {minutes} min read
                        </span>
                      );
                    })()}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-['Poppins'] leading-snug text-neutral-900 group-hover:underline">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-neutral-600 line-clamp-3">
                    {toPlainText(featured.content || "")
                      .slice(0, 260)
                      .concat(
                        toPlainText(featured.content || "").length > 260
                          ? "…"
                          : ""
                      )}
                  </p>

                  <div className="mt-4 text-sm text-neutral-700 group-hover:underline">
                    Read more →
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ) : null}

        {(!rest || rest.length === 0) && !featured ? (
          <p className="text-neutral-600">No blogs found.</p>
        ) : null}

        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((b) => {
            const decoded = toPlainText(b.content || "");
            const words = getWordsCount(decoded);
            const minutes = Math.max(1, Math.ceil(words / wpm));
            const date = b.createdAt
              ? new Date(b.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "";

            return (
              <Link
                key={b.id}
                href={`/blogs/${b.slug}`}
                className="group overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-44 bg-neutral-100 relative">
                  <Image
                    src="https://placehold.co/640x360"
                    alt={b.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-xs uppercase tracking-wide">
                      {b.author || "Unknown"}
                    </span>
                    {date ? (
                      <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-xs uppercase tracking-wide">
                        {date}
                      </span>
                    ) : null}
                    <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-xs uppercase tracking-wide">
                      {minutes.toString()} min read
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-['Poppins'] leading-snug text-neutral-900 group-hover:underline">
                    {b.title}
                  </h3>

                  <p className="mt-3 text-sm text-neutral-600 line-clamp-3">
                    {decoded
                      .slice(0, 200)
                      .concat(decoded.length > 200 ? "…" : "")}
                  </p>

                  <div className="mt-4 text-sm text-neutral-700 group-hover:underline">
                    Read more →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
