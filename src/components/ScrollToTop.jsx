import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This forces the window to the top whenever the URL path changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "instant" to prevent a weird sliding effect during page transitions
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;