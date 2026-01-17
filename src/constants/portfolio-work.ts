import type { PortfolioItem } from "../types/portfolio-item";
import PortfolioHomeImage from "../images/work/portfolio/home.png";
import PortfolioAboutImage from "../images/work/portfolio/about.png";
import PortfolioWorkImage from "../images/work/portfolio/work.png";
import AtmosphereImage from "../images/work/atmosphere/atmosphere.png";
import AtmosphereImageTwo from "../images/work/atmosphere/atmosphere-running.png";

const portfolioList: PortfolioItem[] = [
  {
    title: "Next Step CMS",
    description: [
      "A SaaS platform serving users across chemical dependency treatment facilities, working with PHPs (physician health programs) and alternative to discipline programs across the country.",
      "Worked with Pattern Interrupt to architect and build a multi-tenant Chemical Dependency Case Management system with role-based access control, handling sensitive PHI data with HIPAA-compliant security patterns.",
      "Built backend with Go using Chi router and containerized deployment for horizontal scalability. Frontend developed in TypeScript with SolidJS, leveraging its 45% faster rendering performance compared to React.",
      "Implemented background job processing for report generation, automated email notifications, and integrated payment processing. Scaled from prototype to production supporting multiple organizations with thousands of daily transactions.",
    ],
    websiteLink: "https://nextstepcms.com/",
    codeLink: null,
    images: [],
    color: "bg-indigo-100 shadow-indigo-900",
  },
  {
    title: "Code for Recovery - TSML UI Plugin",
    description: [
      "Active contributor to Code for Recovery, a nonprofit developing open-source technology for the recovery community.",
      "Contributed to TSML UI plugin, an interactive 12-step meeting finder that can be embedded on any web page. The plugin helps people in recovery locate support meetings in their area with real-time search and filtering.",
      "Built with JavaScript and TypeScript, focusing on accessibility and mobile-responsive design to ensure the tool works for users in crisis situations.",
      "Technologies: JavaScript, TypeScript, React, WordPress plugin architecture.",
    ],
    websiteLink: "https://github.com/code4recovery/tsml-ui",
    codeLink: "https://aasfmarin.org/meetings",
    images: [],
    color: "bg-purple-100 shadow-purple-900",
  },
  {
    title: "Atmosphere",
    description: [
      "A web-based synthesizer for learning electronic music production through interactive experimentation.",
      "Built a real-time audio processing application with WebAudio API, managing complex state synchronization between UI controls and audio parameters. Implemented Redux for predictable state management across multiple interconnected audio modules.",
      "Full-stack application with C#/.NET backend handling user authentication, preset storage, and API design for audio parameter serialization.",
      "Built with TypeScript, React, Redux, C#/.NET, PostgreSQL, and WebAudio API.",
    ],
    websiteLink: "https://atmosphere.fly.dev/",
    codeLink: "https://github.com/michael-duren/atmosphere",
    images: [AtmosphereImage, AtmosphereImageTwo],
    color: "bg-green-100 shadow-green-900",
  },
  {
    title: "Developing Developer Tools with Go",
    description: [
      "Created comprehensive course website teaching developers how to build Language Server Protocol (LSP) implementations in Go.",
      "Provides hands-on experience building code editor tooling from scratch, covering protocol design, parser implementation, and editor integration patterns.",
      "Designed for intermediate developers looking to understand how their development tools work under the hood and contribute to language tooling ecosystems.",
      "Built with Go, covering LSP specification, JSON-RPC communication, and real-world editor integration.",
    ],
    websiteLink: "https://go-lsp.michaelduren.com",
    codeLink: "https://github.com/michael-duren/go-lsp-course",
    images: [],
    color: "bg-sky-100 shadow-sky-900",
  },
  {
    title: "Building with .NET Aspire",
    description: [
      "Developed course site teaching cloud-native architecture and microservices patterns using .NET Aspire.",
      "Covers distributed systems design, container orchestration, service discovery, and observability practices for modern cloud applications.",
      "Focuses on practical patterns for building resilient microservices, implementing telemetry and monitoring, and managing distributed transactions.",
      "Built with C#, .NET, covering .NET Aspire, distributed tracing, container orchestration, and production deployment strategies.",
    ],
    websiteLink: "https://building-with-aspire.michaelduren.com/",
    codeLink: "https://github.com/michael-duren/aspire-presentation",
    images: [],
    color: "bg-violet-100 shadow-violet-900",
  },
  {
    title: "Distributed Monitoring Stack",
    description: [
      "A home lab monitoring infrastructure deployed across multiple VMs for learning observability and distributed systems concepts.",
      "Built a complete monitoring solution with Grafana for visualization, Prometheus for metrics collection, and node exporters running on separate Ubuntu VMs hosted on Proxmox.",
      "Configured service discovery, metric scraping intervals, and custom dashboards for system health monitoring. Hands-on experience with production monitoring patterns and debugging distributed system issues.",
      "Built with Grafana, Prometheus, node_exporter, Proxmox, Ubuntu Server. Planning AWS deployment for portfolio demonstration.",
    ],
    websiteLink: null,
    codeLink: null,
    images: [],
    color: "bg-emerald-100 shadow-emerald-900",
  },
  {
    title: "Portfolio",
    description: [
      "A portfolio site built without UI frameworks, challenging myself to create engaging interactions using vanilla TypeScript and CSS.",
      "Focused on performance optimization, accessibility, and clean architecture patterns. Built with Astro for static site generation with zero JavaScript by default.",
      "Built with TypeScript, Tailwind CSS, and Astro.",
    ],
    websiteLink: "https://michaelduren.com/",
    codeLink: "https://github.com/michael-duren/portfolio",
    images: [PortfolioHomeImage, PortfolioAboutImage, PortfolioWorkImage],
    color: "bg-rose-100 shadow-rose-900",
  },
];

export default portfolioList;
