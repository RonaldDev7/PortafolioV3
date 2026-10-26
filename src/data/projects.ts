export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  gradient: string;
  stats?: string;
  link?: string;
}

export const MAIN_PROJECTS: ProjectItem[] = [
  {
    id: "crm-system",
    title: "Sistema CRM Empresarial",
    category: "Full-Stack Architecture",
    description:
      "Plataforma empresarial de gestión de clientes, analítica de ventas en tiempo real y flujos automatizados con base de datos relacional optimizada.",
    technologies: ["Next.js", "TypeScript", "Node.js", "Express", "SQL"],
    gradient: "from-purple-900/60 via-purple-950/40 to-black",
    stats: "99.9% Uptime • +10k transacciones",
    link: "#",
  },
  {
    id: "cloud-saas",
    title: "Analytics SaaS Platform",
    category: "Cloud & Data Engineering",
    description:
      "Panel de inteligencia de datos con dashboards reactivos, visualización de métricas de alta concurrencia y consultas SQL de baja latencia.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    gradient: "from-zinc-800/80 via-zinc-900/50 to-black",
    stats: "Sub-50ms Query Time",
    link: "#",
  },
  {
    id: "creative-interactive",
    title: "Creative Web Experience",
    category: "Creative Frontend & Shaders",
    description:
      "Aplicación web inmersiva de alto rendimiento visual, física interactiva y microinteracciones coreografiadas a 60 FPS estables.",
    technologies: ["Next.js", "GSAP", "WebGL", "Canvas"],
    gradient: "from-purple-800/50 via-zinc-900/60 to-black",
    stats: "60 FPS • Accessible UI",
    link: "#",
  },
];

export const STUDY_CASES: ProjectItem[] = [
  {
    id: "case-01",
    title: "AETHER AI ARCHITECTURE",
    category: "System Design",
    description: "Diseño de microservicios e infraestructura SQL distribuida.",
    technologies: ["Node.js", "Express", "Docker", "SQL"],
    gradient: "from-zinc-900 via-zinc-800 to-black",
  },
  {
    id: "case-02",
    title: "AFTERFORM DESIGN SYSTEM",
    category: "UI Architecture",
    description: "Arquitectura modular de componentes accesibles para alta escala.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    gradient: "from-purple-950 via-zinc-900 to-black",
  },
  {
    id: "case-03",
    title: "REALTIME SQL PIPELINE",
    category: "Database Engineering",
    description: "Optimización de índices, transacciones ACID y replicación en caliente.",
    technologies: ["SQL", "PostgreSQL", "Node.js"],
    gradient: "from-zinc-900 via-purple-950 to-black",
  },
  {
    id: "case-04",
    title: "EDGE API GATEWAY",
    category: "Cloud Infrastructure",
    description: "Capa de autenticación JWT segura con rate limiting y balanceo.",
    technologies: ["TypeScript", "Express", "Next.js"],
    gradient: "from-zinc-800 via-zinc-900 to-black",
  },
  {
    id: "case-05",
    title: "INTERACTIVE DATA MESH",
    category: "Frontend Performance",
    description: "Renderizado virtualizado masivo en navegadores de bajo consumo.",
    technologies: ["React", "WebGL", "TypeScript"],
    gradient: "from-purple-900 via-black to-zinc-950",
  },
  {
    id: "case-06",
    title: "ENTERPRISE PROTOCOL",
    category: "Full-Stack Security",
    description: "Cifrado end-to-end y auditoría de eventos de cumplimiento estricto.",
    technologies: ["Node.js", "SQL", "Security"],
    gradient: "from-zinc-900 via-zinc-800 to-black",
  },
];
