// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'My App',
  description: 'Using Bootstrap in Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
