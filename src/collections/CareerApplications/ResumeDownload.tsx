"use client";

import { Media } from "@/payload-types";
import { Download } from "lucide-react";

interface ResumeDownloadProps {
  resume: Media;
}

export function ResumeDownload({ resume }: ResumeDownloadProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/media/${resume.id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = resume.filename || `resume-${resume.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">
        {resume.filename || "Resume"}
      </span>
      <button
        onClick={handleDownload}
        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
        title="Download Resume"
      >
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
}
