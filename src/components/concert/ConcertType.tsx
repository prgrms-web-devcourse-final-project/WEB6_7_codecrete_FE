export type ConcertData = {
  id: number;
  posterUrl: string;
  name: string;
  startDate: string;
  endDate: string;
  placeName: string;
};

export type SortSelectProps = {
  onValueChange?: (value: string) => void;
  sortList?: {
    value: string;
    name: string;
  }[];
};

export type QuickActionsProps = {
  Icon1: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  Icon2?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
