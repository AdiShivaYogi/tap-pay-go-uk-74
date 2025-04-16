
import React from 'react';

interface GlobalCssManagerProps {
  css: string;
}

export const GlobalCssManager: React.FC<GlobalCssManagerProps> = ({ css }) => {
  return (
    <style id="global-custom-css" dangerouslySetInnerHTML={{ __html: css }} />
  );
};
