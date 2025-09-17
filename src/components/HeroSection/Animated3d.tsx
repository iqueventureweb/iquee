import Spline from "@splinetool/react-spline";

export default function Animated3d() {
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
      {/* Mobile Spline - visible only below md breakpoint */}
      <Spline
        scene="https://prod.spline.design/Fli8BeD7SGhjHj4C/scene.splinecode"
        onSplineScroll={handleSplineScroll}
        style={{ backgroundColor: "white" }}
        className="block md:hidden"
      />

      {/* Desktop Spline - visible from md breakpoint and above */}
      <Spline
        scene="https://prod.spline.design/zvMR1KIPEox3SNRu/scene.splinecode"
        onSplineScroll={handleSplineScroll}
        style={{ backgroundColor: "white" }}
        className="hidden md:block"
      />
    </div>
  );
}
