export interface User {
  id: number;
  email: string;
  role: 'client' | 'worker';
  full_name: string;
  location?: string;
  specialty?: string;
  bio?: string;
  experience_years?: number;
  rating?: number;
  price_per_hour?: number;
  avatar_url?: string;
  cover_url?: string;
}

export interface Review {
  id: number;
  worker_id: number;
  client_id: number;
  rating: number;
  comment: string;
  client_name: string;
  created_at: string;
}

export interface WorkerProfile extends User {
  reviews: Review[];
}

export interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: number;
  participant: User;
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
}

export interface Notification {
  id: number;
  type: 'recruitment' | 'message' | 'review' | 'system';
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  address: string;
  client_id: number;
  worker_id: number;
  worker_name?: string;
  client_name?: string;
  price?: number;
}

export interface Project {
  id: number;
  worker_id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  date: string;
}
