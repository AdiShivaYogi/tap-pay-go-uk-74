
import React from "react";
import { LazyLoadAgentNetwork } from '@/components/3d-visualizations/LazyLoad3DComponents';

export const NetworkTab: React.FC = () => {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-medium mb-2">Vizualizare Rețea Agenți Autonomi</h2>
        <p className="text-muted-foreground">
          Explorați interconectarea și nivelurile de autonomie ale agenților din sistem prin vizualizarea 3D interactivă.
          Utilizați mouse-ul pentru a roti și examina relațiile dintre agenți.
        </p>
      </div>
      <div className="h-[500px] border rounded-lg overflow-hidden">
        <LazyLoadAgentNetwork />
      </div>
    </>
  );
};
