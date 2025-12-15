export interface Concert {
  id: string;
  artist: string;
  title: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  priceRange: string;
  posterUrl?: string;
}

export interface EventContextType {
  events: Record<string, number>;
  onDateClick?: (date: Date) => void;
}

export interface ConcertListProps {
  concerts: Concert[];
  selectedDate: Date;
}
