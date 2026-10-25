/**
 * ─────────────────────────────────────────────────────────────
 *  AM Rice Mill — central site content
 * ─────────────────────────────────────────────────────────────
 *  Everything company-specific lives in this file. Replace the
 *  values marked `// TODO` with verified company information.
 *  Components read from here, so no markup changes are needed.
 *
 *  Images live in /public/images as `<name>-800.webp` and
 *  `<name>-1600.webp`. To swap a photo, drop in new files with
 *  the same names (or change the `image` key below).
 * ─────────────────────────────────────────────────────────────
 */

export const company = {
  name: 'AM Rice Mill',
  legalName: 'AM Rice Mill Private Limited',
  shortName: 'AM',
  tagline: 'Purity in Every Grain',
  description:
    'AM Rice Mill is a rice mill near Kamoke, District Gujranwala, Punjab, Pakistan. We buy paddy from farmers, mill and grade rice, and supply Zam Zam 1121 Steam, Special Adhwar Basmati and Super Karnal rice, plus paddy, rice bran, rice husk and broken rice.',
  // SEO
  seoTitle: 'AM Rice Mill | Rice Mill in Kamoke, Gujranwala, Pakistan',
  seoDescription:
    'Rice mill near Kamoke, Gujranwala, Pakistan. AM Rice Mill supplies Zam Zam 1121 Steam, Adhwar Basmati and Super Karnal rice, paddy, rice bran and husk.',
  geo: { latitude: 31.89832, longitude: 74.21269 }, // from plus code V6X7+83 (8J4PV6X7+83)
  // Production domain (used for SEO / canonical URLs)
  url: 'https://amricemill.com',
  // Phone number is hidden on the site while showPhone is false.
  // TODO: add the verified number and set showPhone to true to display it.
  showPhone: false,
  phone: '+00 000 000 0000',
  phoneHref: 'tel:+000000000000',
  whatsapp: '923060618792', // international format, digits only — used for wa.me links
  whatsappDisplay: '+92 306 0618792',
  email: 'info@amricemill.com',
  address: ['2 Km, Baigpur Road, Raja', 'Tehsil Kamoke, District Gujranwala', 'Punjab, Pakistan'],
  // Structured address for search engines
  addressParts: {
    streetAddress: '2 Km, Baigpur Road, Raja, Tehsil Kamoke',
    addressLocality: 'Kamoke',
    addressRegion: 'Punjab',
    addressCountry: 'PK',
  },
  // Google Maps plus code for the mill location
  plusCode: 'V6X7+83 Darajake, Pakistan',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=V6X7%2B83+Darajake%2C+Pakistan',
  mapEmbedUrl: 'https://maps.google.com/maps?q=V6X7%2B83+Darajake%2C+Pakistan&z=15&output=embed',
  hours: [
    { days: 'Saturday – Thursday', time: '9:00 AM – 6:00 PM' },
    { days: 'Friday', time: 'Off' },
  ],
  foundedYear: 2026, // TODO
};

/**
 * Where the contact form posts to. Leave empty to fall back to
 * opening the visitor's email client with the inquiry pre-filled.
 * Works with Formspree, Getform, Basin, a custom API, etc.
 */
export const formEndpoint = '/api/contact';

/** Social links — only entries with a URL are rendered. */
export const social: { label: string; icon: 'facebook' | 'instagram' | 'linkedin' | 'tiktok'; url: string }[] = [
  { label: 'Facebook', icon: 'facebook', url: 'https://web.facebook.com/profile.php?id=61594881547878' },
  { label: 'Instagram', icon: 'instagram', url: 'https://instagram.com' },
  { label: 'TikTok', icon: 'tiktok', url: 'https://www.tiktok.com/@a.m.rice.mill' },
  { label: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com' },
];

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Process', href: '#process' },
  { label: 'Products', href: '#products' },
  { label: 'Quality', href: '#quality' },
];

