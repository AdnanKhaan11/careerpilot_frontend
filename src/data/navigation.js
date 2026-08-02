import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  Brain,
  BookOpen,
  Activity,
  Settings,
} from "lucide-react";

const navigation = [
  {
    id: "dashboard",
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    id: "chat",
    title: "AI Chat",
    path: "/chat",
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
    id: "traces",
    title: "Traces",
    path: "/traces",
    icon: Activity,
  },
  {
    id: "settings",
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default navigation;
