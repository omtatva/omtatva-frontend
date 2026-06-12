export interface Film {
  id: string;
  title: string;
  genre: string;
  year: number;
  image: string;
  description?: string;
  featured?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export interface Studio {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description?: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  step: number;
}

export interface BTSItem {
  id: string;
  title: string;
  image: string;
  duration: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  image: string;
  featured?: boolean;
  socialLinks?: { label: string; href: string }[];
}