export const heroHighlights = [
  { icon: 'sprout', title: 'Paddy Sourcing', text: 'Direct from farmers & suppliers' },
  { icon: 'cog', title: 'Rice Processing', text: 'Modern milling operations' },
  { icon: 'award', title: 'Quality Products', text: 'Checked at every stage' },
  { icon: 'truck', title: 'Reliable Supply', text: 'Dependable availability' },
] as const;

export const aboutPoints = [
  'Quality',
  'Reliable sourcing',
  'Efficient processing',
  'Consistent supply',
  'Customer satisfaction',
];

export const business = [
  {
    icon: 'sprout',
    title: 'Paddy Procurement',
    image: '/images/business/procurement.webp',
    text: 'We purchase paddy from farmers and trusted suppliers, building a reliable supply of quality raw material.',
  },
  {
    icon: 'factory',
    title: 'Rice Processing',
    image: '/images/business/processing.webp',
    text: 'Paddy is processed through modern milling operations to produce quality rice suitable for different market requirements.',
  },
  {
    icon: 'truck',
    title: 'Rice Supply',
    image: '/images/business/supply.webp',
    text: 'We supply processed rice to customers, traders, distributors, and business partners.',
  },
  {
    icon: 'layers',
    title: 'By-Products',
    image: '/images/business/byproducts.webp',
    text: 'Rice milling generates valuable by-products that are collected, processed, and supplied for suitable applications.',
  },
] as const;

export const processSteps = [
  { icon: 'sprout', title: 'Paddy Sourcing', image: '/images/process/sourcing.webp', text: 'Sourcing paddy from farmers and reliable suppliers.' },
  { icon: 'filter', title: 'Cleaning', image: '/images/process/cleaning.webp', text: 'Removing impurities and unwanted materials from the harvested paddy.' },
  { icon: 'cog', title: 'Milling', image: '/images/process/milling.webp', text: 'Processing paddy through rice milling operations.' },
  { icon: 'sliders', title: 'Grading', image: '/images/process/grading.webp', text: 'Separating rice according to quality, size, and market requirements.' },
  { icon: 'search-check', title: 'Quality Control', image: '/images/process/quality.webp', text: 'Checking the processed rice to maintain consistent quality.' },
  { icon: 'package', title: 'Packaging & Supply', image: '/images/process/packaging.webp', text: 'Preparing products for customers and distribution.' },
] as const;

export const products = [
  {
    id: 'super-kernel-basmati',
    name: 'Super Kernel Basmati Rice',
    image: 'p-super-kernel',
    alt: 'Long white grains of Super Kernel Basmati rice',
    text: 'Classic Pakistani basmati with a naturally rich aroma and slender white grains that cook soft and fluffy.',
    details:
      'Super Kernel Basmati is one of Pakistan’s best-loved rice varieties, known for its natural fragrance and fine, slender grains. We clean, mill, grade and sort it at our mill near Kamoke for a consistent, premium finish, ideal for everyday cooking, biryani and pulao.',
    specs: [
      { label: 'Type', value: 'White basmati (raw)' },
      { label: 'Best for', value: 'Biryani, pulao, daily meals' },
      { label: 'Packing', value: 'On request' },
    ],
  },
  {
    id: '1121-sella-basmati',
    name: '1121 Sella Basmati Rice',
    image: 'p-1121-sella',
    alt: 'Creamy white grains of 1121 Sella Basmati rice',
    text: 'Extra-long parboiled basmati that stays separate and non-sticky, a favourite for restaurants and caterers.',
    details:
      '1121 Sella is parboiled before milling, which strengthens the grain so it elongates beautifully, stays separate and holds its shape through long cooking. It is a reliable choice for restaurants, caterers and bulk buyers who need consistent results.',
    specs: [
      { label: 'Type', value: 'Parboiled (sella) basmati' },
      { label: 'Best for', value: 'Restaurants, catering, biryani' },
      { label: 'Packing', value: 'On request' },
    ],
  },
  {
    id: '1121-steam-basmati',
    name: '1121 Steam Basmati Rice',
    image: 'p-1121-steam',
    alt: 'Bright white grains of 1121 Steam Basmati rice',
    text: 'Extra-long, bright white grains, lightly steamed for great length after cooking and a fluffy texture.',
    details:
      '1121 Steam Basmati is steamed before milling to improve grain strength and cooking length while keeping a clean white colour. The grains cook long, fluffy and fragrant, making it a premium option for homes, retail and food service.',
    specs: [
      { label: 'Type', value: 'Steamed basmati' },
      { label: 'Best for', value: 'Premium retail, home cooking' },
      { label: 'Packing', value: 'On request' },
    ],
  },
  {
    id: '1121-golden-sella-basmati',
    name: '1121 Golden Sella Basmati Rice',
    image: 'p-1121-golden-sella',
    alt: 'Golden coloured grains of 1121 Golden Sella Basmati rice',
    text: 'Parboiled 1121 basmati with a rich golden colour, firm grains and excellent elongation on cooking.',
    details:
      '1121 Golden Sella is parboiled to give the grain its distinctive golden colour and extra firmness. It cooks long and separate, stands up well to heavy dishes and is popular with traders, wholesalers and the food-service sector.',
    specs: [
      { label: 'Type', value: 'Golden parboiled basmati' },
      { label: 'Best for', value: 'Wholesale, food service, biryani' },
      { label: 'Packing', value: 'On request' },
    ],
  },
];

