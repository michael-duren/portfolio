export type PortfolioItem = {
  title: string;
  description: string[];
  websiteLink: string | null;
  codeLink: string | null;
  images: ImageMetadata[];
  color: string;
  technologies?: string[];
};
