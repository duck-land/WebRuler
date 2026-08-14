import TermsClientPage from '../[lang]/terms/ClientPage';
import LanguageRedirector from '../../components/LanguageRedirector';
import { LanguageProvider } from '../../context/LanguageContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Terms of Service | RulerHero",
    description: "Terms of Service for RulerHero online screen ruler application.",
    alternates: {
        canonical: "https://rulerhero.com/en/terms",
    }
};

export default function TermsRootPage() {
    return (
        <LanguageProvider initialLang="en">
            <LanguageRedirector to="/terms" />
            <TermsClientPage />
        </LanguageProvider>
    );
}
