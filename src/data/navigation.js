import { Activity, Brain, BookOpen, Briefcase, Settings } from "lucide-react";

const navigation = [
  {
    id: "traces",
    title: "AI Runtime",
    path: "/",
    icon: Activity,
  },

  {
    id: "memory",
    title: "Memory",
    path: "/memory",
    icon: Brain,
  },

  {
    id: "skills",
    title: "Skills",
    path: "/skills",
    icon: BookOpen,
  },

  {
    id: "applications",
    title: "Applications",
    path: "/applications",
    icon: Briefcase,
  },

  {
    id: "settings",
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default navigation;
