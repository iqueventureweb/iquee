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
      <article className="py-10 lg:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-6">
            <Link
              href="/blogs"
              className="text-sm text-neutral-700 hover:underline"
            >
              ← Back to blogs
            </Link>
          </div>

          <header className="mb-8">
            <h1 className="text-3xl lg:text-5xl font-medium font-['DM_Sans'] leading-tight text-neutral-900">
              {blog?.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              <div className="px-3 rounded-[20px] border border-neutral-900">
                <span className="text-xs font-['Epilogue'] uppercase tracking-wide text-neutral-900">
                  {blog?.author || "Unknown"}
                </span>
              </div>
              {date ? (
                <div className="px-3 rounded-[20px] border border-neutral-900">
                  <span className="text-xs font-['Epilogue'] uppercase tracking-wide text-neutral-900">
                    {date}
                  </span>
                </div>
              ) : null}
              <div className="px-3 rounded-[20px] border border-neutral-900">
                <span className="text-xs font-['Epilogue'] uppercase tracking-wide text-neutral-900">
                  {minutes} min read
                </span>
              </div>
            </div>
          </header>

          <div className="relative overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-black/5 mb-8">
            <div className="aspect-[16/9] relative">
              <Image
                src="https://placehold.co/960x540"
                alt={blog?.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          <EditorContent
            className="prose prose-lg prose-neutral max-w-none"
            content={blog?.content || ""}
          />
        </div>
      </article>

      {suggestions?.length ? (
        <div className="bg-neutral-50">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-['Poppins'] text-neutral-900 mb-8">
              More to read
            </h2>

            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                  <Link
                    key={s.id}
                    href={`/blogs/${s.slug}`}
                    className="group overflow-hidden rounded-2xl border bg-white shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md hover:ring-black/10"
                    aria-label={`Open ${s.title}`}
                  >
                    <div className="h-40 bg-neutral-100 relative">
                      <Image
                        src="https://placehold.co/640x360"
                        alt={s.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-[11px] uppercase tracking-wide">
                          {s.author || "Unknown"}
                        </span>
                        {sDate ? (
                          <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-[11px] uppercase tracking-wide">
                            {sDate}
                          </span>
                        ) : null}
                        <span className="px-3 py-1 rounded-[20px] border border-neutral-900 text-[11px] uppercase tracking-wide">
                          {sMinutes.toString()} min read
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl font-['Poppins'] text-neutral-900 group-hover:underline decoration-2 underline-offset-4">
                        {s.title}
                      </h3>

                      <p className="mt-3 text-sm text-neutral-600 line-clamp-3">
                        {sPlain
                          .slice(0, 180)
                          .concat(sPlain.length > 180 ? "…" : "")}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
