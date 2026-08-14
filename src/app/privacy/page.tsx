import PrivacyClientPage from '../[lang]/privacy/ClientPage';
import LanguageRedirector from '../../components/LanguageRedirector';
import { LanguageProvider } from '../../context/LanguageContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Privacy Policy | RulerHero",
    description: "Privacy Policy for RulerHero online screen ruler application.",
    alternates: {
        canonical: "https://rulerhero.com/en/privacy",
    }
};

export default function PrivacyRootPage() {
    return (
        <LanguageProvider initialLang="en">
            <LanguageRedirector to="/privacy" />
            <PrivacyClientPage />
        </LanguageProvider>
    );
}
