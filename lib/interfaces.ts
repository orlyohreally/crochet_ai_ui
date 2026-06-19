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

export interface PurchaseSource {
  marketplace: "VKONTAKTE" | "BOOSTY" | "WHATSAPP" | "TELEGRAM" | "ETSY" | "RAVELRY" | "LOVECRAFTS" | "SITE";
  url: string;
}

export interface Author {
  fullName: string;
  profilePicture: string;
  slug: string;
}


export interface CondensedPattern {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  category?: Category;
  labels: Label[];
  isFree: boolean;
  level: string | null;
  hookSizes: string[];
  mainYarnBrand: string | null;
  mainYarnLineName: string | null;
}

export interface YarnBrand {
  name: string;
  slug: string;

}
export interface YarnBrandLine {
  name: string;
  slug: string;
  brand: YarnBrand;
  weightCategory: string;
  weight: number;
  length: number;
  fiberContent: string;
}

export interface YarnColor {
  comment: string | null;
  colorNumber: string;
  hexCode: string;
  isPrimary: boolean;
  name: string;
  skeinCount: number;
  yarnLine: YarnBrandLine;
}

export interface PatternVariant {
  isPrimary: boolean;
  name: string;
  description: string | null;
  number: number;
  yarnColors: YarnColor[];
}


export interface MaterialSpecs {
  sizeMm?: number;
  sizeStr?: string;
  material?: string;
  style?: string;
  use?: string;
}

export const MATERIAL_TYPE = {
  BUTTONS: "buttons",
  EYES: "eyes",
  NOSES: "noses",
  NOTION: "notion",
} as const;

export type MaterialType = typeof MATERIAL_TYPE[keyof typeof MATERIAL_TYPE];

export interface PatternMaterial {
  name: string;
  category: MaterialType;
  category_display: string;
  isRequired: boolean;
  amount: number;
  unit: string;
  sizeWidth: number,
  sizeHeight: number,
  sizeUnit: string,
  comment: string | null;
}

export interface PatternHook {
  name: string;
  sizeMm: number,
  ukSizeCode: string;
  usSizeCode: string;
  comment: string;
}

export interface Pattern {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  category?: Category;
  labels: Label[];
  isFree: boolean;
  purchaseSources: PurchaseSource[];
  createdAt: string;
  updatedAt: string;
  author: Author;
  level: string | null;
  variants: PatternVariant[];
  materials: PatternMaterial[];
  hooks: PatternHook[];
}

export interface PatternDashboardData {
  next: string | null;
  previous: string | null;
  count: number;
  totalPages: number;
  results: CondensedPattern[];
}
