export default function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <section className="intro bg-bg-sub border-border border-b px-5 py-10 lg:px-15 lg:py-16">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-2 lg:gap-4">
        <h2 className="text-text-main text-2xl font-bold lg:text-4xl">{title}</h2>
        <p className="text-text-sub text-sm lg:text-base">{description}</p>
      </div>
    </section>
  );
}
