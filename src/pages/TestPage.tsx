import React, { useEffect, useState } from 'react';
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { AgentClient } from "@/integrations/agentFramework";
import Counter from "@/components/demo/Counter";

const TestPage = () => {
  const [generatedPage, setGeneratedPage] = useState('');
  const [collaborationMessage] = useState('Colaborare activă cu utilizatorul');
  const [error, setError] = useState('');

  useEffect(() => {
    const generateDemoPage = async () => {
      try {
        const agent = new AgentClient('demo-key');
        const page = await agent.generateWelcomePage('Bun venit în sistemul nostru!');
        setGeneratedPage(page.html);
        
        await agent.recordCollaboration({
          timestamp: new Date(),
          user: 'current-user',
          action: 'page-generation'
        });
      } catch (err) {
        setError('Eroare la generarea paginii');
        console.error(err);
      }
    };

    generateDemoPage();
  }, []);

  return (
    <Layout>
      <Section>
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Pagina Generată de Agent</h1>
          <p className="text-gray-700 mb-4">{collaborationMessage}</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div 
            className="border p-4 mt-4" 
            dangerouslySetInnerHTML={{ __html: generatedPage }}
          />
          <Counter />
        </div>
      </Section>
    </Layout>
  );
};

export default TestPage;
