import { EditorContent } from "@/components/EditorContent";
import { Blog } from "@/payload-types";
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

type BlogItem = Pick<
  Blog,
  "id" | "slug" | "title" | "author" | "content" | "createdAt"
>;

export default function BlogDetail({
  blog,
  suggestions = [],
}: {
  blog: BlogItem;
  suggestions: BlogItem[];
}) {
  const plain = toPlainText(blog?.content || "");
  const words = getWordsCount(plain);
  const minutes = Math.max(1, Math.ceil(words / wpm));
  const date = blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <>
      <article 
        className="py-10 lg:py-16 bg-white"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Navigation */}
          <nav className="mb-6" role="navigation" aria-label="Blog navigation">
            <Link
              href="/blogs"
              className="text-sm text-neutral-700 hover:underline"
              aria-label="Go back to all blogs"
            >
              ← Back to blogs
            </Link>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <h1 
              className="text-3xl lg:text-5xl font-medium font-['DM_Sans'] leading-tight text-neutral-900"
              itemProp="headline"
            >
              {blog?.title}
            </h1>

            {/* Article Meta */}
            <div 
              className="mt-4 flex flex-wrap gap-2"
              role="contentinfo"
              aria-label="Article metadata"
            >
              <div className="px-3 rounded-[20px] border border-neutral-900">
                <span 
                  className="text-xs font-['Epilogue'] uppercase tracking-wide text-neutral-900"
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <span itemProp="name">{blog?.author || "Unknown"}</span>
                </span>
              </div>
              {date ? (
                <div className="px-3 rounded-[20px] border border-neutral-900">
                  <time 
                    className="text-xs font-['Epilogue'] uppercase tracking-wide text-neutral-900"
                    dateTime={blog?.createdAt}
                    itemProp="datePublished"
                  >
                    {date}
                  </time>
                </div>
              ) : null}
              <div className="px-3 rounded-[20px] border border-neutral-900">
                <span className="text-xs font-['Epilogue'] uppercase tracking-wide text-neutral-900">
                  {minutes} min read
                </span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-black/5 mb-8">
            <div className="aspect-[16/9] relative">
              <Image
                src="https://placehold.co/960x540"
                alt={`Featured image for ${blog?.title}`}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 100vw, 100vw"
                priority
                itemProp="image"
              />
            </div>
          </div>

          {/* Article Content */}
          <div 
            itemProp="articleBody"
            className="prose prose-lg prose-neutral max-w-none"
          >
            <EditorContent
              className="prose prose-lg prose-neutral max-w-none"
              content={blog?.content || ""}
            />
          </div>

          {/* Article Schema Data */}
          <meta itemProp="wordCount" content={words.toString()} />
          <meta itemProp="timeRequired" content={`PT${minutes}M`} />
          <meta itemProp="publisher" content="iQue Ventures" />
          <meta itemProp="mainEntityOfPage" content={`https://ique.com/blogs/${blog?.slug}`} />
        </div>
      </article>

      {/* Related Articles */}
      {suggestions?.length ? (
        <section 
          className="bg-neutral-50"
          aria-labelledby="related-articles-title"
        >
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h2 
              id="related-articles-title"
              className="text-2xl md:text-3xl font-['Poppins'] text-neutral-900 mb-8"
            >
              More to read
            </h2>

            <div 
              className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              role="list"
              aria-label="Related blog articles"
            >
              {suggestions.map((s) => {
                const sPlain = toPlainText(s.content || "");
                const sMinutes = Math.max(
                  1,
                  Math.ceil(getWordsCount(sPlain) / wpm)
                );
                const sDate = s.createdAt
                  ? new Date(s.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "";

                return (
                  <article 
                    key={s.id}
                    className="group overflow-hidden rounded-2xl border bg-white shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md hover:ring-black/10"
                    role="listitem"
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                  >
                    <Link
                      href={`/blogs/${s.slug}`}
                      className="block"
                      aria-label={`Read full article: ${s.title}`}
                    >
                      <div className="h-40 bg-neutral-100 relative">
                        <Image
                          src="https://placehold.co/640x360"
                          alt={`Featured image for ${s.title}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          itemProp="image"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-[11px] uppercase tracking-wide">
                            <span itemProp="author" itemScope itemType="https://schema.org/Person">
                              <span itemProp="name">{s.author || "Unknown"}</span>
                            </span>
                          </span>
                          {sDate ? (
                            <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-[11px] uppercase tracking-wide">
                              <time dateTime={s.createdAt} itemProp="datePublished">
                                {sDate}
                              </time>
                            </span>
                          ) : null}
                          <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-[11px] uppercase tracking-wide">
                            {sMinutes.toString()} min read
                          </span>
                        </div>

                        <h3 
                          className="text-lg md:text-xl font-['Poppins'] text-neutral-900 group-hover:underline decoration-2 underline-offset-4"
                          itemProp="headline"
                        >
                          {s.title}
                        </h3>

                        <p 
                          className="mt-3 text-sm text-neutral-600 line-clamp-3"
                          itemProp="description"
                        >
                          {sPlain
                            .slice(0, 180)
                            .concat(sPlain.length > 180 ? "…" : "")}
                        </p>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
