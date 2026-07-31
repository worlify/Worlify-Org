import App from '../src/App';

// Homepage-specific metadata (richest keywords, highest priority)
export const metadata = {
  title: 'Worlify Foundation | NGO India — Education, Healthcare & Community Welfare',
  description:
    'Worlify Foundation is a registered NGO based in Lucknow, Uttar Pradesh, India. We work on education, healthcare, food & nutrition, skill development, women empowerment, and environmental conservation. Donate online with 80G tax exemption.',
  alternates: {
    canonical: 'https://worlify.org/',
  },
  openGraph: {
    title: 'Worlify Foundation — Empowering Lives Across India',
    description:
      'Join Worlify Foundation in our mission to uplift underserved communities across India through education, healthcare, food security, and environmental action.',
    url: 'https://worlify.org/',
    images: [
      {
        url: 'https://worlify.org/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Worlify Foundation — Empowering Lives Across India',
      },
    ],
  },
  twitter: {
    title: 'Worlify Foundation | NGO India',
    description:
      'Join Worlify Foundation in upliftng communities across India. Donate, volunteer, or partner with us. 80G tax exemption available.',
    images: ['https://worlify.org/og-image.png'],
  },
};

export default function Page() {
  return <App />;
}
