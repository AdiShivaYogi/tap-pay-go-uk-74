
import React from 'react';
import { AutoExecution } from '@/features/agent-autonomy/AutoExecution';
import { AutoProposalProcessor } from '@/features/agent-autonomy/AutoProposalProcessor';

export const AutonomyEngine = () => {
  return (
    <>
      <AutoExecution />
      <AutoProposalProcessor />
    </>
  );
};
