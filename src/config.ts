import { Bot, Brain, Sparkles, Stars } from 'lucide-react';

export const MODELS = [
  {
    title: "Meta Llama 3.2",
    model: "meta-llama/llama-3.2-3b-instruct:free",
    description: "Advanced language model by Meta",
    icon: Brain
  },
  {
    title: "Liquid",
    model: "liquid/lfm-40b:free",
    description: "Fast and efficient model by Google",
    icon: Sparkles
  },
  {
    title: "Mistral",
    model: "mistralai/mistral-7b-instruct",
    description: "Powerful open-source language model",
    icon: Stars
  },
  {
    title: "OpenChat 3.5",
    model: "openchat/openchat-7b:free",
    description: "Conversational AI model",
    icon: Bot
  }
] as const;

export const API_KEY = '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';
export const API_BASE = 'https://openrouter.ai/api/v1';