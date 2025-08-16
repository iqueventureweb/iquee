"use client";

import type { Blog } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { AnimationWrapper } from "../AnimationWrapper";

const wpm = 250;

function toPlainText(html: string) {
  return (html || "").replace(/<[^>]+>/g, "");
}

function getWordsCount(content: string) {
  if (!content) return 0;
  return content.split(/\s+/).filter((w) => w.length > 0).length;
}

function getFallbackImage(index: number): string {
  const fallbackImages = [
    "/blogs/up-up.webp",
    "/blogs/Possible.webp",
    "/blogs/motivation-ecosystem.webp",
  ];
  return fallbackImages[index % fallbackImages.length];
}

export default function BlogsListing({
  blogs,
  internal = false,
}: {
  blogs: Blog[];
  internal?: boolean;
}) {
  const items = (blogs || []).filter((b) => b?.slug);
  const [featured, ...rest] = items;
  return (
    <section
      className="py-16 lg:py-24 bg-neutral-100"
      aria-labelledby={internal ? "related-blogs-title" : "blogs-title"}
    >
      <div className="container mx-auto px-4">
        {!internal ? (
          <AnimationWrapper delay={0.2} duration={0.6}>
            <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white p-8 md:p-12 mb-12">
              <div
                className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-400/30 to-cyan-400/30 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-3 py-1 rounded-full border border-white/20 text-xs uppercase tracking-wide">
                    Our Blog
                  </span>
                  <span className="text-xs uppercase tracking-wide text-white/70">
                    {(items?.length || 0).toString()} posts
                  </span>
                </div>
                <h1
                  id="blogs-title"
                  className="text-3xl md:text-5xl font-medium font-['DM_Sans'] leading-tight"
                >
                  Insights & Stories from iQue
                </h1>
                <p className="mt-4 text-white/80 max-w-2xl">
                  Explore product thinking, venture insights, and stories from
                  our team.
                </p>
              </div>
              <div
                className="absolute bottom-4 right-4 opacity-70"
                aria-hidden="true"
              >
                <Image
                  src="/images/big-arrow.svg"
                  alt="Decorative arrow"
                  width={56}
                  height={56}
                />
              </div>
            </div>
          </AnimationWrapper>
        ) : (
          <AnimationWrapper delay={0.2} duration={0.6}>
            <h2
              id="related-blogs-title"
              className="text-3xl md:text-5xl mb-4 font-medium font-['DM_Sans'] leading-tight text-neutral-900"
            >
              You might also like
            </h2>
          </AnimationWrapper>
        )}

        {/* Show featured blog when not internal, otherwise show all blogs */}
        {!internal && featured && (
          <AnimationWrapper delay={0.4} duration={0.6}>
            <article
              className="group block mb-12"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              <Link
                href={`/blogs/${featured.slug}`}
                className="block"
                aria-label={`Read featured article: ${featured.title}`}
              >
                <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md transition-shadow">
                  <div className="grid md:grid-cols-5 gap-0">
                    <div className="md:col-span-2 h-48 md:h-full relative bg-neutral-100">
                      <Image
                        src={featured.blog_image || "/blogs/up-up.webp"}
                        alt={`Featured image for ${featured.title}`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 40vw, 100vw"
                        itemProp="image"
                      />
                    </div>
                    <div className="md:col-span-3 p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-xs uppercase tracking-wide">
                          Featured
                        </span>
                        <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-xs uppercase tracking-wide">
                          <span
                            itemProp="author"
                            itemScope
                            itemType="https://schema.org/Person"
                          >
                            <span itemProp="name">
                              {featured.author || "Unknown"}
                            </span>
                          </span>
                        </span>
                        {featured.createdAt ? (
                          <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-xs uppercase tracking-wide">
                            <time
                              dateTime={featured.createdAt}
                              itemProp="datePublished"
                            >
                              {new Date(featured.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </time>
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

                      <h2
                        className="text-2xl md:text-3xl font-['Poppins'] leading-snug text-neutral-900 group-hover:underline"
                        itemProp="headline"
                      >
                        {featured.title}
                      </h2>
                      <p
                        className="mt-3 text-neutral-600 line-clamp-3"
                        itemProp="description"
                      >
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
            </article>
          </AnimationWrapper>
        )}

        {/* Show rest of blogs or all blogs if internal */}
        <div
          className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label={internal ? "Related blog articles" : "All blog articles"}
        >
          {(internal ? items : rest).map((b, index) => {
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
              <article
                key={b.id + index}
                className="group overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow"
                role="listitem"
                itemScope
                itemType="https://schema.org/BlogPosting"
              >
                <Link
                  href={`/blogs/${b.slug}`}
                  className="block"
                  aria-label={`Read article: ${b.title}`}
                >
                  <AnimationWrapper
                    key={b.id + index}
                    delay={0.6 + index * 0.1}
                    duration={0.5}
                  >
                    <div className="h-44 bg-neutral-100 relative">
                      <Image
                        src={b.blog_image || getFallbackImage(index)}
                        alt={`Featured image for ${b.title}`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        itemProp="image"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-xs uppercase tracking-wide">
                          <span
                            itemProp="author"
                            itemScope
                            itemType="https://schema.org/Person"
                          >
                            <span itemProp="name">{b.author || "Unknown"}</span>
                          </span>
                        </span>
                        {date ? (
                          <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-xs uppercase tracking-wide">
                            <time
                              dateTime={b.createdAt}
                              itemProp="datePublished"
                            >
                              {date}
                            </time>
                          </span>
                        ) : null}
                        <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-xs uppercase tracking-wide">
                          {minutes.toString()} min read
                        </span>
                      </div>

                      <h3
                        className="text-lg md:text-xl font-['Poppins'] leading-snug text-neutral-900 group-hover:underline"
                        itemProp="headline"
                      >
                        {b.title}
                      </h3>

                      <p
                        className="mt-3 text-sm text-neutral-600 line-clamp-3"
                        itemProp="description"
                      >
                        {decoded
                          .slice(0, 200)
                          .concat(decoded.length > 200 ? "…" : "")}
                      </p>

                      <div className="mt-4 text-sm text-neutral-700 group-hover:underline">
                        Read more →
                      </div>
                    </div>
                  </AnimationWrapper>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
