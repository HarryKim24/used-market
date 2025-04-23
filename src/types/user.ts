export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  createdAt?: string | null;
  favoriteIds?: string[];
}