import App from '../../src/App';

const BASE_URL = 'https://worlify.org';

// Per-page SEO metadata map — unique titles, descriptions and keywords for every route
const PAGE_META = {
  // ─── Causes ─────────────────────────────────────────────────────────────────
  'causes': {
    title: 'Our Causes | Education, Healthcare, Environment & More — Worlify Foundation',
    description:
      'Explore all causes supported by Worlify Foundation: education for underprivileged children, free healthcare camps, food & nutrition drives, skill development, environmental action, and more. Donate to a cause today.',
    canonical: `${BASE_URL}/causes`,
    keywords: 'NGO causes India, charity causes, donate to causes India, NGO programs India',
  },
  'causes/education': {
    title: 'Education for Underprivileged Children | Worlify Foundation NGO India',
    description:
      'Worlify Foundation provides tutoring, scholarships, and educational materials to underprivileged children in India. Support education for every child. Donate online with 80G tax benefit.',
    canonical: `${BASE_URL}/causes/education`,
    keywords: 'education NGO India, donate for education, underprivileged children education, scholarship NGO India, education charity Lucknow',
  },
  'causes/healthcare': {
    title: 'Free Healthcare Camps & Medical Support | Worlify Foundation NGO',
    description:
      'Worlify Foundation organizes free medical camps, health checkups, hygiene kits, and maternal healthcare in rural India. Support healthcare for the poor. Donate with 80G tax exemption.',
    canonical: `${BASE_URL}/causes/healthcare`,
    keywords: 'healthcare NGO India, free medical camp India, rural healthcare NGO, health charity India, donate for healthcare',
  },
  'causes/food-nutrition': {
    title: 'Food Security & Nutrition Programs | Worlify Foundation NGO India',
    description:
      'Worlify runs Ann Seva and nutrition drives ensuring no child goes to bed hungry. We tackle food insecurity and malnutrition across India. Donate to feed a family today.',
    canonical: `${BASE_URL}/causes/food-nutrition`,
    keywords: 'food security NGO India, nutrition charity, donate food India, hunger NGO India, ann seva program',
  },
  'causes/human-rights': {
    title: 'Human Rights Advocacy | Worlify Foundation NGO India',
    description:
      'Worlify Foundation advocates for the rights of marginalized communities across India. We provide legal awareness, support networks, and empowerment programs to protect human dignity.',
    canonical: `${BASE_URL}/causes/human-rights`,
    keywords: 'human rights NGO India, rights advocacy India, social justice NGO, marginalized communities India',
  },
  'causes/environment': {
    title: 'Environmental Conservation & Green India | Worlify Foundation NGO',
    description:
      'Worlify Foundation drives environmental conservation through tree plantations, clean energy, water conservation, and zero-waste programs across India. Join our Dharti Bachao movement.',
    canonical: `${BASE_URL}/causes/environment`,
    keywords: 'environment NGO India, tree plantation NGO, green India NGO, environmental conservation charity India, climate change NGO',
  },
  'causes/animal-welfare': {
    title: 'Animal Welfare Programs | Worlify Foundation NGO India',
    description:
      'Worlify Foundation supports animal welfare through rescue, care, and awareness programs across India. We believe all living beings deserve compassion and protection.',
    canonical: `${BASE_URL}/causes/animal-welfare`,
    keywords: 'animal welfare NGO India, animal rescue charity India, donate for animals India',
  },
  'causes/skill-development': {
    title: 'Skill Development & Vocational Training | Worlify Foundation NGO',
    description:
      'Worlify Foundation provides vocational training, coding courses, tailoring, agricultural techniques, and financial literacy to empower youth and women in rural India. Create sustainable livelihoods.',
    canonical: `${BASE_URL}/causes/skill-development`,
    keywords: 'skill development NGO India, vocational training India, livelihood NGO, women skill training India, rural youth employment NGO',
  },
  'causes/poverty-alleviation': {
    title: 'Poverty Alleviation Programs | Worlify Foundation NGO India',
    description:
      'Worlify Foundation works to break the cycle of poverty through income support, housing assistance, welfare programs, and community empowerment across underserved areas of India.',
    canonical: `${BASE_URL}/causes/poverty-alleviation`,
    keywords: 'poverty alleviation NGO India, poverty charity India, anti-poverty programs India, welfare NGO',
  },

  // ─── Campaigns ──────────────────────────────────────────────────────────────
  'campaign': {
    title: 'Active Campaigns | Donate to Change Lives — Worlify Foundation',
    description:
      'Browse all active fundraising campaigns by Worlify Foundation. From Padhega Har Baccha (education) to Ann Seva (nutrition) and Beti Ki Muskan (girl education). Donate to make a difference today.',
    canonical: `${BASE_URL}/campaign`,
    keywords: 'NGO campaigns India, fundraising India, donate campaign India, social cause campaigns',
  },
  'campaign/padhaga-har-baccha': {
    title: 'Padhega Har Baccha — Education Campaign | Worlify Foundation',
    description:
      'Padhega Har Baccha is Worlify\'s flagship campaign to ensure every child in India gets access to quality education. Donate now to fund school supplies, scholarships, and tutoring.',
    canonical: `${BASE_URL}/campaign/padhaga-har-baccha`,
    keywords: 'Padhega Har Baccha, education campaign India, child education NGO, donate for education India',
  },
  'campaign/ann-seva': {
    title: 'Ann Seva — Food Security Campaign | Worlify Foundation',
    description:
      'Ann Seva is Worlify\'s nutrition and food distribution campaign targeting hunger and malnutrition in underserved communities. Donate to feed families in need across India.',
    canonical: `${BASE_URL}/campaign/ann-seva`,
    keywords: 'Ann Seva campaign, food distribution India, hunger campaign NGO, donate food India',
  },
  'campaign/nayi-pehchaan': {
    title: 'Nayi Pehchaan — Women Empowerment Campaign | Worlify Foundation',
    description:
      'Nayi Pehchaan empowers women through skill training, self-help groups, and economic independence programs. Support women empowerment in India by donating to this campaign.',
    canonical: `${BASE_URL}/campaign/nayi-pehchaan`,
    keywords: 'Nayi Pehchaan, women empowerment India, NGO women campaign, donate women empowerment India',
  },
  'campaign/sahara': {
    title: 'Sahara — Child Welfare Campaign | Worlify Foundation',
    description:
      'Sahara provides safety, shelter, nutrition, and counseling to vulnerable children across India. Join Worlify in protecting the future of every child. Donate now.',
    canonical: `${BASE_URL}/campaign/sahara`,
    keywords: 'Sahara campaign, child welfare India, protect children NGO India, donate child care India',
  },
  'campaign/apna-aashiyana': {
    title: 'Apna Aashiyana — Shelter & Housing Campaign | Worlify Foundation',
    description:
      'Apna Aashiyana helps homeless and underserved families gain safe shelter and housing support. Donate to provide dignified living conditions to families in need across India.',
    canonical: `${BASE_URL}/campaign/apna-aashiyana`,
    keywords: 'Apna Aashiyana, shelter NGO India, housing charity India, donate for shelter India',
  },
  'campaign/umeed': {
    title: 'Umeed — Healthcare Campaign | Worlify Foundation NGO',
    description:
      'Umeed brings free medical camps, health screenings, and medicines to communities without access to healthcare. Support Worlify\'s healthcare mission in rural India.',
    canonical: `${BASE_URL}/campaign/umeed`,
    keywords: 'Umeed campaign, healthcare campaign India, free medical camp, donate healthcare India',
  },
  'campaign/dharti-bachao': {
    title: 'Dharti Bachao — Environmental Campaign | Worlify Foundation',
    description:
      'Dharti Bachao is Worlify\'s environmental campaign focused on tree plantation, clean energy, and sustainable living in India. Join the green revolution.',
    canonical: `${BASE_URL}/campaign/dharti-bachao`,
    keywords: 'Dharti Bachao, environment campaign India, tree plantation campaign, green India NGO',
  },
  'campaign/jeev-raksha': {
    title: 'Jeev Raksha — Animal Welfare Campaign | Worlify Foundation',
    description:
      'Jeev Raksha supports rescue, care, and protection of animals across India. Donate to Worlify\'s animal welfare campaign and help give every living being a chance at life.',
    canonical: `${BASE_URL}/campaign/jeev-raksha`,
    keywords: 'Jeev Raksha, animal welfare campaign India, animal rescue NGO, donate for animals India',
  },
  'campaign/beti-ki-muskan': {
    title: 'Beti Ki Muskan — Girl Education Campaign | Worlify Foundation',
    description:
      'Beti Ki Muskan focuses on empowering girls through education, scholarships, and life skills programs in India. Every girl deserves to smile. Donate today.',
    canonical: `${BASE_URL}/campaign/beti-ki-muskan`,
    keywords: 'Beti Ki Muskan, girl education India, girl empowerment NGO, donate girl child India, Beti Bachao NGO',
  },
  'campaign/jeevandan': {
    title: 'Jeevandan — Blood & Organ Donation Campaign | Worlify Foundation',
    description:
      'Jeevandan encourages blood and organ donation awareness across India. Worlify Foundation connects donors with those in need. Join the movement and help save lives.',
    canonical: `${BASE_URL}/campaign/jeevandan`,
    keywords: 'Jeevandan, blood donation campaign India, organ donation awareness NGO, donate blood India',
  },

  // ─── About ──────────────────────────────────────────────────────────────────
  'about': {
    title: 'About Worlify Foundation | Our Mission & Vision | NGO India',
    description:
      'Learn about Worlify Foundation — a registered multi-cause NGO in Lucknow, India. Discover our mission, vision, five impact pillars, and commitment to transparent community development.',
    canonical: `${BASE_URL}/about`,
    keywords: 'about Worlify Foundation, NGO mission India, Worlify about us, social impact NGO India',
  },
  'about-story': {
    title: 'Our Story | How Worlify Foundation Was Founded | NGO India',
    description:
      'Read the story of Worlify Foundation — founded with a vision to create transparent, community-led change across India. Learn how we grew from an idea to a registered NGO impacting thousands of lives.',
    canonical: `${BASE_URL}/about-story`,
    keywords: 'Worlify Foundation story, NGO founding story India, Worlify history',
  },
  'about-directors': {
    title: 'Our Leadership & Directors | Worlify Foundation NGO India',
    description:
      'Meet the team behind Worlify Foundation — our Chairman, Directors, and founding members who lead India\'s community development initiatives across education, healthcare, and social welfare.',
    canonical: `${BASE_URL}/about-directors`,
    keywords: 'Worlify Foundation directors, NGO leadership India, Ravi Kumar Verma Worlify',
  },

  // ─── Key Action Pages ────────────────────────────────────────────────────────
  'donate': {
    title: 'Donate Online to NGO India — 80G Tax Exemption | Worlify Foundation',
    description:
      'Donate securely online to Worlify Foundation, a registered NGO in India. Support education, healthcare, nutrition, and environmental causes. Get 80G tax exemption certificate instantly. UPI, cards & net banking accepted.',
    canonical: `${BASE_URL}/donate`,
    keywords: 'donate NGO India, online donation India 80G, donate charity India, tax exemption donation India, UPI donation NGO, donate Lucknow NGO, CSR donation India',
  },
  'volunteer': {
    title: 'Volunteer with an NGO India | Join Worlify Foundation',
    description:
      'Become a volunteer with Worlify Foundation and create real change in communities across India. Apply online to volunteer in education, healthcare, environment, or field operations. All skill levels welcome.',
    canonical: `${BASE_URL}/volunteer`,
    keywords: 'volunteer India NGO, NGO volunteer Lucknow, social work volunteer India, volunteer community development India',
  },
  'gallery': {
    title: 'Photo Gallery | Our Work on the Ground | Worlify Foundation',
    description:
      'See Worlify Foundation in action through our photo gallery. Real stories, real people, real impact — from educational events to medical camps and tree plantations across India.',
    canonical: `${BASE_URL}/gallery`,
    keywords: 'Worlify Foundation gallery, NGO work photos India, community impact photos',
  },
  'contact': {
    title: 'Contact Worlify Foundation | NGO India — Get In Touch',
    description:
      'Reach out to Worlify Foundation for donations, partnerships, volunteering, or general inquiries. We\'re based in Lucknow, Uttar Pradesh, India. Call, email, or fill our contact form.',
    canonical: `${BASE_URL}/contact`,
    keywords: 'contact Worlify Foundation, NGO contact India, contact NGO Lucknow, partner with NGO India',
  },
  'faqs': {
    title: 'Frequently Asked Questions | Worlify Foundation NGO India',
    description:
      'Find answers to common questions about Worlify Foundation: how to donate, 80G tax exemption, volunteering, fund usage, campaign details, and more. Transparent and trusted NGO in India.',
    canonical: `${BASE_URL}/faqs`,
    keywords: 'Worlify FAQ, NGO India FAQ, how to donate NGO, 80G donation questions, NGO transparency India',
  },
  'legal': {
    title: 'Legal Documents & Transparency | 80G, 12A, PAN | Worlify Foundation',
    description:
      'Worlify Foundation is a legally registered NGO in India with 80G, 12A, NITI Aayog, and CSR-1 compliance. Download our legal documents, certificates, and financial reports here.',
    canonical: `${BASE_URL}/legal`,
    keywords: 'Worlify legal documents, NGO 80G certificate, 12A certificate NGO India, NGO registration India, CSR-1 certificate',
  },
};

// Generate per-page metadata dynamically based on slug
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slugArr = resolvedParams?.slug || [];
  const slugKey = Array.isArray(slugArr) ? slugArr.join('/') : '';

  const meta = PAGE_META[slugKey];

  if (!meta) {
    return {
      title: 'Worlify Foundation | NGO India',
      description:
        'Worlify Foundation is a registered NGO in Lucknow, India working in education, healthcare, food security, skill development, and environmental action.',
      alternates: { canonical: BASE_URL },
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: meta.canonical,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Worlify Foundation — Empowering Lives Across India',
        },
      ],
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default async function CatchAllPage({ params }) {
  if (params) {
    await params;
  }
  return <App />;
}
