
import React from 'react';
import { AutoExecution } from '@/features/agent-autonomy/AutoExecution';
import { AutoProposalProcessor } from '@/features/agent-autonomy/AutoProposalProcessor';
import { AutoDecisionMaker } from '@/features/agent-autonomy/AutoDecisionMaker';

export const AutonomyEngine = () => {
  return (
    <>
      <AutoExecution />
      <AutoProposalProcessor />
      <AutoDecisionMaker />
    </>
  );
};
