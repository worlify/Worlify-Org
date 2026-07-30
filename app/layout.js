import '../src/index.css';

export const metadata = {
  title: 'Worlify Foundation — Empowering Lives, Inspiring Change',
  description:
    'Worlify is a registered multi-cause NGO working in education, healthcare, food & nutrition, skill development, and environmental action across India.',
  keywords: [
    'NGO India', 'Worlify', 'donate', 'education charity', 'healthcare NGO',
    'volunteer India', 'Lucknow NGO', 'social impact', 'CSR', '80G'
  ],
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Worlify Foundation',
    description: 'Empowering lives across India through education, healthcare, food security, and more.',
    images: ['/favicon.png'],
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
