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
  avatar_url?: string;
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
