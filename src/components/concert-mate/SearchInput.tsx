import { SearchIcon } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SearchInput = {
  className?: string;
  placeholder?: string;
};

export default function SearchInput({
  className = "w-full",
  placeholder = "검색어를 입력해주세요",
}: SearchInput) {
  return (
    <ButtonGroup className={className}>
      <Input placeholder={placeholder} className="py-5" />
      <Button variant="outline" aria-label="Search" className="bg-point-sub cursor-pointer py-5">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
