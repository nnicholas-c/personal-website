"use client";

import React, { Suspense } from "react";

// Load the Spline runtime ONLY on the 404 route. A static import here pulled the
// ~542KB (br) THREE.js + Spline vendor chunk into the first-load JS of EVERY
// route (not-found is the app-level 404 boundary), even though the 3D scene only
// renders here. React.lazy + Suspense (the same pattern animated-background uses)
// code-splits it into an on-demand chunk, keeping it out of every other route.
const Spline = React.lazy(() => import("@splinetool/react-spline"));

const NotFoundPage = () => {
  return (
    <Suspense fallback={<div style={{ height: "100vh" }} />}>
      <Spline scene="/assets/404.spline" style={{ height: "100vh" }} />
    </Suspense>
  );
};

export default NotFoundPage;
