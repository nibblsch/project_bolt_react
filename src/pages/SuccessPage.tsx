import { useState } from 'react';
import { Menu, MessageSquare, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { analytics } from '../lib/posthog';
import { Modal } from '../components/ui/Modal';

const SUGGESTED_PROMPTS = [
  "What's a normal sleep schedule for a 6-month-old?",
  "How do I introduce solid foods?",
  "What are signs of teething?",
  "Tips for establishing a bedtime routine?"
];

export default function SuccessPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showHighTraffic, setShowHighTraffic] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    analytics.track('prompt_selected', { prompt });
    setShowHighTraffic(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    analytics.track('custom_prompt_submitted', { prompt: userInput });
    setShowHighTraffic(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-white border-r transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Chat History</h2>
          <div className="space-y-2">
            <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
              Previous Chat 1
            </div>
            <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
              Previous Chat 2
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="bg-white border-b px-4 py-2 flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mr-4 md:hidden"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-center flex-1">BabyGPT</h1>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Suggested Prompts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handlePromptSelect(prompt)}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-left"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          {selectedPrompt && (
            <div className="bg-white rounded-lg p-4 shadow mb-4">
              <div className="flex items-start">
                <div className="bg-indigo-100 rounded-full p-2 mr-4">
                  <MessageSquare className="text-indigo-600" size={20} />
                </div>
                <div>
                  <p className="font-medium">You</p>
                  <p>{selectedPrompt}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your parenting question..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button type="submit">
              <Send size={20} />
            </Button>
          </form>
        </div>
      </div>

      {/* Welcome Modal */}
      <Modal
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
        title="Welcome to BabyGPT!"
      >
        <div className="space-y-4">
          <p>
            Your AI-powered parenting assistant is ready to help! Start by selecting
            a suggested question or ask your own.
          </p>
          <Button onClick={() => setShowWelcome(false)} fullWidth>
            Get Started
          </Button>
        </div>
      </Modal>

      {/* High Traffic Modal */}
      <Modal
        isOpen={showHighTraffic}
        onClose={() => {}} // Empty function since we don't want to allow closing
        title="High Traffic Notice"
      >
        <div className="space-y-4">
          <p>
            We are experiencing higher than normal request volume. Please check
            back in a few minutes.
          </p>
        </div>
      </Modal>
    </div>
  );
}