export const SITE = {
  author: 'Moemen Akkari',
  linkedinUrl: 'https://www.linkedin.com/in/moemen-akari-1b94811b5/',
  githubUrl: 'https://github.com/Moemenakari/ringo-lebanon-concept',
  instagramUrl: 'https://www.instagram.com/ringochips.lb/',
  solinoUrl: 'https://solinogroup.com/',
  checkedOn: '27 Oct 2026',
} as const;

/** Real shops that list Ringo. "Order" always opens one of these; there is no checkout here. */
export const SHOPS = [
  { name: 'Tripoli Market', note: 'Tripoli, delivers in Lebanon', url: 'https://tripolimarket.com/product-tag/ringo/' },
  { name: 'Chtoura Royal', note: 'Wholesale boxes', url: 'https://chtouraroyal.com/product/ringo-chips-cheese-balls-lebanon-40-20g/' },
  { name: 'Papaya Express', note: 'Lebanese grocery abroad', url: 'https://papayaexpress.com/collections/ringo' },
  { name: 'Crescent Market', note: 'Lebanese grocery abroad', url: 'https://crescentmarket.shop/search?q=ringo' },
] as const;
