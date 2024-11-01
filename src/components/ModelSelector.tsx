import React from 'react';
import { MODELS } from '../config';

interface ModelSelectorProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
}

export function ModelSelector({ selectedModel, onModelSelect }: ModelSelectorProps) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose AI Model</h2>
      <div className="grid gap-4">
        {MODELS.map(({ title, model, description, icon: Icon }) => (
          <button
            key={model}
            onClick={() => onModelSelect(model)}
            className={`p-4 rounded-xl border transition-all ${
              selectedModel === model
                ? 'border-purple-500 bg-purple-50 shadow-md'
                : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${
                selectedModel === model ? 'bg-purple-500' : 'bg-purple-100'
              } flex items-center justify-center transition-colors`}>
                <Icon className={`w-6 h-6 ${
                  selectedModel === model ? 'text-white' : 'text-purple-500'
                }`} />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}