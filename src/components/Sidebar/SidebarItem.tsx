import { ReactNode } from 'react';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  count?: number;
  description?: string;
  isActive?: boolean;
}

export function SidebarItem({ icon, label, count, description, isActive = false }: SidebarItemProps) {
  return (
    <a
      href="#"
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md group ${
        isActive 
          ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
    >
      <div className={`h-5 w-5 mr-3 ${
        isActive 
          ? 'text-blue-600 dark:text-blue-400' 
          : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span>{label}</span>
          {count !== undefined && (
            <span className={`ml-2 text-xs font-medium rounded-full px-2 py-0.5 ${
              isActive 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
            }`}>
              {count}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
    </a>
  );
}