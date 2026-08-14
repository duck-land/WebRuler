import GuidesIndexClientPage from '../[lang]/guides/ClientPage';
import LanguageRedirector from '../../components/LanguageRedirector';
import { LanguageProvider } from '../../context/LanguageContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Measurement & Display Technology Guides | RulerHero",
    description: "Explore expert guides on screen PPI calculation, paper size standards (A4/Letter), and physical reference dimensions.",
    alternates: {
        canonical: "https://rulerhero.com/en/guides",
    }
};

export default function GuidesRootPage() {
    return (
        <LanguageProvider initialLang="en">
            <LanguageRedirector to="/guides" />
            <GuidesIndexClientPage />
        </LanguageProvider>
    );
}
