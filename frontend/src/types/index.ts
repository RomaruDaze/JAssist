export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
  progress?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
} 