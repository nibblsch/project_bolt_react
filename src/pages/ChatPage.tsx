import { useState } from 'react';
import { analytics } from '../lib/posthog';

const PRE_GENERATED_PROMPTS = [
  'Sleep Training Tips',
  'Feeding Schedule',
  // other prompts
];

export function ChatPage() {
  const [userPrompt, setUserPrompt] = useState('');

  const handlePreGeneratedPrompt = (prompt: string) => {
    analytics.capture('chat_prompt_selected', {
      prompt_type: 'pre_generated',
      prompt_text: prompt
    });
  };

  const handleCustomPrompt = () => {
    analytics.capture('chat_prompt_submitted', {
      prompt_type: 'custom',
      prompt_text: userPrompt
    });
  };

  return (
    // Chat interface implementation
  );
} 