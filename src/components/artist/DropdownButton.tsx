import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

type DropdownButtonProps = {
  button: React.ReactNode;
};

// TODO: 나중에 아래 목록도 따로 커스텀화 가능하도록 수정하기

export default function DropdownButton({ button }: DropdownButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>Status Bar</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem disabled>Activity Bar</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Panel</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
