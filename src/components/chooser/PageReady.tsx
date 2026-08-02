"use client";

// Tells the ShatterTransition overlay that this destination has painted, so the
// "reform" reveal only happens once the page is actually there — not on a timer.
import { useEffect } from "react";

export default function PageReady() {
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      window.dispatchEvent(new Event("page:ready"))
    );
    return () => cancelAnimationFrame(id);
  }, []);
  return null;
}
