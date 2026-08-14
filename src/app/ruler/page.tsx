import ClientPage from '../[lang]/ruler/ClientPage';
import LanguageRedirector from '../../components/LanguageRedirector';
import { LanguageProvider } from '../../context/LanguageContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Online Screen Ruler Tool | RulerHero",
    description: "Measure real world items effortlessly from your screen with cm and inch support.",
    alternates: {
        canonical: "https://rulerhero.com/en/ruler",
    }
};

export default function RulerRootPage() {
    return (
        <LanguageProvider initialLang="en">
            <LanguageRedirector to="/ruler" />
            <ClientPage />
        </LanguageProvider>
    );
}
