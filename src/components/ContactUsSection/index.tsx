"use client";

import { Info, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim()) {
      setMessage("Please enter your name");
      setMessageType("error");
      return;
    }

    if (!formData.email || !formData.email.includes("@")) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      setMessage("Please enter a message with at least 10 characters");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setMessageType("success");
        setFormData({ name: "", email: "", message: "" }); // Clear the form
      } else {
        setMessage(data.message || "An error occurred");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="py-4 pb-8 md:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between w-full">
          <div className="mb-12 lg:mb-16">
            <div className="text-sm font-medium font-['DM_Sans'] uppercase leading-none tracking-wide text-neutral-500 mb-4">
              Contact Us
            </div>
            <h2 className="text-3xl lg:text-6xl font-medium font-['DM_Sans'] leading-[1.3] lg:leading-[61.99px] text-black">
              Let&apos;s start the
              <br />
              productive work.
            </h2>
          </div>

          {/* Contact Info */}
          <div className="flex w-[47.5%] flex-col md:flex-row gap-8 lg:gap-16 mb-12 lg:mb-16">
            {/* Say Hello */}
            <div className="border-l border-neutral-200 pl-8 w-full">
              <div className="relative mb-6">
                <Mail className="w-12 h-9 text-black" />
              </div>
              <h3 className="text-lg font-medium font-['DM_Sans'] leading-snug text-black mb-4">
                Say hello
              </h3>
              <div className="space-y-2">
                <p className="text-base font-normal font-['DM_Sans'] leading-relaxed text-neutral-500">
                  info@ique.com
                </p>
                <p className="text-base font-normal font-['DM_Sans'] leading-relaxed text-neutral-500">
                  +91 - 9020103335
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="border-l border-neutral-200 pl-8 w-full">
              <div className="mb-6">
                <MapPin className="w-8 h-12 text-black" />
              </div>
              <h3 className="text-lg font-medium font-['DM_Sans'] leading-snug text-black mb-4">
                Location&apos;s
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-base font-normal font-['DM_Sans'] leading-relaxed text-neutral-500">
                  Kerala
                </span>
                <span className="text-base font-normal font-['DM_Sans'] leading-relaxed text-neutral-500">
                  |
                </span>
                <span className="text-base font-normal font-['DM_Sans'] leading-relaxed text-neutral-500">
                  Karnataka
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Form */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-lg font-medium font-['DM_Sans'] leading-normal text-black mb-4">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full h-12 px-5 rounded border border-black/20 bg-white text-base font-normal font-['DM_Sans'] placeholder-zinc-500 focus:outline-none focus:border-black/40"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-lg font-medium font-['DM_Sans'] leading-normal text-black mb-4">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-12 px-5 rounded border border-black/20 bg-white text-base font-normal font-['DM_Sans'] placeholder-zinc-500 focus:outline-none focus:border-black/40"
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-lg font-medium font-['DM_Sans'] leading-normal text-black mb-4">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full h-32 px-5 py-3 rounded border border-black/20 bg-white text-base font-normal font-['DM_Sans'] placeholder-zinc-500 focus:outline-none focus:border-black/40 resize-none"
                required
              />
            </div>

            {/* Status Message */}
            {message && (
              <div
                className={`text-center text-sm font-medium p-3 rounded ${
                  messageType === "success"
                    ? "text-green-700 bg-green-100 border border-green-300"
                    : "text-red-700 bg-red-100 border border-red-300"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit Button and Terms */}
            <div className="space-y-4 flex flex-col md:flex-row justify-between">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="w-44 h-14 bg-black rounded text-white text-xs font-bold font-['DM_Sans'] uppercase leading-tight tracking-wide hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {/* Terms and Privacy */}
              <div className="flex w-full sm:w-1/2 items-start gap-2 text-sm font-normal font-['DM_Sans'] leading-tight text-neutral-500">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div className="flex flex-wrap items-start ml-1">
                  <span>
                    All the fields are required. By sending the form you agree
                    to the
                  </span>
                  <div className="flex gap-1 mt-1">
                    <Link
                      href="#"
                      className="underline hover:text-black transition-colors"
                    >
                      Terms & Conditions
                    </Link>
                    <span>and</span>
                    <Link
                      href="#"
                      className="underline hover:text-black transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                  <span className="mt-1">.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-96 bg-stone-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007%2C%20USA!5e0!3m2!1sen!2sin!4v1645000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
