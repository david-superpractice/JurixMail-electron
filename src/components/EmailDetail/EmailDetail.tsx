import { 
  StarIcon, 
  ChevronDownIcon,
  ArrowUturnLeftIcon,
  ArrowsRightLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { AIAssistant } from './AIAssistant';

interface EmailDetailProps {
  selectedEmail: number | null;
}

export function EmailDetail({ selectedEmail }: EmailDetailProps) {
  const aiSuggestions = [
    "Schedule a meeting for tomorrow afternoon",
    "Draft a response acknowledging receipt"
  ];

  if (!selectedEmail) {
    return (
      <div className="w-1/2 bg-white border-l border-gray-200 p-6">
        <div className="h-full flex items-center justify-center text-gray-500">
          Select an email to view
        </div>
      </div>
    );
  }

  return (
    <div className="w-1/2 bg-white border-l border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Q4 Marketing Strategy Review</h2>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <StarIcon className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <ChevronDownIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-medium">SJ</span>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium">Sarah Johnson</h3>
          <p className="text-sm text-gray-500">sarah@company.com</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full tooltip-trigger"
            title="Reply"
          >
            <ArrowUturnLeftIcon className="h-5 w-5" />
          </button>
          <button 
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full tooltip-trigger"
            title="Reply All"
          >
            <ArrowsRightLeftIcon className="h-5 w-5" />
          </button>
          <button 
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full tooltip-trigger"
            title="Forward"
          >
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="prose max-w-none">
        <p>Hi Team,</p>
        <p className="mt-4">
          I've reviewed the proposed marketing strategy for Q4 and have some thoughts I'd like to share. Overall, 
          the direction looks solid, but there are a few areas where I think we can make improvements.
        </p>
        <p className="mt-4">
          Can we schedule a meeting to discuss these points in detail? I'm available tomorrow afternoon.
        </p>
        <p className="mt-4">Best regards,<br />Sarah</p>
      </div>

      <AIAssistant suggestions={aiSuggestions} />
    </div>
  );
}