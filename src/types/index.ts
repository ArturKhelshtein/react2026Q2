export interface AppItem {
  id: number;
  name: string;
  description: string;
}

export interface ItemProps extends AppItem {
  isSelected: boolean;
  onToggle: () => void;
  onOpenDetails: () => void;
}
