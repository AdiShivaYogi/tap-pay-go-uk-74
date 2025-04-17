
import { SYSTEM_PROMPT_TEMPLATES, CODE_GENERATION_TEMPLATES } from "./models.ts";

/**
 * Selects the appropriate prompt template and replaces placeholders with actual values
 * @param {Object} params - Parameters containing request details
 * @returns {string} Formatted system prompt
 */
export function createSystemPrompt(params) {
  const { 
    message,
    agentId, 
    agentType, 
    agentDescription, 
    context, 
    activeTask,
    isConversationStarter,
    isTaskProposal,
    isCodeProposal 
  } = params;

  let promptTemplate = SYSTEM_PROMPT_TEMPLATES.standard;
  
  if (isConversationStarter) {
    promptTemplate = SYSTEM_PROMPT_TEMPLATES.conversationStarter;
  } else if (isTaskProposal) {
    promptTemplate = SYSTEM_PROMPT_TEMPLATES.taskProposal;
  } else if (isCodeProposal) {
    promptTemplate = CODE_GENERATION_TEMPLATES.codeProposal.replace('{message}', message);
  }
  
  return promptTemplate
    .replace('{agentId}', agentId)
    .replace('{agentType}', agentType)
    .replace('{agentDescription}', agentDescription)
    .replace('{context}', context || '')
    .replace('{activeTask ? "TASK ACTIV: Lucrezi la taskul \\"" + activeTask.title + "\\" - " + activeTask.description + ". Progres curent: " + activeTask.progress + "%." : ""}', 
      activeTask ? `TASK ACTIV: Lucrezi la taskul "${activeTask.title}" - ${activeTask.description}. Progres curent: ${activeTask.progress}%.` : '');
}

/**
 * Determines the prompt type for logging purposes
 * @param {Object} params - Parameters containing request flags
 * @returns {string} Prompt type identifier
 */
export function determinePromptType(params) {
  const { isConversationStarter, isTaskProposal, isCodeProposal } = params;
  
  if (isConversationStarter) return 'conversation_starter';
  if (isTaskProposal) return 'task_proposal';
  if (isCodeProposal) return 'code_proposal';
  return 'standard';
}
