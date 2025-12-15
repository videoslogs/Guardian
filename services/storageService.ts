import { InventoryItem, Category } from '../types';

const STORAGE_KEY = 'memorybox_guardian_items';
const FIRST_TIME_KEY = 'memorybox_guardian_intro';
const SETTINGS_KEY = 'memorybox_guardian_settings';

export const getItems = (): InventoryItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading storage', e);
    return [];
  }
};

export const saveItem = (item: InventoryItem): void => {
  const items = getItems();
  const newItems = [item, ...items];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  } catch (e) {
    alert('Storage full! Please delete some items.');
  }
};

export const updateItem = (updatedItem: InventoryItem): void => {
  const items = getItems();
  const index = items.findIndex(i => String(i.id) === String(updatedItem.id));
  if (index !== -1) {
    items[index] = updatedItem;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
};

export const deleteItem = (id: string): void => {
  // Ensure we filter out strictly by string ID, robust against type mismatches
  const items = getItems().filter(i => String(i.id) !== String(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const checkIsFirstTime = (): boolean => {
  const visited = localStorage.getItem(FIRST_TIME_KEY);
  if (visited) return false;
  return true;
};

export const setVisited = (): void => {
  localStorage.setItem(FIRST_TIME_KEY, 'true');
};

export const exportData = (format: 'json' | 'csv' | 'txt' = 'json'): void => {
  const items = getItems();
  if (items.length === 0) {
    alert('No data to export');
    return;
  }

  let content = '';
  let mimeType = 'application/json';
  let extension = 'json';

  if (format === 'csv') {
    const headers = ['Name', 'Category', 'Location', 'Notes', 'Date'];
    const rows = items.map(i => `"${i.name}","${i.category}","${i.location || ''}","${i.notes}","${new Date(i.createdAt).toLocaleDateString()}"`);
    content = [headers.join(','), ...rows].join('\n');
    mimeType = 'text/csv';
    extension = 'csv';
  } else if (format === 'txt') {
    content = items.map(i => `Item: ${i.name}\nLocation: ${i.location || 'Unknown'}\nNotes: ${i.notes}\n---`).join('\n');
    mimeType = 'text/plain';
    extension = 'txt';
  } else {
    content = JSON.stringify(items, null, 2);
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `memorybox_backup_${new Date().toISOString().split('T')[0]}.${extension}`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importData = (file: File, callback: (success: boolean) => void) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const json = e.target?.result as string;
      const parsed = JSON.parse(json);
      if (Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, json);
        callback(true);
      } else {
        callback(false);
      }
    } catch (err) {
      callback(false);
    }
  };
  reader.readAsText(file);
};

// Settings Service
export const getSettings = () => {
  const defaults = { pushAlerts: true, soundEffects: true, sensitivity: 'Medium' };
  const stored = localStorage.getItem(SETTINGS_KEY);
  return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
};

export const saveSettings = (settings: any) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

// Location Helpers
export const getLocationOptions = () => [
  { label: 'Living Room', icon: 'weekend' },
  { label: 'Bedroom', icon: 'hotel' },
  { label: 'Kitchen', icon: 'kitchen' },
  { label: 'Office', icon: 'business_center' },
  { label: 'Bathroom', icon: 'bathtub' },
  { label: 'Closet', icon: 'checkroom' },
  { label: 'Car', icon: 'directions_car' },
  { label: 'Bag', icon: 'backpack' },
  { label: 'Garage', icon: 'garage' },
  { label: 'Basement', icon: 'foundation' },
  { label: 'Entryway', icon: 'door_front' },
  { label: 'Garden', icon: 'yard' },
  { label: 'School', icon: 'school' },
  { label: 'Gym', icon: 'fitness_center' },
  { label: 'Other', icon: 'place' },
];

export const getLocationIcon = (label: string): string => {
  const found = getLocationOptions().find(o => o.label === label);
  return found ? found.icon : 'place';
};

// Auto Suggestion Helpers
export const getSuggestions = (field: keyof InventoryItem): string[] => {
  const items = getItems();
  const values = items.map(i => i[field]).filter(v => typeof v === 'string') as string[];
  const unique = Array.from(new Set(values));
  
  // Default suggestions if user data is empty
  if (unique.length === 0) {
      if (field === 'name') {
          return ['Keys', 'Wallet', 'Phone', 'Backpack', 'Laptop', 'Glasses', 'Passport', 'Headphones', 'Water Bottle'];
      }
  }
  
  return unique;
};

// Utility to resize image to prevent localStorage overflow
export const resizeImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};