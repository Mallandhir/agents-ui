export interface Message {
  type: 'user' | 'ai';
  content: string;
}

export interface AIResponse {
  type: 'research' | 'final';
  title?: string;
  content: string;
}

export const messages: Message[] = [
  {
    type: 'user',
    content: 'I need help generating leads and reaching out to them for my agency'
  },
  {
    type: 'ai',
    content: 'Got it! Let\'s analyze your market and build the perfect team for your agency...'
  }
];

export const aiResponses: AIResponse[] = [
  {
    type: 'research',
    title: 'DEEP RESEARCH',
    content: 'Scanning market trends, identifying key decision-makers, and optimizing outreach strategy for creative & tech businesses'
  },
  {
    type: 'final',
    content: 'Done! Your AI-powered team is ready! Estimated completion: 7-10 days!'
  }
];