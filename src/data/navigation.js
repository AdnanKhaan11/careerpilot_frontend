import {
  MessageSquare,
  Briefcase,
  Brain,
  BookOpen,
  Settings,
} from "lucide-react";

const navigation = [
  {
    id: "chat",
    title: "AI Chat",
    path: "/",
    icon: MessageSquare,
  },
  {
    id: "applications",
    title: "Applications",
    path: "/applications",
    icon: Briefcase,
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
    id: "settings",
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default navigation;
