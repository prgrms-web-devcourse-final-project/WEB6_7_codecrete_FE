import { ArtistListSortSelect } from "@/components/artist/list/ArtistListSortSelect";

type ArtistListFiltersProps = {
  onSortChange: (value: string) => void;
  currentSort: string;
};

export default function ArtistListFilters({ onSortChange, currentSort }: ArtistListFiltersProps) {
  return (
    <div className="item flex justify-end">
      <ArtistListSortSelect
        onValueChange={onSortChange}
        sortList={[
          { value: "NAME", name: "이름순" },
          { value: "LIKE", name: "인기순" },
        ]}
        defaultValue={currentSort}
      />
    </div>
  );
}