/**
 * Packed rice sold under the company's brand.
 * Images live in /public/images/brands/ (800×1000px, 4:5 portrait).
 * `inquiry` must match an entry in productOptions so "Request a Quote" pre-selects it.
 */
export const riceBrand = {
  name: 'Zam Zam',
  slogan: 'Quality Rice, On Better Price',
};

export const brandProducts = [
  {
    name: '1121 Steam Rice',
    tagline: 'Premium Quality',
    image: '/images/brands/zamzam-1121-steam.webp',
    alt: 'Zam Zam Premium Quality 1121 Steam Rice, 25 kg bag',
    text: 'Premium quality 1121 steam rice with long, slender grains, cleaned, graded and packed at our mill.',
    tags: ['1121 Steam', '25 kg'],
    inquiry: 'Zam Zam 1121 Steam Rice',
  },
  {
    name: 'Special Adhwar Basmati Rice',
    tagline: 'Basmati Rice Product',
    image: '/images/brands/zamzam-adhwar-basmati.webp',
    alt: 'Zam Zam Special Adhwar Basmati Rice, 25 kg bag',
    text: 'Special Adhwar basmati rice, carefully processed, graded and packed by AM Rice Mill.',
    tags: ['Basmati', '25 kg'],
    inquiry: 'Zam Zam Special Adhwar Basmati Rice',
  },
  {
    name: 'Super Karnal Rice',
    tagline: 'Premium Quality',
    image: '/images/brands/zamzam-super-karnal.webp',
    alt: 'Zam Zam Premium Quality Super Karnal Rice bag label',
    text: 'Premium quality Super Karnal rice, cleaned, graded and packed at our mill in 25 kg bags.',
    tags: ['Super Karnal', '25 kg'],
    inquiry: 'Zam Zam Super Karnal Rice',
  },
];

export const byProducts = [
  {
    name: 'Rice Bran',
    image: 'bran',
    alt: 'Brown rice grains showing the outer bran layer',
    text: 'The outer layer removed from brown rice during milling, collected for supply.',
  },
  {
    name: 'Rice Husk',
    image: 'husk',
    alt: 'Loose rice husk flakes',
    text: 'The protective outer shell separated from the paddy grain in the first stage of milling.',
  },
  {
    name: 'Broken Rice',
    image: 'broken-rice',
    alt: 'Bowl of broken rice grains in sunlight',
    text: 'Rice grains that break during processing, separated out at the grading stage.',
  },
  {
    name: 'Other Milling By-Products',
    image: 'other-byproducts',
    alt: 'Mixed rice grains and milling fractions',
    text: 'Additional fractions from the milling process, available depending on production.',
  },
];

