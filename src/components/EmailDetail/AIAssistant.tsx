import { SparklesIcon } from '@heroicons/react/24/outline';

interface AIAssistantProps {
  suggestions: string[];
}

export function AIAssistant({ suggestions = [
  "Draft a detailed response based on past correspondence",
  "Schedule a meeting for tomorrow afternoon",
  "Draft a response acknowledging receipt",
  "Share calendar availability for discussion"
] }: AIAssistantProps) {
  return (
    <div className="mt-8">
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <SparklesIcon className="h-5 w-5 text-blue-500" />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Suggestions</p>
        </div>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 hover:ring-1 hover:ring-blue-500/20 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}