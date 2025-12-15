export interface InventoryItem {
  id: string;
  name: string;
  location: string;
  category: Category;
  notes: string;
  image: string; // Base64 string
  secretCode?: string;
  createdAt: number;
  tags: string[];
  isTrackable?: boolean;
}

export enum Category {
  HOME = 'Home',
  WORK = 'Work',
  CAR = 'Car',
  BAG = 'Bag',
  MISC = 'Misc',
  ELECTRONICS = 'Electronics',
  DOCUMENTS = 'Documents',
  CLOTHES = 'Clothes',
  TOOLS = 'Tools'
}

export interface AppState {
  items: InventoryItem[];
  searchQuery: string;
  filterCategory: Category | 'All';
  isFirstTime: boolean;
}