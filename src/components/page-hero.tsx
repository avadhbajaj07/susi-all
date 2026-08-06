type PageHeroProps = { eyebrow: string; title: string; intro: string; image: string; action?: { label: string; href: string } };

export function PageHero({ eyebrow, title }: PageHeroProps) {
  return <section className="page-hero"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div></section>;
}
