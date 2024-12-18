import { useState } from 'react';
import { AIService } from '../lib/ai-service';

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const aiService = AIService.getInstance();

  const askAI = async (prompt: string, preferredAI?: 'openai' | 'anthropic') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await aiService.getAIResponse(prompt, preferredAI);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при запросе к ИИ');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    askAI,
    isLoading,
    error
  };
}