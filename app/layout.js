import '../src/index.css';

export const metadata = {
  title: 'Worlify',
  description: 'A modern NGO website built with Next.js'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
