import axios from 'axios';
import { API_KEY, API_BASE } from './config';

interface ApiResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function callModel(model: string, messages: Array<{ role: string; content: string }>) {
  try {
    const response = await axios.post<ApiResponse>(
      `${API_BASE}/chat/completions`,
      {
        model,
        messages
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'LLM Chat App',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from API');
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Error calling the API');
    }
    throw new Error('Failed to call the model');
  }
}