"use client";
import { Project } from "@/payload-types";
import { ChevronDownIcon } from "lucide-react";
import { KeyboardEvent, useId, useRef, useState } from "react";

interface FAQAccordionProps {
  faq: Project["faq"];
}

export function FAQAccordion({ faq }: FAQAccordionProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const sectionId = useId();

  const toggle = (index: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = (faq?.length ?? 0) - 1;
    if (last < 0) return;

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        const next = index === last ? 0 : index + 1;
        buttonsRef.current[next]?.focus();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const prev = index === 0 ? last : index - 1;
        buttonsRef.current[prev]?.focus();
        break;
      }
      case "Home":
        e.preventDefault();
        buttonsRef.current[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        buttonsRef.current[last]?.focus();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        toggle(index);
        break;
      default:
        break;
    }
  };

  if (!faq || faq.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-b from-neutral-50 to-white p-6 md:p-8 shadow-sm"
      aria-labelledby={`${sectionId}-heading`}
    >
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-sky-100/30 to-transparent blur-2xl" />
      <header className="mb-8 flex items-center gap-3">
        <h2
          id={`${sectionId}-heading`}
          className="text-3xl lg:text-4xl font-bold font-['Epilogue'] text-neutral-900"
        >
          Frequently Asked Questions
        </h2>
      </header>

      <div className="space-y-4">
        {faq.map((item, index) => {
          const isOpen = openSet.has(index);
          const panelId = `${sectionId}-panel-${index}`;
          const buttonId = `${sectionId}-button-${index}`;

          return (
            <div
              key={index}
              className={[
                "relative rounded-2xl border bg-white/80 backdrop-blur-sm transition-colors shadow-sm",
                isOpen
                  ? "border-sky-200"
                  : "border-neutral-200 hover:border-neutral-300",
              ].join(" ")}
            >
              <h3 className="m-0">
                <button
                  ref={(el) => {
                    if (el) {
                      buttonsRef.current[index] = el;
                    }
                  }}
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group w-full flex items-center justify-between gap-4 rounded-2xl p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => onKeyDown(e, index)}
                >
                  <span className="text-lg lg:text-xl font-semibold font-['Epilogue'] text-neutral-900">
                    {item?.question}
                  </span>
                  <span className="flex items-center">
                    <ChevronDownIcon
                      className={[
                        "h-6 w-6 shrink-0 text-neutral-600 transition-transform duration-300",
                        isOpen
                          ? "rotate-180 text-sky-700"
                          : "group-hover:text-neutral-800",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={[
                  "grid transition-all duration-300 ease-in-out",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pt-0">
                    <div
                      className="prose prose-lg prose-neutral max-w-none font-['DM_Sans'] text-neutral-700"
                      dangerouslySetInnerHTML={{ __html: item?.answer || "" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
