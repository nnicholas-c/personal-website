// Ordered list of on-page sections. Drives the top nav and the section pager,
// and must match the `id`s rendered on the home page.
export type SiteSection = {
  id: string;
  /** short label for the pager tick tooltip */
  label: string;
  /** whether the top nav links to this section */
  nav?: boolean;
};

export const SECTIONS: SiteSection[] = [
  { id: "hero", label: "Top" },
  { id: "publications", label: "Publications", nav: true },
];
