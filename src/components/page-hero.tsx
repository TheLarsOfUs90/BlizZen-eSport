export function PageHero({
  kicker,
  title,
  dek,
}: {
  kicker: string;
  title: string;
  dek: string;
}) {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <p className="kicker">{kicker}</p>
      <h1 className="display mt-4 text-6xl sm:text-8xl">{title}</h1>
      <p className="mt-4 max-w-xl text-mist">{dek}</p>
    </section>
  );
}
