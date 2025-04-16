
// Utility functions for transforming API usage data for charts

/**
 * Prepares period breakdown data for bar charts
 */
export const preparePeriodData = (periodBreakdown: Record<string, any> | undefined) => {
  if (!periodBreakdown) return [];
  
  return Object.entries(periodBreakdown).map(([period, data]: [string, any]) => ({
    name: period === 'standard' ? 'Standard' : 'Ore reduse',
    tokens: data.totalTokens,
    cost: parseFloat(data.totalCost.toFixed(2)),
    count: data.promptCount
  }));
};

/**
 * Prepares prompt type distribution data for pie charts
 */
export const preparePromptTypeData = (promptTypeDistribution: Record<string, any> | undefined) => {
  if (!promptTypeDistribution) return [];
  
  return Object.entries(promptTypeDistribution).map(([type, data]: [string, any]) => ({
    name: type === 'standard' ? 'Standard' : 
          type === 'conversation_starter' ? 'Inițiere conversație' :
          type === 'task_proposal' ? 'Propunere task' : 
          type === 'code_proposal' ? 'Propunere cod' : type,
    value: data.count,
    cost: parseFloat(data.totalCost.toFixed(2))
  }));
};

/**
 * Chart configuration colors and labels
 */
export const chartConfig = {
  costs: {
    label: 'Costuri API',
    color: '#8884d8'
  },
  counts: {
    label: 'Nr. prompt-uri',
    color: '#82ca9d'
  },
  standard: {
    label: 'Standard',
    color: '#0088FE'
  },
  conversation_starter: {
    label: 'Inițiere conversație',
    color: '#00C49F'
  },
  task_proposal: {
    label: 'Propunere task',
    color: '#FFBB28'
  },
  code_proposal: {
    label: 'Propunere cod',
    color: '#FF8042'
  }
};

// Pie chart colors
export const PIE_CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
