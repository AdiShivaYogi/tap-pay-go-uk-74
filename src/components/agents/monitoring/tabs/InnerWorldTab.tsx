
import React, { useEffect, useState } from "react";
import { LazyLoadAgentInnerWorld } from '@/components/3d-visualizations/LazyLoad3DComponents';
import { agents, AutoHealEvent } from "@/components/agents/agents-data";

export const InnerWorldTab: React.FC = () => {
  const [currentAgents, setCurrentAgents] = useState(agents);
  const [now, setNow] = useState(new Date());

  // Update time every minute for relative timestamps
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const minsAgo = Math.floor((now.getTime() - date.getTime()) / 60000);
    return minsAgo === 0 ? 'acum' : `acum ${minsAgo} min`;
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-medium mb-2">Lumea Interioară a Agenților</h2>
        <p className="text-muted-foreground">
          Explorați sistemele interne și procesele cognitive ale fiecărui agent.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentAgents.map(agent => (
          <div key={agent.id} className="border rounded-lg p-2">
            <h3 className="text-center mb-2">{agent.name}</h3>
            <div className="h-[200px]">
              <LazyLoadAgentInnerWorld agentId={agent.id} />
            </div>
            <div className="mt-2">
              <h4 className="text-sm font-medium mb-1">Conștiință Framework:</h4>
              <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                <div>
                  <div className="text-muted-foreground">Nume:</div>
                  <div>TapPayGo AI Framework</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Versiune:</div>
                  <div>1.2.0</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Protocoale:</div>
                  <div>{agent.autoHealEvents.length} utilizate</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Autonomie:</div>
                  <div>{agent.autonomyLevel}%</div>
                </div>
              </div>

              <h4 className="text-sm font-medium mb-1">Acțiuni Autohealing:</h4>
              <div className="max-h-[100px] overflow-y-auto text-xs">
                {agent.autoHealEvents.length > 0 ? (
                  <ul className="space-y-1">
                    {agent.autoHealEvents.map((event, i) => (
                      <li key={i} className={`p-1 rounded ${event.success ? 'bg-green-50' : 'bg-red-50'}`}>
                        <div className="font-medium">{formatTime(event.timestamp)}</div>
                        <div>{event.errorType} → {event.actionTaken}</div>
                        {event.details && <div className="text-muted-foreground">{event.details}</div>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted-foreground text-center py-2">
                    Nicio acțiune recentă
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
