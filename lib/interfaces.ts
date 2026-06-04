export type NestedDictionary = {
  [key: string]: string | NestedDictionary;
};

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
  level: string | null;
  mainHookSize: string | null;
  mainYarnBrand: string | null;
  mainYarnLineName: string | null;
}

export interface CondensedPattern {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  category: Category;
  labels: Label[];
  isFree: boolean;
  level: string | null;
  mainHookSize: string | null;
  mainYarnBrand: string | null;
  mainYarnLineName: string | null;
}


export interface PatternDashboardData {
  next: string | null;
  previous: string | null;
  count: number;
  totalPages: number;
  results: Pattern[];
}
