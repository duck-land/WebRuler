
import Home from './[lang]/page';
import LanguageRedirector from '../components/LanguageRedirector';
import { LanguageProvider } from '../context/LanguageContext';

export default function RootPage() {
  // Static Export limitation: We cannot use middleware.
  // We render the English page by default to prevent "blank page" issues for SEO and perceived performance.
  // The LanguageRedirector will handle the client-side forwarding.

  return (
    <LanguageProvider initialLang="en">
      <LanguageRedirector />
      {/* 
        We pass a promise that resolves to { lang: 'en' } because 
        Page props params property is a Promise in Next.js 15+ 
        but our component might expect it differently depending on exact Next.js version type.
        However, looking at src/app/[lang]/page.tsx:
        It doesn't seem to use `params` directly in the component body in the file view I saw earlier? 
        Wait, I need to check src/app/[lang]/page.tsx again.
        
        Checking file content from previous turn:
        export default function Home() {
          const { t, language } = useLanguage();
          ...
        }
        
        It keeps content dynamic based on useLanguage().
        So passing params is NOT needed for the component itself, 
        but we need to wrap it in LanguageProvider 'en' which I did.
      */}
      <Home />
    </LanguageProvider>
  );
}
