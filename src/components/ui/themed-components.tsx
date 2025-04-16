
// This is a barrel file that re-exports all the components for backwards compatibility
// This ensures that existing imports continue to work while we refactor

// Typography
export { Heading1, Heading2, Heading3 } from "./typography/headings";
export { LeadText, Paragraph, MutedText } from "./typography/text";

// Layout
export { Section } from "./layout/section";
export { PageHeader } from "./layout/page-header";
export { Grid2Cols, Grid3Cols, Grid4Cols } from "./layout/grid";
export { ThemedCard } from "./layout/card";

// Navigation
export { NavLink } from "./navigation/nav-link";

// Actions
export { ActionButton } from "./actions/action-button";
