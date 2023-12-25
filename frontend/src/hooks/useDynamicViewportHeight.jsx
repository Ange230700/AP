import { useEffect } from "react";

function useDynamicViewportHeight() {
  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight * 0.01;
      document.documentElement.style.setProperty(
        "--dvh",
        `${viewportHeight}px`
      );
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);
}

export default useDynamicViewportHeight;
