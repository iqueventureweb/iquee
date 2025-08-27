"use client";

import { useState } from "react";
import { AnimationWrapper } from "../AnimationWrapper";

interface CommentFormProps {
  blogId: string;
}

export function CommentForm({ blogId }: CommentFormProps) {
  const [formData, setFormData] = useState({
    authorName: "",
    authorEmail: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          blog: blogId,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Don't reset form data - keep it for user reference
        // setFormData({ authorName: "", authorEmail: "", comment: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear success/error messages when user starts typing again
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  };

  const handleNewComment = () => {
    // Reset form for a new comment
    setFormData({ authorName: "", authorEmail: "", comment: "" });
    setSubmitStatus("idle");
  };

  return (
    <section className="py-16 mt-4 bg-gradient-to-br from-neutral-50 to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <AnimationWrapper delay={0.2} duration={0.6}>
          <header className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-['Epilogue'] text-neutral-900 mb-4">
              Post Comment
            </h2>
            <p className="text-neutral-600 font-['DM_Sans'] text-base">
              Your email address will not be published.
            </p>
          </header>
        </AnimationWrapper>

        <AnimationWrapper delay={0.1} duration={0.9}>
          <div className="bg-white rounded-3xl border border-neutral-200/60 shadow-lg p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="authorName" className="sr-only">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="authorName"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleInputChange}
                    placeholder="Your Name*"
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all duration-200 font-['DM_Sans'] text-neutral-700 placeholder-neutral-500"
                  />
                </div>
                <div>
                  <label htmlFor="authorEmail" className="sr-only">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="authorEmail"
                    name="authorEmail"
                    value={formData.authorEmail}
                    onChange={handleInputChange}
                    placeholder="Your Email*"
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all duration-200 font-['DM_Sans'] text-neutral-700 placeholder-neutral-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="comment" className="sr-only">
                  Your Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="Your Comment*"
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all duration-200 font-['DM_Sans'] text-neutral-700 placeholder-neutral-500 resize-none"
                />
              </div>

              <div className="text-center space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white font-semibold font-['Epilogue'] px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </button>

                {submitStatus === "success" && (
                  <div className="text-center p-4 bg-green-50 border border-green-200 rounded-2xl">
                    <p className="text-green-700 font-['DM_Sans'] mb-3">
                      Comment submitted successfully!
                    </p>
                    <button
                      type="button"
                      onClick={handleNewComment}
                      className="text-green-600 hover:text-green-700 font-['DM_Sans'] text-sm font-medium underline underline-offset-2 hover:no-underline transition-all duration-200"
                    >
                      Post Another Comment
                    </button>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="text-center p-4 bg-red-50 border border-red-200 rounded-2xl">
                    <p className="text-red-700 font-['DM_Sans']">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}
