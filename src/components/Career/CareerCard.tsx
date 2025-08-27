"use client";

import { Career } from "@/payload-types";
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";

interface CareerCardProps {
  career: Career;
}

export function CareerCard({ career }: CareerCardProps) {
  const getDepartmentColor = (department: string) => {
    const colors = {
      engineering: "from-blue-500 to-blue-600",
      design: "from-purple-500 to-purple-600",
      marketing: "from-green-500 to-green-600",
      sales: "from-orange-500 to-orange-600",
      operations: "from-gray-500 to-gray-600",
      finance: "from-red-500 to-red-600",
      hr: "from-pink-500 to-pink-600",
      other: "from-teal-500 to-teal-600",
    };
    return colors[department as keyof typeof colors] || colors.other;
  };

  return (
    <Link
      href={`/career/apply/${career.slug}`}
      className="group block relative bg-white rounded-3xl border border-neutral-200/60 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
    >
      {/* Gradient accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getDepartmentColor(career.department)}`}
      />

      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-neutral-50 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold font-['Epilogue'] text-neutral-900 mb-3 group-hover:text-teal-700 transition-colors duration-300">
              {career.title}
            </h3>
            <span
              className={`inline-block px-4 py-2 rounded-2xl text-sm font-semibold font-['DM_Sans'] bg-gradient-to-r ${getDepartmentColor(career.department)} text-white shadow-sm`}
            >
              {career.department.charAt(0).toUpperCase() +
                career.department.slice(1)}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="flex items-center text-neutral-600 font-['DM_Sans']">
            <MapPin className="w-5 h-5 mr-3 text-teal-500 flex-shrink-0" />
            <span className="text-sm">{career.location}</span>
          </div>
          <div className="flex items-center text-neutral-600 font-['DM_Sans']">
            <Clock className="w-5 h-5 mr-3 text-teal-500 flex-shrink-0" />
            <span className="text-sm">
              {career.type.charAt(0).toUpperCase() + career.type.slice(1)}
            </span>
          </div>
          <div className="flex items-center text-neutral-600 font-['DM_Sans']">
            <Users className="w-5 h-5 mr-3 text-teal-500 flex-shrink-0" />
            <span className="text-sm">{career.experience}</span>
          </div>
          {career.applicationDeadline && (
            <div className="flex items-center text-neutral-600 font-['DM_Sans']">
              <Calendar className="w-5 h-5 mr-3 text-teal-500 flex-shrink-0" />
              <span className="text-sm">
                Deadline:{" "}
                {new Date(career.applicationDeadline).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
          <div className="text-sm font-['DM_Sans'] text-neutral-500">
            {career.positions} position{career.positions > 1 ? "s" : ""}{" "}
            available
          </div>
          <div className="inline-flex items-center bg-gradient-to-r from-teal-600 to-cyan-600 group-hover:from-teal-700 group-hover:to-cyan-700 text-white font-semibold font-['Epilogue'] px-6 py-3 rounded-2xl transition-all duration-300 transform group-hover:scale-105 shadow-lg group-hover:shadow-xl">
            Apply Now
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
    </Link>
  );
}
