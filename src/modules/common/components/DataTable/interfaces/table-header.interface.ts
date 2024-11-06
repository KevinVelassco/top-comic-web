export interface TableHeader {
  key: string;
  title?: string;
  align?: 'start' | 'end';
  sortable?: boolean;
  visible?: boolean;
  size?: number;
  filter?: boolean;
}
