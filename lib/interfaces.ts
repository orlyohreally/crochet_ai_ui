export interface Label {
    name: string;
    slug: string;
}

export interface Category {
    name: string;
    slug: string;
}

export interface Pattern {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  category: Category;
  labels: Label[];
  isFree: boolean;
}


export interface PatternDashboardData {
  next: string | null;
  previous: string | null;
  count: number;
  totalPages: number;
  results: Pattern[];
}
