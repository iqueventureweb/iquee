import Spline from "@splinetool/react-spline";
import { Application } from "@splinetool/runtime";
import { useRef } from "react";

export default function Animated3d() {
  const splineRef = useRef<Application | null>(null);

  const onLoad = (spline: Application) => {
    splineRef.current = spline;
    // Force the background to be white immediately
    spline.setBackgroundColor("#ffffff");
    // Enable global events to allow scroll events to bubble up
    spline.setGlobalEvents(true);
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
      <Spline
        scene="https://prod.spline.design/Fli8BeD7SGhjHj4C/scene.splinecode"
        onLoad={onLoad}
        onSplineScroll={handleSplineScroll}
        style={{ backgroundColor: "white" }}
      />
    </div>
  );
}
