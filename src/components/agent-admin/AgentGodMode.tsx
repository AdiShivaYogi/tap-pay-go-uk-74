
import React from "react";
import { GodModeCard } from "./god-mode/GodModeCard";

interface AgentGodModeProps {
  userId: string | undefined;
}

export const AgentGodMode = ({ userId }: AgentGodModeProps) => {
  return <GodModeCard userId={userId} />;
};
