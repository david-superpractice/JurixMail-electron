interface AIAssistantProps {
  suggestions: string[];
}

export function AIAssistant({ suggestions }: AIAssistantProps) {
  return (
    <div className="mt-8">
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">AI Suggestions:</p>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 bg-white rounded border border-gray-200 text-sm hover:border-blue-500 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}