// Project type based on database schema
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  category: string[];
  year: string;
  whatIAccomplished: string;
  figmaMobile: string | null;
  figmaDesktop: string | null;
  dribbbleUrl: string | null;
  behanceUrl: string | null;
  order: number;
}
