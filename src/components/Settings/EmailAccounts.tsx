import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { EmailAccount } from '../../services/email-providers/types';

export function EmailAccounts() {
  const [accounts, setAccounts] = useState<EmailAccount[]>([]);
  const [showAddAccount, setShowAddAccount] = useState(false);

  const handleAddAccount = async (type: 'gmail' | 'outlook' | 'smtp') => {
    try {
      const result = await window.electron.auth.connectEmailProvider(type);
      if (result) {
        setAccounts([...accounts, result]);
      }
    } catch (error) {
      console.error('Failed to add account:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Email Accounts</h2>
        <button
          onClick={() => setShowAddAccount(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Account
        </button>
      </div>

      <div className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="p-4 bg-white rounded-lg border border-gray-200 flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{account.name}</h3>
              <p className="text-sm text-gray-500">{account.email}</p>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {account.provider}
              </span>
            </div>
            <button
              onClick={() => window.electron.auth.disconnectEmailProvider(account.id)}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Disconnect
            </button>
          </div>
        ))}
      </div>

      {showAddAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-medium mb-4">Add Email Account</h3>
            <div className="space-y-4">
              <button
                onClick={() => handleAddAccount('gmail')}
                className="w-full p-4 border rounded-lg hover:bg-gray-50"
              >
                Connect Gmail
              </button>
              <button
                onClick={() => handleAddAccount('outlook')}
                className="w-full p-4 border rounded-lg hover:bg-gray-50"
              >
                Connect Outlook
              </button>
              <button
                onClick={() => handleAddAccount('smtp')}
                className="w-full p-4 border rounded-lg hover:bg-gray-50"
              >
                Add SMTP Account
              </button>
            </div>
            <button
              onClick={() => setShowAddAccount(false)}
              className="mt-4 w-full p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}