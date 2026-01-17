import type { PortfolioItem } from "../types/portfolio-item";
import PortfolioHomeImage from "../images/work/portfolio/home.png";
import AtmosphereImage from "../images/work/atmosphere/atmosphere.png";
import AtmosphereImageTwo from "../images/work/atmosphere/atmosphere-running.png";
import NextStepImage from "../images/work/next-step/home.png";
import TsmlImage from "../images/work/tsml/home.png";
import GoLspImage from "../images/work/go-lsp/home.png";
import AspireImage from "../images/work/aspire/home.png";

const portfolioList: PortfolioItem[] = [
  {
    title: "Next Step CMS",
    description: [
      "Architected a HIPAA-compliant SaaS for chemical dependency treatment facilities, scaling to support thousands of daily transactions.",
      "Built a high-performance SolidJS frontend (45% faster rendering than React) backed by a containerized Go service for horizontal scalability.",
      "Implemented automated reporting and background processing systems to handle sensitive PHI data securely across multiple organizations.",
    ],
    websiteLink: "https://nextstepcms.com/",
    codeLink: null,
    images: [NextStepImage],
    color: "bg-indigo-100 shadow-indigo-900",
    technologies: ["typescript-plain", "go-original-wordmark", "postgresql-plain", "docker-plain"],
  },
  {
    title: "Code for Recovery - TSML UI Plugin",
    description: [
      "Contributed to an open-source 12-step meeting finder used by recovery communities nationwide.",
      "Optimized the React/TypeScript plugin for accessibility and mobile responsiveness, critical for users in crisis situations.",
    ],
    websiteLink: "https://github.com/code4recovery/tsml-ui",
    codeLink: "https://aasfmarin.org/meetings",
    images: [TsmlImage],
    color: "bg-purple-100 shadow-purple-900",
    technologies: ["javascript-plain", "typescript-plain", "react-original", "wordpress-plain"],
  },
  {
    title: "Atmosphere",
    description: [
      "Built a real-time web-based synthesizer using the WebAudio API with complex state synchronization via Redux.",
      "Developed a full-stack architecture with a C#/.NET backend for managing audio serialization and user presets.",
    ],
    websiteLink: "https://atmosphere.fly.dev/",
    codeLink: "https://github.com/michael-duren/atmosphere",
    images: [AtmosphereImage, AtmosphereImageTwo],
    color: "bg-green-100 shadow-green-900",
    technologies: ["typescript-plain", "react-original", "redux-original", "csharp-plain", "dotnetcore-plain", "postgresql-plain"],
  },
  {
    title: "Developing Developer Tools with Go",
    description: [
      "Created a comprehensive course on building Language Server Protocol (LSP) tools from scratch in Go.",
      "Teaches protocol design, parser implementation, and JSON-RPC communication for creating real-world editor tooling.",
    ],
    websiteLink: "https://go-lsp.michaelduren.com",
    codeLink: "https://github.com/michael-duren/go-lsp-course",
    images: [GoLspImage],
    color: "bg-sky-100 shadow-sky-900",
    technologies: ["go-original-wordmark", "json-plain", "vscode-plain"],
  },
  {
    title: "Building with .NET Aspire",
    description: [
      "Developed an educational platform teaching cloud-native architecture and distributed systems design with .NET Aspire.",
      "Focuses on practical implementation of microservices, observability, and resilient container orchestration.",
    ],
    websiteLink: "https://building-with-aspire.michaelduren.com/",
    codeLink: "https://github.com/michael-duren/aspire-presentation",
    images: [AspireImage],
    color: "bg-violet-100 shadow-violet-900",
    technologies: ["csharp-plain", "dotnetcore-plain", "docker-plain", "azure-plain"],
  },
  {
    title: "Portfolio",
    description: [
      "Designed a high-performance static site using Astro and Tailwind CSS with zero-JavaScript defaults.",
      "Implemented custom interactions with vanilla TypeScript to ensure optimal loading speeds and accessibility.",
    ],
    websiteLink: "https://michaelduren.com/",
    codeLink: "https://github.com/michael-duren/portfolio",
    images: [PortfolioHomeImage],
    color: "bg-rose-100 shadow-rose-900",
    technologies: ["typescript-plain", "tailwindcss-original", "astro-original"],
  },
];

export default portfolioList;
