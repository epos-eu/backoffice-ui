export type Documentation = {
  description?: string;
  title?: string;
  uri?: string;
  // BUG: URI comes from API capitalised but expexts lowercase when make PUT reqests
  URI?: string;
};
