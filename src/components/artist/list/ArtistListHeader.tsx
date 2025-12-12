export default function ArtistListHeader() {
  return (
    <section
      className={"bg-bg-sub border-border flex items-center justify-center border-b px-15 py-16"}
    >
      <div className={"flex w-full max-w-400 flex-col gap-4"}>
        <h2 className={"text-4xl font-bold"}>Browse Artists</h2>
        <p className={"text-text-sub text-xl"}>
          Discover amazing live performances and connect with your favorite artists
        </p>
      </div>
    </section>
  );
}
