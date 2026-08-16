import {
  Activity,
  Brain,
  BookOpen,
  Briefcase,
  MessageSquare,
  Settings,
} from "lucide-react";

const navigation = [
  {
    id: "traces",
    title: "AI Runtime",
    path: "/",
    icon: Activity,
  },

  {
    id: "chat",
    title: "AI Chat",
    path: "/chat",
    icon: MessageSquare,
    // The desktop/tablet layout already shows a persistent AI Chat rail
    // (MainContent's xl:flex aside), so this entry only needs to appear
    // in the mobile drawer, where that rail is hidden.
    mobileOnly: true,
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
