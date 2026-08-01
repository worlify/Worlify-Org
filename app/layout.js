import '../src/index.css';

const BASE_URL = 'https://worlify.org';

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'Worlify Foundation | NGO India — Education, Healthcare & Community Welfare',
    template: '%s | Worlify Foundation'
  },

  description:
    'Worlify Foundation is a registered NGO in Lucknow, India working in education, healthcare, food & nutrition, skill development, women empowerment, and environmental action. Donate today and make a real impact.',

  keywords: [
    'NGO India',
    'Worlify',
    'Worlify Foundation',
    'NGO Lucknow',
    'NGO Uttar Pradesh',
    'donate to NGO India',
    'education charity India',
    'healthcare NGO India',
    'volunteer India NGO',
    'social impact India',
    'CSR donation India',
    '80G tax exemption donation',
    '12A registered NGO',
    'child welfare organization India',
    'skill development NGO India',
    'women empowerment NGO',
    'food security NGO India',
    'environment NGO India',
    'nonprofit organization India',
    'community development India',
    'NITI Aayog NGO',
    'poverty alleviation India',
    'grassroots NGO India',
    'human rights NGO India',
    'animal welfare NGO India',
  ],

  authors: [{ name: 'Worlify Foundation', url: BASE_URL }],
  creator: 'Worlify Foundation',
  publisher: 'Worlify Foundation',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Worlify Foundation',
    title: 'Worlify Foundation | NGO India — Empowering Lives, Inspiring Change',
    description:
      'Worlify is a registered multi-cause NGO in Lucknow, India. We work in education, healthcare, food security, skill development, and environmental action. Join us in creating real change.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Worlify Foundation — Empowering Lives Across India',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@worlifyngo',
    creator: '@worlifyngo',
    title: 'Worlify Foundation | NGO India',
    description:
      'A registered NGO in India working in education, healthcare, food security, skill development & environmental action. Donate, volunteer, or partner with us.',
    images: [`${BASE_URL}/og-image.png`],
  },

  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/favicon-32x32.png?v=2', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png?v=2', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: '/apple-touch-icon.png?v=2',
  },

  verification: {
    // Add your Google Search Console verification token here after verifying
    // google: 'YOUR_GOOGLE_VERIFICATION_TOKEN',
  },
};

// JSON-LD Structured Data for Organization/NGO
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['NGO', 'Organization'],
  name: 'Worlify Foundation',
  alternateName: 'Worlify',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/favicon.png`,
    width: 512,
    height: 512,
  },
  image: `${BASE_URL}/og-image.png`,
  description:
    'Worlify Foundation is a registered NGO in Lucknow, India, working across education, healthcare, food & nutrition, skill development, women empowerment, and environmental action.',
  foundingDate: '2020',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'A/189, Ground Floor, Narayan Enclave, Kasimpur Biruha',
    addressLocality: 'Lucknow',
    addressRegion: 'Uttar Pradesh',
    postalCode: '226501',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-9161321513',
      contactType: 'customer support',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    {
      '@type': 'ContactPoint',
      email: 'supportworlify@gmail.com',
      contactType: 'general inquiries',
      areaServed: 'IN',
    },
  ],
  sameAs: [
    'https://www.facebook.com/share/1KR1fknnr8/',
    'https://x.com/worlifyngo',
    'https://www.instagram.com/worlifyngo',
    'https://www.linkedin.com/company/worlifyfoundation/',
    'https://youtube.com/@worlifyfoundation',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  knowsAbout: [
    'Education',
    'Healthcare',
    'Food Security',
    'Skill Development',
    'Women Empowerment',
    'Environmental Conservation',
    'Child Welfare',
    'Poverty Alleviation',
    'Human Rights',
    'Animal Welfare',
  ],
  nonprofitStatus: 'Nonprofit501c3',
  taxID: 'AACTW5671G',
};

// JSON-LD WebSite schema with sitelinks searchbox
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Worlify Foundation',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/faqs?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// JSON-LD BreadcrumbList for homepage
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Causes',
      item: `${BASE_URL}/causes`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Donate',
      item: `${BASE_URL}/donate`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Volunteer',
      item: `${BASE_URL}/volunteer`,
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for Google Fonts performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Breadcrumb JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
