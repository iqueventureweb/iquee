import { Application } from "@splinetool/runtime";
import React, { Suspense, useRef, useState } from "react";
const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function Animated3d() {
  const splineRef = useRef<Application | null>(null);
  const [onDemand, setOnDemand] = useState(false);

  const onLoad = (spline: Application) => {
    splineRef.current = spline;
    // Force the background to be white once the Spline component is loaded
    spline.setBackgroundColor("#ffffff");

    // Enable global events to allow scroll events to bubble up
    spline.setGlobalEvents(true);

    setOnDemand(true);
  };

  const handleSplineScroll = (e: any) => {
    // Allow the scroll event to propagate to the parent
    if (typeof window !== "undefined") {
      const scrollEvent = new WheelEvent("wheel", {
        deltaY: e.deltaY || 1,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(scrollEvent);
    }
  };

  return (
    <div className="absolute inset-0 z-0 bg-white">
      <Suspense
        fallback={<div className="w-full h-full bg-white">Loading...</div>}
      >
        <Spline
          scene="https://prod.spline.design/Sn6ItUQx68RnZ6Jt/scene.splinecode"
          onLoad={onLoad}
          onSplineScroll={handleSplineScroll}
          style={{ backgroundColor: "white" }} // Add this to enforce white background
        />
      </Suspense>
    </div>
  );
}
