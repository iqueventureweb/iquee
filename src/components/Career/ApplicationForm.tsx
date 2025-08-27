"use client";

import { Career } from "@/payload-types";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { AnimationWrapper } from "../AnimationWrapper";

interface ApplicationFormProps {
  career: Career;
}

export function ApplicationForm({ career }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("applicantName", formData.applicantName);
      formDataToSend.append("applicantEmail", formData.applicantEmail);
      formDataToSend.append("applicantPhone", formData.applicantPhone);
      formDataToSend.append("coverLetter", formData.coverLetter);
      formDataToSend.append("position", career.id);
      formDataToSend.append("resume", resumeFile);

      const response = await fetch("/api/career-applications", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus("success");
        // setFormData({
        //   applicantName: "",
        //   applicantEmail: "",
        //   applicantPhone: "",
        //   coverLetter: "",
        // });
        // setResumeFile(null);
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
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const removeFile = () => {
    setResumeFile(null);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <AnimationWrapper delay={0.2} duration={0.6}>
          <header className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold font-['Epilogue'] text-neutral-900 mb-4">
              Join Our Team as
            </h1>
            <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-2xl font-medium font-['DM_Sans']">
              {career.title}
            </div>
          </header>
        </AnimationWrapper>

        <AnimationWrapper delay={0.4} duration={0.6}>
          <div className="bg-white rounded-3xl border border-neutral-200/60 shadow-lg p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="applicantName"
                    className="block text-sm font-medium font-['DM_Sans'] text-neutral-700 mb-2"
                  >
                    Your Name*
                  </label>
                  <input
                    type="text"
                    id="applicantName"
                    name="applicantName"
                    value={formData.applicantName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 font-['DM_Sans'] text-neutral-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="applicantEmail"
                    className="block text-sm font-medium font-['DM_Sans'] text-neutral-700 mb-2"
                  >
                    Your Email*
                  </label>
                  <input
                    type="email"
                    id="applicantEmail"
                    name="applicantEmail"
                    value={formData.applicantEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 font-['DM_Sans'] text-neutral-700"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="applicantPhone"
                  className="block text-sm font-medium font-['DM_Sans'] text-neutral-700 mb-2"
                >
                  Your Phone Number*
                </label>
                <input
                  type="tel"
                  id="applicantPhone"
                  name="applicantPhone"
                  value={formData.applicantPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 font-['DM_Sans'] text-neutral-700"
                />
              </div>

              <div>
                <label
                  htmlFor="coverLetter"
                  className="block text-sm font-medium font-['DM_Sans'] text-neutral-700 mb-2"
                >
                  Cover Letter (Optional)
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 font-['DM_Sans'] text-neutral-700 resize-none"
                  placeholder="Tell us why you're interested in this position..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium font-['DM_Sans'] text-neutral-700 mb-2">
                  Attach Your Resume*
                </label>
                <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-6 text-center hover:border-teal-400 transition-colors">
                  {!resumeFile ? (
                    <div>
                      <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                      <p className="text-sm text-neutral-600 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-neutral-500 mb-4">
                        PDF, DOC, DOCX, or image files (Max 5MB)
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                        id="resume-upload"
                        required
                      />
                      <label
                        htmlFor="resume-upload"
                        className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium font-['DM_Sans'] px-4 py-2 rounded-xl cursor-pointer transition-colors"
                      >
                        Choose File
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Upload className="w-5 h-5 text-teal-600 mr-2" />
                        <span className="font-['DM_Sans'] text-neutral-700">
                          {resumeFile.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !resumeFile}
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold font-['Epilogue'] px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? "Submitting..." : "Apply Now"}
                </button>
              </div>

              {submitStatus === "success" && (
                <div className="text-center p-4 bg-green-50 border border-green-200 rounded-2xl">
                  <p className="text-green-700 font-['DM_Sans']">
                    Application submitted successfully! We&apos;ll review your
                    application and get back to you soon.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="text-center p-4 bg-red-50 border border-red-200 rounded-2xl">
                  <p className="text-red-700 font-['DM_Sans']">
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}
            </form>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}
