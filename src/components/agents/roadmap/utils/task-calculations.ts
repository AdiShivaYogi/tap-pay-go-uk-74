
import { AgentTask, AgentTaskExtended } from "../types/task.types";

export const calculateDifficulty = (task: AgentTask): string => {
  const progressNeeded = 100 - (task.progress || 0);
  if (progressNeeded <= 20) return "Ușor";
  if (progressNeeded <= 50) return "Moderat";
  if (progressNeeded <= 80) return "Dificil";
  return "Complex";
};

export const calculateCost = (task: AgentTask): string => {
  const difficulty = calculateDifficulty(task);
  switch (difficulty) {
    case "Ușor": return "Scăzut (1-2 zile)";
    case "Moderat": return "Mediu (3-5 zile)";
    case "Dificil": return "Ridicat (1-2 săptămâni)";
    case "Complex": return "Foarte ridicat (2+ săptămâni)";
    default: return "Nedeterminat";
  }
};

export const calculateRecommendationScore = (task: AgentTask, agentId: string): number => {
  let score = 0;
  
  const progress = task.progress || 0;
  if (progress > 0 && progress < 80) score += 30;
  else if (progress === 0) score += 20;
  else score += 10;
  
  const agentCategory: {[key: string]: string[]} = {
    'payment-agent': ['payment', 'product'],
    'support-agent': ['product', 'localization'],
    'analytics-agent': ['monitoring', 'devops'],
    'security-agent': ['security', 'infrastructure'],
    'ai-assistant': ['product', 'ui']
  };
  
  const preferredCategories = agentCategory[agentId] || [];
  if (preferredCategories.includes(task.category?.toLowerCase() || '')) score += 25;
  
  switch (calculateDifficulty(task)) {
    case "Ușor": score += 15; break;
    case "Moderat": score += 25; break;
    case "Dificil": score += 20; break;
    case "Complex": score += 10; break;
  }
  
  return score;
};

export const getTaskDifficultyLabel = (progress: number): string => {
  if (progress >= 80) return "Aproape gata";
  if (progress >= 50) return "În dezvoltare";
  if (progress >= 20) return "Început";
  return "Nou";
};

export const getDifficultyColor = (level: string): string => {
  switch (level) {
    case "Ușor": return "text-green-500";
    case "Moderat": return "text-blue-500";
    case "Dificil": return "text-amber-500";
    case "Complex": return "text-red-500";
    default: return "text-muted-foreground";
  }
};

export const getTimeEstimate = (difficulty: string): string => {
  switch (difficulty) {
    case "Ușor": return "1-2 zile";
    case "Moderat": return "3-5 zile";
    case "Dificil": return "1-2 săpt.";
    case "Complex": return "2+ săpt.";
    default: return "Necunoscut";
  }
};

export const getPriorityLevel = (score: number): string => {
  if (score >= 70) return "Înaltă";
  if (score >= 50) return "Medie";
  return "Scăzută";
};

export const getAgentTypeFromId = (id: string): string => {
  const agentTypes = {
    'payment-agent': 'Expert Plăți',
    'support-agent': 'Asistență Clienți',
    'analytics-agent': 'Expert Analiză Date',
    'security-agent': 'Consultant Securitate',
    'ai-assistant': 'Asistent AI General'
  };
  
  return agentTypes[id as keyof typeof agentTypes] || 'Agent AI';
};

export const sortTasks = (tasks: AgentTaskExtended[], sortBy: string): AgentTaskExtended[] => {
  console.log("Sorting tasks by:", sortBy, "Total tasks:", tasks.length);
  
  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case "difficulty":
        const difficultyOrder = { "Ușor": 1, "Moderat": 2, "Dificil": 3, "Complex": 4 };
        return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
      case "cost":
        const costOrder = { "Scăzut (1-2 zile)": 1, "Mediu (3-5 zile)": 2, "Ridicat (1-2 săptămâni)": 3, "Foarte ridicat (2+ săptămâni)": 4 };
        return costOrder[a.costEstimate as keyof typeof costOrder] - costOrder[b.costEstimate as keyof typeof costOrder];
      case "progress":
        return (b.progress || 0) - (a.progress || 0);
      case "recommended":
      default:
        return b.recommendationScore - a.recommendationScore;
    }
  });
};
