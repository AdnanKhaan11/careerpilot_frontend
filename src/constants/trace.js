export const TRACE_STATUSES = ["running", "success", "failed", "cancelled"];

export const TRACE_STATUS_LABELS = {
  running: "Running",
  success: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  waiting: "Waiting",
};

export const TRACE_CATEGORY_LABELS = {
  WorkingMemory: "Working Memory",
  Planner: "Planner",
  LLM: "LLM",
  Tool: "Tool",
  Retriever: "Retriever",
  Memory: "Memory",
  Embedding: "Embedding",
  Ranking: "Ranking",
  Safety: "Safety",
  Application: "Application",
  System: "System",
  Custom: "Custom",
};
