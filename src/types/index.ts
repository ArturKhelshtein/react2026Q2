export interface AppItem {
  id: number;
  name: string;
  description: string;
  selectedId?: number | null;
  onClick?: (id: number) => void;
}
