export const SITE = {
  author: 'Moemen Akkari',
  linkedinUrl: 'https://www.linkedin.com/in/moemen-akari-1b94811b5/',
  githubUrl: 'https://github.com/Moemenakari/ringo-lebanon-concept',
  instagramUrl: 'https://www.instagram.com/ringochips.lb/',
  solinoUrl: 'https://solinogroup.com/',
  checkedOn: '27 Oct 2026',
} as const;

/** Ringo's own contact details, from the customer-care strip on their posts. "Where to buy" sends people only here. */
export const RINGO = {
  company: 'Solino Limited Corporation S.A.R.L.',
  address: 'Saida–Tyr new highway, near Babilia Bridge, South Lebanon',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Solino+Ringo+Babilia+Bridge+Saida+Lebanon',
  instagram: '@ringochips.lb',
  instagramUrl: 'https://www.instagram.com/ringochips.lb/',
  phone: { label: '07 420 655', href: 'tel:+9617420655' },
  mobile: { label: '03 207 325', href: 'tel:+9613207325', whatsapp: 'https://wa.me/9613207325' },
  fax: '07 420 654',
  website: 'https://solinogroup.com/',
} as const;
