export interface ProjectItem {
  id: string;
  year?: string;
  title: string;
  titleEn?: string;
  category: string;
  categoryEn?: string;
  description: string;
  descriptionEn?: string;
  technologies: string[];
  gradient: string;
  image?: string;
  stats?: string;
  link?: string;
  demoUrl?: string;
  repoUrl?: string;
  codeUrl?: string;
}

export const MAIN_PROJECTS: ProjectItem[] = [
  {
    id: "focus-web",
    year: "2025",
    title: "Focus Web",
    titleEn: "Focus Web",
    category: "Productividad & Espacios de Trabajo",
    categoryEn: "Productivity & Workspace",
    description:
      "Aplicación web de productividad inspirada en herramientas como Notion y Trello. Permite organizar tareas en un tablero infinito con drag & drop, espacios de trabajo personalizados y gestión eficiente de proyectos.",
    descriptionEn:
      "Productivity web application inspired by Notion and Trello. Organizes tasks on an infinite drag & drop canvas with custom workspaces and streamlined project management.",
    technologies: ["React", "Vite", "JavaScript", "CSS Modules", "PostgreSQL", "dnd-kit"],
    image: "/projects/focus-web.png",
    demoUrl: "https://focus-mvp-sooty.vercel.app/login",
    repoUrl: "https://github.com/focusappteam/focus_mvp",
    gradient: "from-purple-900/60 via-purple-950/40 to-black",
    stats: "Tablero Infinito • Drag & Drop",
  },
  {
    id: "tienda-bot-discord",
    year: "2024",
    title: "Tienda Bot Discord",
    titleEn: "Discord Store Bot",
    category: "Automatización & Bots",
    categoryEn: "Automation & Discord Bot",
    description:
      "Bot para Discord que automatiza la gestión de pedidos mediante tickets privados para vendedores y clientes.",
    descriptionEn:
      "Discord automation bot managing e-commerce orders through private transactional ticket channels for sellers and customers.",
    technologies: ["Node.js", "Discord.js", "JavaScript"],
    image: "/projects/discord-bot.png",
    codeUrl: "https://github.com/RonaldDev7/tienda-bot-ultrafeders",
    gradient: "from-indigo-950/70 via-purple-950/40 to-black",
    stats: "Tickets Privados • Multi-vendedor",
  },
  {
    id: "crm-system",
    year: "2024",
    title: "Sistema CRM Empresarial",
    titleEn: "Enterprise CRM System",
    category: "Full-Stack Architecture",
    categoryEn: "Full-Stack Architecture",
    description:
      "Plataforma empresarial de gestión de clientes, analítica de ventas en tiempo real y flujos automatizados con base de datos relacional optimizada.",
    descriptionEn:
      "Enterprise customer management platform with real-time sales analytics and automated workflows powered by an optimized relational database.",
    technologies: ["Next.js", "TypeScript", "Node.js", "Express", "SQL"],
    image: "/projects/crm-system.png",
    gradient: "from-purple-900/60 via-purple-950/40 to-black",
    stats: "99.9% Uptime • +10k transacciones",
    demoUrl: "#",
  },
  {
    id: "cloud-saas",
    year: "2024",
    title: "Analytics SaaS Platform",
    titleEn: "Analytics SaaS Platform",
    category: "Cloud & Data Engineering",
    categoryEn: "Cloud & Data Engineering",
    description:
      "Panel de inteligencia de datos con dashboards reactivos, visualización de métricas de alta concurrencia y consultas SQL de baja latencia.",
    descriptionEn:
      "High-concurrency data intelligence dashboard with reactive metric charts and sub-50ms low-latency SQL query execution.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    image: "/projects/cloud-saas.png",
    gradient: "from-zinc-800/80 via-zinc-900/50 to-black",
    stats: "Sub-50ms Query Time",
    demoUrl: "#",
  },
  {
    id: "creative-interactive",
    year: "2023",
    title: "Creative Web Experience",
    titleEn: "Creative Web Experience",
    category: "Creative Frontend & Shaders",
    categoryEn: "Creative Frontend & Shaders",
    description:
      "Aplicación web inmersiva de alto rendimiento visual, física interactiva y microinteracciones coreografiadas a 60 FPS estables.",
    descriptionEn:
      "Immersive high-performance web experience with interactive shader physics and choreographed micro-interactions running at solid 60 FPS.",
    technologies: ["Next.js", "GSAP", "WebGL", "Canvas"],
    image: "/projects/creative-interactive.png",
    gradient: "from-purple-800/50 via-zinc-900/60 to-black",
    stats: "60 FPS • Accessible UI",
    demoUrl: "#",
  },
];
