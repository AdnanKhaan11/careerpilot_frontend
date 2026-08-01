import {
  FileText,
  Briefcase,
  GraduationCap,
  Target,
  Search,
  Sparkles,
} from "lucide-react";

const quickPrompts = [
  {
    id: 1,
    title: "Resume Review",
    description: "Improve your resume for ATS systems.",
    icon: FileText,
  },
  {
    id: 2,
    title: "Interview Prep",
    description: "Practice technical and HR interviews.",
    icon: Briefcase,
  },
  {
    id: 3,
    title: "Learning Roadmap",
    description: "Create a personalized study roadmap.",
    icon: GraduationCap,
  },
  {
    id: 4,
    title: "Career Advice",
    description: "Ask anything about your career.",
    icon: Target,
  },
  {
    id: 5,
    title: "Job Search",
    description: "Find your next opportunity.",
    icon: Search,
  },
  {
    id: 6,
    title: "AI Suggestions",
    description: "Receive intelligent recommendations.",
    icon: Sparkles,
  },
];

export default quickPrompts;