export const qualityFlow = ['Paddy Selection', 'Processing', 'Grading', 'Quality Checking', 'Final Supply'];

export const qualityIndicators = [
  { icon: 'sprout', title: 'Quality Sourcing', text: 'Paddy is selected with care before it enters the mill.' },
  { icon: 'cog', title: 'Careful Processing', text: 'Cleaning and milling are handled with attention at every step.' },
  { icon: 'shield-check', title: 'Consistent Standards', text: 'Rice is graded and checked to keep quality consistent.' },
  { icon: 'truck', title: 'Reliable Supply', text: 'Finished products are packed and dispatched dependably.' },
] as const;

/** Certifications — rendered in the Quality section only when entries exist. */
export const certifications: { name: string; issuer?: string }[] = [
  // TODO: e.g. { name: 'ISO 22000', issuer: 'Certification body' }
];

/**
 * Professional team.
 * Each card shows the photo with the name and job title on it; clicking the
 * card opens a panel with the full job description.
 * Photos live in /public/images/team/ (800×1000px, 4:5 portrait).
 * `description` can use blank lines (

) to split paragraphs.
 * `email`, `phone` and `linkedin` are optional and appear in the details panel.
 */
/** Set to false to hide the Professional Team section (and its footer link). */
export const showTeam = true;

export type TeamMember = {
  name: string;
  role: string;
  description?: string;
  photo?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
};

// Ordered by seniority. Members with an empty name are not shown on the site.
export const team: TeamMember[] = [
  {
    name: 'Ch. Abdul Majeed',
    role: 'Founder',
    description:
      'Founded AM Rice Mill and built its reputation on quality, honesty and trust, values that continue to guide the company and its people today.',
    photo: '/images/team/member-9.webp',
  },
  {
    name: 'Ch. Mubashar Majeed',
    role: 'Chairman',
    description:
      'Provides leadership and strategic direction for AM Rice Mill, guiding the company’s vision, values and long-term growth.',
    photo: '/images/team/member-1.webp',
  },
  {
    name: 'Ch. Tahir Majeed',
    role: 'CEO',
    description:
      'Leads the company’s overall business strategy and operations, driving growth, key partnerships and consistent quality across the rice supply chain.',
    photo: '/images/team/member-6.webp',
  },
  {
    name: 'Mian Wahid Majeed',
    role: 'Director Operations',
    description:
      'Directs milling and production operations, ensuring efficient processing, quality control and timely supply to customers.',
    photo: '/images/team/member-8.webp',
  },
  {
    name: 'Muhammad Shahryar Ch',
    role: 'Director IT',
    description:
      'Leads the company’s information technology, digital systems and online presence, supporting efficient and secure business operations.',
    photo: '/images/team/member-7.webp',
  },
  {
    name: 'M. Bilal Afzaal Toor',
    role: 'Legal Advisor',
    description:
      'Advises the company on legal matters, contracts and regulatory compliance, helping protect its interests in every business agreement.',
    photo: '/images/team/member-12.webp',
  },
  // TODO: add name, role and description to show this member
  { name: '', role: '', description: '', photo: '/images/team/member-10.webp' },
];

export const features = [
  { icon: 'handshake', title: 'Reliable Sourcing', text: 'Strong relationships with farmers and suppliers.' },
  { icon: 'zap', title: 'Efficient Processing', text: 'Focused on efficient and consistent rice processing.' },
  { icon: 'award', title: 'Quality Focus', text: 'Attention to quality throughout the processing cycle.' },
  { icon: 'layers', title: 'Complete Product Range', text: 'Paddy, rice, and rice milling by-products.' },
  { icon: 'truck', title: 'Reliable Supply', text: 'Professional handling and dependable product availability.' },
  { icon: 'heart', title: 'Customer Focus', text: 'Committed to serving customers and business partners professionally.' },
] as const;

/**
 * Business statistics.
 * ⚠ PLACEHOLDER VALUES — replace with verified company figures,
 * then set `statsArePlaceholder` to false to hide the notice.
 */
