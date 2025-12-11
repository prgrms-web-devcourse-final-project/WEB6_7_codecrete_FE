import { DiscographyItems } from "@/components/artist/DiscographyItems";

export default function Discography() {
  return (
    <>
      <div className={"flex flex-col gap-6"}>
        <h3 className={"text-2xl font-bold"}>Discography</h3>
        <DiscographyItems />
      </div>
    </>
  );
}
