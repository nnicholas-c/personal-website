// Single source of truth for the site's cinematic imagery.
// Replace any file in /public/assets/img and update the matching entry here to
// swap in your own photography — nothing else needs to change.

export type MediaAsset = {
  src: string;
  alt: string;
  credit: string;
  creditUrl: string;
  /** CSS object-position for the full-bleed crop. */
  focus: string;
};

export const MEDIA = {
  heroLandscape: {
    src: "/assets/img/hero-golden-gate.jpg",
    alt: "Aerial view of the Golden Gate Bridge stretching across the bay",
    credit: "Jared Erondu",
    creditUrl: "https://unsplash.com/photos/tY1QwoLAJQ4",
    focus: "center 40%",
  },
  heroPortrait: {
    src: "/assets/img/hero-golden-gate-portrait.jpg",
    alt: "The Golden Gate Bridge disappearing into fog",
    credit: "Nadia Valko",
    creditUrl: "https://unsplash.com/photos/CYnJtMzafYw",
    focus: "center 45%",
  },
  now: {
    src: "/assets/img/now-marin-headlands.jpg",
    alt: "Black-and-white hillside in the Marin Headlands",
    credit: "Ronan Furuta",
    creditUrl: "https://unsplash.com/photos/Krk1MP-4NWs",
    focus: "center 60%",
  },
  work: {
    src: "/assets/img/work-architecture.jpg",
    alt: "Minimalist high-rise facade in black and white",
    credit: "Paulius Dragunas",
    creditUrl: "https://unsplash.com/photos/ID6-VGSfdWo",
    focus: "center center",
  },
  contact: {
    src: "/assets/img/contact-golden-gate-dusk.jpg",
    alt: "The Golden Gate Bridge silhouetted against a dusk sky",
    credit: "Unsplash",
    creditUrl: "https://unsplash.com/photos/nwsAPQj10C0",
    focus: "center 35%",
  },
  cosmos: {
    src: "/assets/img/playful-cosmos.jpg",
    alt: "A deep-space nebula scattered with stars",
    credit: "Unsplash",
    creditUrl: "https://unsplash.com/photos/qW_OmkbDJVQ",
    focus: "center center",
  },
  city: {
    // The user's own Golden Gate photo (repo default-image.776c7c1c.png),
    // unmirrored — the fog-wrapped tower sits left of center, inside the
    // builder door's rest-visible zone.
    src: "/assets/img/entrepreneurship-golden-gate.jpg",
    alt: "The Golden Gate Bridge rising through a river of fog at blue hour, San Francisco glowing behind",
    credit: "User-provided",
    creditUrl: "#",
    focus: "center 55%",
  },
  bridge: {
    // Peninsula fog pouring over the San Bruno ridge at night — mirrored so
    // the gold valley sprawl sits right of center, where the researcher door
    // is visible at rest. (Alternates staged: research-golden-gate-blue.jpg,
    // research-golden-gate-fog.jpg, research-golden-gate-fog-tower.jpg.)
    src: "/assets/img/research-valley-fog.jpg",
    alt: "Fog rolling over the Peninsula hills at night, the valley's lights glowing beneath",
    credit: "Aaron Lee",
    creditUrl: "https://unsplash.com/photos/1CsReRMMviw",
    focus: "center 55%",
  },
  research: {
    src: "/assets/img/research-fog-forest.jpg",
    alt: "Pine trees emerging from heavy fog",
    credit: "Micah & Sammie Chaffin",
    creditUrl: "https://unsplash.com/photos/m8rM-X6S54o",
    focus: "center 55%",
  },
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof MEDIA;