export const statsArePlaceholder = true;
export const stats = [
  { value: 10, suffix: '+', label: 'Years of Experience' }, // TODO
  { value: 5000, suffix: '+', label: 'Tons Processed' }, // TODO
  { value: 3, suffix: '', label: 'Product Categories' }, // TODO
  { value: 50, suffix: '+', label: 'Business Partners' }, // TODO
];

/** Gallery images. `h` is the height of the 800px-wide file (keeps layout stable while loading). */
export const gallery: { image: string; caption: string; h?: number }[] = [
  // Ordered so the three masonry columns end at similar heights.
  { image: 'g-paddy-store', caption: 'Paddy bags stored at AM Rice Mill', h: 1423 },
  { image: 'g-plant', caption: 'Rice processing plant at AM Rice Mill', h: 450 },
  { image: 'g-whitener', caption: 'Rice whitening and polishing machine', h: 1423 },
  { image: 'g-bins2', caption: 'Rice storage bins at AM Rice Mill', h: 450 },
  { image: 'g-grains', caption: 'Rice grains' },
  { image: 'g-warehouse2', caption: 'Packed rice in our warehouse', h: 450 },
  { image: 'g-milling-line', caption: 'Paddy cleaning and husking line', h: 450 },
  { image: 'g-paddy-warehouse', caption: 'Paddy warehouse at AM Rice Mill', h: 450 },
];

export const supplyChain = [
  { icon: 'users', title: 'Farmers & Suppliers', text: 'Paddy sourced at origin' },
  { icon: 'logo', title: 'AM Rice Mill', text: 'Intake & handling' },
  { icon: 'cog', title: 'Processing', text: 'Cleaning, milling & grading' },
  { icon: 'package', title: 'Products', text: 'Paddy, rice & by-products' },
  { icon: 'store', title: 'Customers & Distributors', text: 'Delivered to market' },
] as const;

/** Frequently asked questions: shown on the page and given to Google as FAQ structured data. */
export const faqs = [
  {
    q: 'What products does AM Rice Mill supply?',
    a: 'AM Rice Mill supplies paddy, processed rice and rice milling by-products. Our packed rice is sold under the Zam Zam brand as 1121 Steam Rice, Special Adhwar Basmati Rice and Super Karnal Rice. By-products include rice bran, rice husk and broken rice.',
  },
  {
    q: 'Where is AM Rice Mill located?',
    a: 'Our mill is at 2 Km, Baigpur Road, Raja, Tehsil Kamoke, District Gujranwala, Punjab, Pakistan (Google Maps plus code V6X7+83 Darajake).',
  },
  {
    q: 'What pack size is Zam Zam rice available in?',
    a: 'Zam Zam 1121 Steam Rice, Special Adhwar Basmati Rice and Super Karnal Rice are packed in 25 kg bags. Contact us to discuss other packing requirements.',
  },
  {
    q: 'Do you buy paddy from farmers?',
    a: 'Yes. We purchase paddy from farmers and trusted suppliers, then clean, mill, grade and check it at our mill before supply.',
  },
  {
    q: 'Do you supply traders and distributors?',
    a: 'Yes. We supply rice, paddy and by-products to customers, traders, distributors and business partners. Tell us the product, quantity and delivery location and we will prepare a quote.',
  },
  {
    q: 'How can I get a price quote?',
    a: 'Send an inquiry through the contact form on this page, message us on WhatsApp at +92 306 0618792, or email info@amricemill.com. We are open Saturday to Thursday, 9:00 AM to 6:00 PM, and closed on Friday.',
  },
];

export const productOptions = ['Super Kernel Basmati Rice', '1121 Sella Basmati Rice', '1121 Steam Basmati Rice', '1121 Golden Sella Basmati Rice', 'Zam Zam 1121 Steam Rice', 'Zam Zam Special Adhwar Basmati Rice', 'Zam Zam Super Karnal Rice', 'Paddy', 'Rice', 'Rice Bran', 'Rice Husk', 'Broken Rice', 'Other By-Products', 'General Inquiry'];
