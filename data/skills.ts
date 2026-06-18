export type SkillCategory = {
  category: string;
  icon: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Backend",
    icon: "⚙️",
    skills: ["Java", "Spring Boot", "Spring Security", "JPA", "SQL"],
  },
  {
    category: "Database",
    icon: "🗄️",
    skills: ["MySQL", "Redis","PostgresQL"],
  },
  {
    category: "Infra",
    icon: "☁️",
    skills: ["Docker", "Kubernetes", "GitHub Actions", "ArgoCD", "Helm"],
  },
  {
    category: "Monitoring",
    icon: "📊",
    skills: ["Prometheus", "Grafana", "Loki"],
  },
  {
    category: "Frontend",
    icon: "🖥️",
    skills: ["React", "Next.js", "TypeScript", "Chart.js"],
  },
];
