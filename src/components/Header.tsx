import React from 'react';
import { MessageSquare } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-purple-100 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Multi LLM's</h1>
              <p className="text-sm text-gray-500">Developed by Srinivas Biskula</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}